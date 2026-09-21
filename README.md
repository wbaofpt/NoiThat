# Nép Living

Website bán nội thất theo phong cách editorial/luxury, xây dựng bằng React, Vite, Express và MySQL.

## Tính năng

- Trang chủ với hero banner, danh mục không gian và carousel tự động.
- Shop với hơn 300 sản phẩm, lọc theo danh mục và hiển thị 5 sản phẩm mỗi hàng.
- Trang chi tiết sản phẩm, giỏ hàng và đăng nhập/đăng ký.
- Các trang nội dung riêng: Giới thiệu, Dịch vụ, Tin tức và Liên hệ.
- Favicon/logo Nép Living dạng PNG.
- Giao diện responsive, hiệu ứng chuyển cảnh và hỗ trợ `prefers-reduced-motion`.

## Yêu cầu

- Node.js 18 trở lên
- MySQL 8 trở lên
- npm

## Cài đặt

```bash
npm install
```

Tạo file `.env` ở thư mục gốc:

```env
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nep_living
```

## Cấu hình MySQL

Chạy schema để tạo database và các bảng:

```bash
mysql -u root -p < backend/schema.sql
```

Sau đó seed dữ liệu sản phẩm:

```bash
npm run seed
```

Lệnh seed xoá dữ liệu sản phẩm hiện có và nạp lại danh sách 300 sản phẩm từ `frontend/src/data/products.js`.

## Chạy dự án

Mở hai terminal:

```bash
# Terminal 1 — frontend
npm run dev
```

```bash
# Terminal 2 — API server
npm run server
```

Frontend mặc định chạy tại `http://localhost:5173`, API chạy tại `http://localhost:4000`.

Build production:

```bash
npm run build
```

## API hiện có

| Method | Endpoint | Mô tả |
| --- | --- | --- |
| GET | `/api/products` | Lấy danh sách sản phẩm |
| POST | `/api/auth/register` | Đăng ký tài khoản |
| POST | `/api/auth/login` | Đăng nhập |

## Cấu trúc chính

```text
frontend/
├── components/       # Header, Footer, ProductCard
├── data/             # Dữ liệu 300 sản phẩm
├── pages/            # Các trang React riêng biệt
├── main.jsx          # Routing và khởi tạo ứng dụng
└── styles/           # Toàn bộ CSS của frontend
backend/
├── schema.sql        # Database schema
├── seed.js           # Nạp dữ liệu sản phẩm
└── server.js         # Express API
frontend/public/
├── nep-living-logo.png
└── nep-living-mark.png
```

## Lưu ý phát triển

- Các đường dẫn giao diện sử dụng slug tiếng Việt không dấu, ví dụ `/san-pham`, `/gioi-thieu`, `/dich-vu`.
- Ảnh sản phẩm hiện sử dụng Unsplash và cần có kết nối mạng để tải đầy đủ.
- Khôi phục mật khẩu qua email chưa cấu hình: API trả 503 thay vì thông báo đã gửi email. Thanh toán vẫn chưa tích hợp.

## Bảo mật và phân quyền

Sau khi tạo database (hoặc với database đang dùng), cấu hình `.env` rồi chạy:

```bash
npm run migrate:security
npm run server
```

Migration thêm cột `users.role`, bảng `sessions`, `cart_items`, chuyển mật khẩu văn bản cũ sang scrypt có salt. Có thể chạy lại; không xoá người dùng/sản phẩm/đơn hàng. Nên sao lưu database trước migration. Không chạy seed để nâng cấp bảo mật vì seed xoá danh sách sản phẩm.

- Đăng ký luôn tạo `customer`; trường role do client gửi không có hiệu lực.
- Phiên lưu tại MySQL, token ngẫu nhiên 256 bit chỉ gửi trong cookie HttpOnly, SameSite=Strict; database chỉ lưu hash token. Phiên hết hạn sau 8 giờ, đăng xuất thu hồi phiên. Mỗi request đọc lại role từ database.
- Giỏ hàng và đơn hàng cá nhân bắt buộc đăng nhập; user ID lấy từ phiên, không lấy từ request body. Giỏ hàng dùng catalog hiện có `frontend/src/data/products.js` để giữ ID nhất quán với giao diện; chưa chuyển catalog sang MySQL.
- `GET /api/admin/users` và `/api/admin/orders` chỉ dành cho admin (tối đa 100 bản ghi). Trang `/tai-khoan` hiện các mục quản trị cho admin.
- API giới hạn tần suất theo IP, giới hạn JSON 16 KB, Helmet, CORS theo origin và chống CSRF bằng kiểm tra Origin + header `X-Nep-Request: 1` cho mọi request ghi dữ liệu.
- Trình duyệt xác thực qua `/api/auth/me`, không tin dữ liệu tài khoản trong localStorage.

Cấp quyền cho một tài khoản đã đăng ký, từ máy chạy backend:

```bash
npm run user:role -- admin@example.com admin
# Thu hồi quyền
npm run user:role -- admin@example.com customer
```

Lệnh thu hồi mọi phiên của tài khoản đó. Không có mật khẩu admin mặc định; không cung cấp API công khai để tự cấp quyền.

Development: `FRONTEND_ORIGIN=http://localhost:5173`. Frontend dùng `VITE_API_URL` nếu cần thay địa chỉ API. Production: đặt `NODE_ENV=production`, `FRONTEND_ORIGIN` là origin HTTPS chính xác; cookie có Secure. Triển khai frontend/API cùng site để SameSite=Strict hoạt động. Giới hạn tần suất hiện lưu trong bộ nhớ một tiến trình; khi chạy nhiều instance cần store dùng chung. Nếu có reverse proxy cần cấu hình trust proxy theo hạ tầng thực tế, không tin tuỳ ý X-Forwarded-For.

```bash
npm run test:security
npm run test:security:mysql
npm run build
```

Kiểm thử HTTP dùng database giả lập để kiểm tra từ middleware đến route: mật khẩu, khách/khách hàng/admin, chống tự nâng quyền, CSRF, quyền sở hữu giỏ hàng, hết hạn, đăng xuất và rate limit. `test:security:mysql` kiểm tra SQL và luồng phiên/giỏ hàng thực, dùng transaction rồi rollback tài khoản/dữ liệu thử (có thể tăng bộ đếm AUTO_INCREMENT). Cần database đã migration và `.env` hợp lệ. Kiểm tra thêm HTTPS và reverse proxy khi triển khai.

Tham khảo: [Express security](https://expressjs.com/en/advanced/best-practice-security.html), [Node.js crypto](https://nodejs.org/api/crypto.html).
