import React, { useState } from "react";
import "../styles/auth.css";
import { api } from '../api';


export default function Auth({ register = false, navigate, onAuth }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const result = await api(`/auth/${register ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      await onAuth(result);
      navigate("home");
    } catch (requestError) {
      setError(requestError.message || "Không thể kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-visual" aria-label="Nép Living">
        <a className="auth-brand" onClick={() => navigate("home")}>
          <img src="/nep-living-logo.png" alt="Nép Living" />
        </a>
        <div className="auth-visual-copy">
          <p className="eyebrow">NÉP MEMBERS · 2024</p>
          <h2>Một căn nhà<br /><em>bắt đầu từ bạn.</em></h2>
          <p>Thêm những món đồ có câu chuyện vào không gian bạn gọi là nhà.</p>
        </div>
        <span className="auth-visual-index">01 <i>/ 02</i></span>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-panel-topline">
            <span>ACCOUNT</span>
            <button onClick={() => navigate("home")}>Quay lại trang chủ →</button>
          </div>
          <div className="auth-tabs" role="tablist" aria-label="Tài khoản">
            <button className={!register ? "active" : ""} onClick={() => navigate("login")} role="tab">Đăng nhập</button>
            <button className={register ? "active" : ""} onClick={() => navigate("register")} role="tab">Tạo tài khoản</button>
          </div>
          <p className="eyebrow">NÉP LIVING</p>
          <h1>{register ? "Tạo tài khoản mới." : "Chào mừng trở lại."}</h1>
          <p className="auth-intro">
            {register ? "Lưu lại những lựa chọn yêu thích và theo dõi đơn hàng dễ dàng." : "Đăng nhập để tiếp tục chọn những món đồ dành cho không gian của bạn."}
          </p>
          <form className="auth-form-new" onSubmit={submit}>
            {register && (
              <label>Họ và tên<input name="name" placeholder="Nguyễn Minh Anh" required /></label>
            )}
            <label>Email<input name="email" type="email" placeholder="you@email.com" required /></label>
            <label>Mật khẩu<input name="password" type="password" autoComplete={register ? 'new-password' : 'current-password'} minLength={register ? 12 : undefined} maxLength={128} placeholder={register ? 'Ít nhất 12 ký tự' : '••••••••'} required /></label>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button className="auth-submit" disabled={loading}>
              {loading ? "Đang xử lý..." : register ? "Tạo tài khoản" : "Đăng nhập"}<span>↗</span>
            </button>
          </form>
          {!register && <button className="auth-forgot" type="button" onClick={() => navigate("forgot")}>Bạn quên mật khẩu?</button>}
          <div className="auth-benefits-new">
            <span><b>01</b> Lưu sản phẩm yêu thích</span>
            <span><b>02</b> Theo dõi đơn hàng dễ dàng</span>
            <span><b>03</b> Nhận ưu đãi riêng từ Nép</span>
          </div>
        </div>
      </section>
    </main>
  );
}
