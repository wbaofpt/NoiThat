import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { pool } from './db.js';
import { createApp } from './app.js';

test('MySQL integration: real sessions, cart isolation, roles and logout (rollback)', async () => {
  const connection = await pool.getConnection();
  let server;
  try {
    await connection.beginTransaction();
    server = createApp(connection, { origin: 'http://localhost:5173', production: true }).listen(0, '127.0.0.1');
    await new Promise(resolve => server.once('listening', resolve));
    const base = `http://127.0.0.1:${server.address().port}/api`;
    const headers = { Origin: 'http://localhost:5173', 'X-Nep-Request': '1', 'Content-Type': 'application/json' };
    const email = `${randomUUID()}@example.invalid`;
    const password = 'Integration only password 123';
    const post = (route, payload, cookie) => fetch(base + route, { method: 'POST', headers: { ...headers, ...(cookie ? { Cookie: cookie } : {}) }, body: JSON.stringify(payload) });
    const register = await post('/auth/register', { name: 'Test rollback', email, password, role: 'admin' });
    assert.equal(register.status, 201);
    const user = await register.json();
    assert.equal(user.role, 'customer');
    assert.match(register.headers.get('set-cookie'), /Secure/);
    const oldCookie = register.headers.get('set-cookie').split(';')[0];
    const login = await post('/auth/login', { email, password }, oldCookie);
    assert.equal(login.status, 200);
    const cookie = login.headers.get('set-cookie').split(';')[0];
    assert.notEqual(cookie, oldCookie);
    const get = (path, c = cookie) => fetch(base + path, { headers: { Cookie: c } });
    assert.equal((await get('/auth/me', oldCookie)).status, 401);
    assert.equal((await get('/auth/me')).status, 200);
    assert.equal((await get('/admin/users')).status, 403);
    const added = await post('/cart', { productId: 1, userId: -1, price: 0 }, cookie);
    assert.equal(added.status, 201);
    const items = await added.json();
    assert.equal(items.length, 1);
    const [rows] = await connection.execute('SELECT user_id FROM cart_items WHERE id=?', [items[0].cartId]);
    assert.equal(rows[0].user_id, user.id);
    await connection.execute("UPDATE users SET role='admin' WHERE id=?", [user.id]);
    const admin = await get('/admin/users');
    assert.equal(admin.status, 200);
    assert.ok((await admin.json()).every(u => !('password_hash' in u)));
    const removed = await fetch(base + `/cart/${items[0].cartId}`, { method: 'DELETE', headers: { ...headers, Cookie: cookie } });
    assert.equal(removed.status, 200);
    assert.deepEqual(await removed.json(), []);
    assert.equal((await post('/auth/logout', {}, cookie)).status, 204);
    assert.equal((await get('/auth/me')).status, 401);
  } finally {
    if (server) await new Promise(resolve => server.close(resolve));
    await connection.rollback();
    connection.release();
    await pool.end();
  }
});
