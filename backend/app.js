import express from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { hashPassword, verifyPassword, tokenHash, newToken, validEmail, validPassword, requireAdmin } from './security.js';
import { products } from '../frontend/src/data/products.js';

export function createApp(pool, { origin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173', production = process.env.NODE_ENV === 'production' } = {}) {
  const app = express();
  const cookie = { httpOnly: true, secure: production, sameSite: 'strict', path: '/api' };
  const name = 'nep_session';
  const sessionToken = (req) => {
    const value = (req.headers.cookie || '').split(';').map(v => v.trim()).find(v => v.startsWith(`${name}=`))?.slice(name.length + 1);
    return /^[a-f0-9]{64}$/.test(value || '') ? value : null;
  };
  app.disable('x-powered-by');
  app.use(helmet());
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    res.vary('Origin');
    if (req.headers.origin && req.headers.origin !== origin) return res.status(403).json({ error: 'Nguồn truy cập không hợp lệ.' });
    if (req.headers.origin === origin) {
      res.set('Access-Control-Allow-Origin', origin);
      res.set('Access-Control-Allow-Credentials', 'true');
      res.set('Access-Control-Allow-Headers', 'Content-Type, X-Nep-Request');
      res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
    }
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    // Require a custom header plus exact Origin on every write (including login CSRF).
    if (!['GET', 'HEAD'].includes(req.method) && (req.headers.origin !== origin || req.get('X-Nep-Request') !== '1')) {
      return res.status(403).json({ error: 'Yêu cầu không hợp lệ. Vui lòng tải lại trang.' });
    }
    next();
  });
  app.use(express.json({ limit: '16kb' }));
  app.use('/api', rateLimit({ windowMs: 60000, limit: 120, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Quá nhiều yêu cầu. Thử lại sau một phút.' } }));
  app.use('/api/auth', rateLimit({ windowMs: 15 * 60000, limit: 20, skip: req => req.method === 'GET', standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Quá nhiều lần thử. Vui lòng thử lại sau 15 phút.' } }));

  const authenticate = async (req, res, next) => {
    const token = sessionToken(req);
    if (!token) return res.status(401).json({ error: 'Vui lòng đăng nhập.' });
    const [rows] = await pool.execute(`SELECT u.id,u.name,u.email,u.role FROM sessions s
      JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>UTC_TIMESTAMP()`, [tokenHash(token)]);
    if (!rows.length) {
      res.clearCookie(name, cookie);
      return res.status(401).json({ error: 'Phiên đăng nhập đã hết hạn.' });
    }
    req.user = rows[0];
    next();
  };
  const issueSession = async (req, res, user) => {
    const old = sessionToken(req);
    if (old) await pool.execute('DELETE FROM sessions WHERE token_hash=?', [tokenHash(old)]);
    await pool.query('DELETE FROM sessions WHERE expires_at<=UTC_TIMESTAMP()');
    const token = newToken();
    await pool.execute('INSERT INTO sessions (token_hash,user_id,expires_at) VALUES (?,?,DATE_ADD(UTC_TIMESTAMP(), INTERVAL 8 HOUR))', [tokenHash(token), user.id]);
    res.cookie(name, token, { ...cookie, maxAge: 8 * 3600000 });
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  };
  const dummyHash = hashPassword(newToken());
  app.post('/api/auth/register', async (req, res) => {
    const { name: displayName, email, password } = req.body || {};
    if (typeof displayName !== 'string' || !displayName.trim() || displayName.length > 120 || !validEmail(email) || !validPassword(password)) {
      return res.status(400).json({ error: 'Nhập tên, email hợp lệ và mật khẩu từ 12–128 ký tự.' });
    }
    const normalized = email.trim().toLowerCase();
    try {
      const [result] = await pool.execute("INSERT INTO users (name,email,password_hash,role) VALUES (?,?,?,'customer')", [displayName.trim(), normalized, await hashPassword(password)]);
      const user = await issueSession(req, res, { id: result.insertId, name: displayName.trim(), email: normalized, role: 'customer' });
      res.status(201).json(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'Không thể tạo tài khoản bằng email này.' });
      throw error;
    }
  });
  app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body || {};
    if (!validEmail(email) || typeof password !== 'string' || !password.length || password.length > 128) return res.status(400).json({ error: 'Thông tin đăng nhập không hợp lệ.' });
    const [rows] = await pool.execute('SELECT id,name,email,password_hash,role FROM users WHERE email=?', [email.trim().toLowerCase()]);
    const user = rows[0];
    const valid = await verifyPassword(password, user?.password_hash || await dummyHash);
    if (!valid || !user) return res.status(401).json({ error: 'Email hoặc mật khẩu chưa đúng.' });
    res.json(await issueSession(req, res, user));
  });
  app.get('/api/auth/me', authenticate, (req, res) => res.json(req.user));
  app.post('/api/auth/logout', async (req, res) => {
    const token = sessionToken(req);
    if (token) await pool.execute('DELETE FROM sessions WHERE token_hash=?', [tokenHash(token)]);
    res.clearCookie(name, cookie).sendStatus(204);
  });
  app.post('/api/auth/forgot-password', (_req, res) => res.status(503).json({ error: 'Khôi phục qua email chưa được cấu hình. Vui lòng liên hệ hỗ trợ.' }));
  app.get('/api/products', async (_req, res) => {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY featured DESC, id DESC');
    res.json(rows);
  });
  const getCart = async (userId) => {
    const [rows] = await pool.execute('SELECT id,product_id FROM cart_items WHERE user_id=? ORDER BY id', [userId]);
    return rows.flatMap(row => {
      const product = products.find(p => p.id === row.product_id);
      return product ? [{ ...product, cartId: row.id }] : [];
    });
  };
  app.get('/api/cart', authenticate, async (req, res) => res.json(await getCart(req.user.id)));
  app.post('/api/cart', authenticate, async (req, res) => {
    const id = req.body?.productId;
    if (!Number.isSafeInteger(id) || !products.some(p => p.id === id)) return res.status(400).json({ error: 'Sản phẩm không hợp lệ.' });
    await pool.execute('INSERT INTO cart_items (user_id,product_id) VALUES (?,?)', [req.user.id, id]);
    res.status(201).json(await getCart(req.user.id));
  });
  app.delete('/api/cart/:id', authenticate, async (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) return res.status(400).json({ error: 'Mã giỏ hàng không hợp lệ.' });
    const [result] = await pool.execute('DELETE FROM cart_items WHERE id=? AND user_id=?', [id, req.user.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Không tìm thấy sản phẩm trong giỏ.' });
    res.json(await getCart(req.user.id));
  });
  app.get('/api/orders', authenticate, async (req, res) => {
    const [rows] = await pool.execute('SELECT id,status,total,created_at FROM orders WHERE user_id=? ORDER BY id DESC LIMIT 100', [req.user.id]);
    res.json(rows);
  });
  app.get('/api/admin/users', authenticate, requireAdmin, async (_req, res) => {
    const [rows] = await pool.query('SELECT id,name,email,role,created_at FROM users ORDER BY id DESC LIMIT 100');
    res.json(rows);
  });
  app.get('/api/admin/orders', authenticate, requireAdmin, async (_req, res) => {
    const [rows] = await pool.query('SELECT id,user_id,status,total,created_at FROM orders ORDER BY id DESC LIMIT 100');
    res.json(rows);
  });
  app.use('/api', (_req, res) => res.status(404).json({ error: 'API không tồn tại.' }));
  app.use((error, _req, res, _next) => {
    if (error.type === 'entity.parse.failed') return res.status(400).json({ error: 'Dữ liệu JSON không hợp lệ.' });
    if (error.type === 'entity.too.large') return res.status(413).json({ error: 'Dữ liệu quá lớn.' });
    console.error('API failure:', error.code || error.name);
    res.status(500).json({ error: 'Không thể xử lý yêu cầu. Vui lòng thử lại sau.' });
  });
  return app;
}
