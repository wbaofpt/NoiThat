import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './app.js';
import { hashPassword, verifyPassword, tokenHash, validPassword } from './security.js';

test('password hashes use salts and reject incorrect or legacy plaintext passwords', async () => {
  const password = 'a long password 123';
  const hash = await hashPassword(password);
  assert.notEqual(hash, await hashPassword(password));
  assert.equal(await verifyPassword(password, hash), true);
  assert.equal(await verifyPassword('wrong password', hash), false);
  assert.equal(await verifyPassword(password, password), false);
  assert.equal(validPassword('short'), false);
  assert.equal(validPassword('x'.repeat(129)), false);
});

// In-memory DB double; requests traverse the real HTTP middleware and routes.
test('authentication, authorization, CSRF, cart ownership and session revocation', async t => {
  const users = [{ id: 1, name: 'Customer', email: 'customer@example.com', role: 'customer', password_hash: await hashPassword('customer password') },
    { id: 2, name: 'Admin', email: 'admin@example.com', role: 'admin', password_hash: await hashPassword('admin password') }];
  const sessions = new Map();
  const cart = [];
  let nextCartId = 1;
  const db = {
    async execute(sql, args) {
      if (sql.startsWith('SELECT u.id')) {
        const s = sessions.get(args[0]);
        const u = s && s.expires > Date.now() && users.find(u => u.id === s.userId);
        return [u ? [{ id: u.id, name: u.name, email: u.email, role: u.role }] : []];
      }
      if (sql.startsWith('SELECT id,name,email,password_hash')) return [users.filter(u => u.email === args[0])];
      if (sql.startsWith('INSERT INTO users')) {
        users.push({ id: users.length + 1, name: args[0], email: args[1], password_hash: args[2], role: 'customer' });
        return [{ insertId: users.length }];
      }
      if (sql.startsWith('INSERT INTO sessions')) { sessions.set(args[0], { userId: args[1], expires: Date.now() + 3600000 }); return [{}]; }
      if (sql.startsWith('DELETE FROM sessions')) { sessions.delete(args[0]); return [{}]; }
      if (sql.startsWith('INSERT INTO cart_items')) { cart.push({ id: nextCartId++, user_id: args[0], product_id: args[1] }); return [{}]; }
      if (sql.startsWith('SELECT id,product_id')) return [cart.filter(c => c.user_id === args[0])];
      if (sql.startsWith('DELETE FROM cart_items')) {
        const i = cart.findIndex(c => c.id === args[0] && c.user_id === args[1]);
        if (i < 0) return [{ affectedRows: 0 }];
        cart.splice(i, 1); return [{ affectedRows: 1 }];
      }
      throw new Error(`Unexpected query: ${sql}`);
    },
    async query(sql) {
      if (sql.startsWith('DELETE FROM sessions')) return [{}];
      if (sql.startsWith('SELECT id,name,email,role')) return [users.map(({ password_hash, ...u }) => u)];
      throw new Error(`Unexpected query: ${sql}`);
    },
  };
  const server = createApp(db).listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const headers = { Origin: 'http://localhost:5173', 'X-Nep-Request': '1', 'Content-Type': 'application/json' };
  const request = (path, options = {}) => fetch(base + '/api' + path, options);
  assert.equal((await request('/cart')).status, 401);
  assert.equal((await request('/admin/users', { headers: { Cookie: 'nep_session=fake', role: 'admin' } })).status, 401);
  assert.equal((await request('/auth/login', { method: 'POST', headers: { ...headers, Origin: 'https://attacker.example' }, body: '{}' })).status, 403);
  assert.equal((await request('/auth/login', { method: 'POST', headers: { Origin: headers.Origin, 'Content-Type': 'application/json' }, body: '{}' })).status, 403);
  assert.equal((await request('/auth/register', { method: 'POST', headers, body: JSON.stringify({ name: 'Test', email: 'test@example.com', password: 'short' }) })).status, 400);
  const registered = await request('/auth/register', { method: 'POST', headers, body: JSON.stringify({ name: 'Test', email: 'test@example.com', password: 'a strong long password', role: 'admin' }) });
  assert.equal(registered.status, 201);
  assert.equal((await registered.json()).role, 'customer');
  const login = async (email, password) => {
    const r = await request('/auth/login', { method: 'POST', headers, body: JSON.stringify({ email, password }) });
    assert.equal(r.status, 200);
    const cookie = r.headers.get('set-cookie');
    assert.match(cookie, /HttpOnly/); assert.match(cookie, /SameSite=Strict/);
    assert.equal('password_hash' in await r.json(), false);
    return cookie.split(';')[0];
  };
  const customerCookie = await login('customer@example.com', 'customer password');
  const customerHeaders = { ...headers, Cookie: customerCookie };
  assert.equal((await request('/admin/users', { headers: customerHeaders })).status, 403);
  const added = await request('/cart', { method: 'POST', headers: customerHeaders, body: JSON.stringify({ productId: 1, userId: 2, price: 0 }) });
  assert.equal(added.status, 201);
  const items = await added.json();
  assert.equal(cart[0].user_id, 1);
  assert.notEqual(items[0].price, 0);
  const adminCookie = await login('admin@example.com', 'admin password');
  assert.equal((await request('/admin/users', { headers: { Cookie: adminCookie } })).status, 200);
  assert.deepEqual(await (await request('/cart', { headers: { Cookie: adminCookie } })).json(), []);
  assert.equal((await request(`/cart/${items[0].cartId}`, { method: 'DELETE', headers: { ...headers, Cookie: adminCookie } })).status, 404);
  users[1].role = 'customer';
  assert.equal((await request('/admin/users', { headers: { Cookie: adminCookie } })).status, 403);
  sessions.get(tokenHash(adminCookie.split('=')[1])).expires = 0;
  assert.equal((await request('/auth/me', { headers: { Cookie: adminCookie } })).status, 401);
  assert.equal((await request('/auth/logout', { method: 'POST', headers: customerHeaders })).status, 204);
  assert.equal((await request('/cart', { headers: customerHeaders })).status, 401);
  for (let i = 0; i < 21; i++) {
    const r = await request('/auth/login', { method: 'POST', headers, body: '{}' });
    if (i === 20) assert.equal(r.status, 429);
  }
});
