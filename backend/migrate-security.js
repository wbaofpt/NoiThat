import { pool } from './db.js';
import { hashPassword } from './security.js';

// Additive migration: preserves users, products and orders. Re-runnable.
try {
  const [columns] = await pool.query("SHOW COLUMNS FROM users LIKE 'role'");
  if (!columns.length) await pool.query("ALTER TABLE users ADD COLUMN role ENUM('customer','admin') NOT NULL DEFAULT 'customer'");
  await pool.query(`CREATE TABLE IF NOT EXISTS sessions (
    token_hash CHAR(64) PRIMARY KEY, user_id INT NOT NULL,
    expires_at DATETIME NOT NULL, INDEX (expires_at),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT, user_id INT NOT NULL, product_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`);
  const [users] = await pool.query('SELECT id,password_hash FROM users');
  let count = 0;
  for (const user of users) {
    if (/^scrypt\$[a-f0-9]{32}\$[a-f0-9]{128}$/.test(user.password_hash)) continue;
    await pool.execute('UPDATE users SET password_hash=? WHERE id=? AND password_hash=?',
      [await hashPassword(user.password_hash), user.id, user.password_hash]);
    count++;
  }
  console.log(`Security migration complete; converted ${count} legacy passwords.`);
} finally { await pool.end(); }
