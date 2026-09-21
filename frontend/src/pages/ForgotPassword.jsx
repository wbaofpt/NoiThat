import React, { useState } from "react";
import "../styles/auth.css";
import { api } from '../api';


export default function ForgotPassword({ navigate }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      const result = await api('/auth/forgot-password', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(result.message);
    } catch (error) {
      setStatus(error.message || "Không thể kết nối máy chủ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page forgot-page">
      <section className="auth-visual" aria-label="Nép Living">
        <a className="auth-brand" onClick={() => navigate("home")}>
          <img src="/nep-living-logo.png" alt="Nép Living" />
        </a>
        <div className="auth-visual-copy">
          <p className="eyebrow">NÉP MEMBERS · 01</p>
          <h2>Tìm lại<br /><em>chìa khóa.</em></h2>
          <p>Một bước nhỏ để trở lại với những lựa chọn dành riêng cho căn nhà của bạn.</p>
        </div>
        <span className="auth-visual-index">01 <i>/ 03</i></span>
      </section>
      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-panel-topline">
            <span>ACCOUNT · 01</span>
            <button onClick={() => navigate("login")}>Quay lại đăng nhập →</button>
          </div>
          <p className="eyebrow">PASSWORD RECOVERY</p>
          <h1>Bạn quên<br /><em>mật khẩu?</em></h1>
          <p className="auth-intro">Nhập email đã dùng để đăng ký. Chúng tôi sẽ hướng dẫn bạn tạo lại mật khẩu mới.</p>
          <form className="auth-form-new" onSubmit={submit}>
            <label>Email<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="you@email.com" required /></label>
            {status && <p className="auth-status" role="status">{status}</p>}
            <button className="auth-submit" disabled={loading}>
              {loading ? "Đang gửi..." : "Gửi hướng dẫn"}<span>↗</span>
            </button>
          </form>
          <div className="forgot-steps">
            <div><b>01</b><span>Nhập email tài khoản</span></div>
            <div><b>02</b><span>Kiểm tra hộp thư</span></div>
            <div><b>03</b><span>Tạo mật khẩu mới</span></div>
          </div>
          <button className="forgot-back" onClick={() => navigate("login")}>← Quay lại trang đăng nhập</button>
        </div>
      </section>
    </main>
  );
}
