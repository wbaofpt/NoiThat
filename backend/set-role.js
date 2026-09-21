import { pool } from './db.js';
const [email, role] = process.argv.slice(2);
try {
  if (!email || !['customer', 'admin'].includes(role)) throw new Error('Usage: npm run user:role -- email customer|admin');
  const [result] = await pool.execute('UPDATE users SET role=? WHERE email=?', [role, email.trim().toLowerCase()]);
  if (!result.affectedRows) throw new Error('Account not found. Register first.');
  await pool.execute('DELETE FROM sessions WHERE user_id IN (SELECT id FROM users WHERE email=?)', [email.trim().toLowerCase()]);
  console.log('Role updated; sessions revoked.');
} finally { await pool.end(); }
