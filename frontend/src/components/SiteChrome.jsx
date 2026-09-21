import React from "react";
import { icons } from "../data/products";
import "../styles/chrome.css";

function MenuItem({ label, navigate, route, children }) {
  return (
    <div className="nav-dropdown">
      <button onClick={() => navigate(route)}>
        {label}
        <span className="nav-chevron" aria-hidden="true" />
      </button>
      <div className="dropdown-panel">
        {children.map(([title, path]) => (
          <a key={title} onClick={() => navigate(path)}>
            {title}
          </a>
        ))}
      </div>
    </div>
  );
}
export function Header({ navigate, cart, user, logout }) {
  return (
    <header className="site-header">
      <div className="site-announcement">
        <span>NÉP STUDIO · OBJECTS FOR SLOW LIVING</span>
        <span>
          Miễn phí giao hàng toàn quốc từ 5.000.000₫ <b>→</b>
        </span>
      </div>
      <div className="header-main">
        <button
          className="mobile-menu"
          onClick={() => navigate("shop")}
          aria-label="Mở menu"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
        <a className="logo" onClick={() => navigate("home")} aria-label="Nép Living - Trang chủ">
          <span className="logo-mark" aria-hidden="true">
            <svg viewBox="0 0 32 38"><path d="M4 35V14C4 8.48 8.48 4 14 4h4c5.52 0 10 4.48 10 10v21" /><path d="M4 35h12V19h12M20 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /></svg>
          </span>
          <span className="logo-wordmark" aria-hidden="true"><img className="brand-logo-image" src="/nep-living-logo.png" alt="" /></span>
        </a>
        <nav className="header-nav">
          <a onClick={() => navigate("home")}>Trang chủ</a>
          <a onClick={() => navigate("about")}>Giới thiệu</a>
          <MenuItem
            label="Sản phẩm"
            route="shop"
            navigate={navigate}
            children={[
              ["Tất cả sản phẩm", "shop"],
              ["Phòng khách", "shop?category=Tất cả"],
              ["Bàn & ghế", "shop?category=Bàn"],
              ["Ánh sáng", "shop?category=Đèn"],
            ]}
          />
          <MenuItem
            label="Dịch vụ"
            route="services"
            navigate={navigate}
            children={[
              ["Hỗ trợ khách hàng", "service-support"],
              ["Chính sách bảo hành", "service-warranty"],
              ["Giao hàng", "service-delivery"],
              ["Bảo mật thông tin", "service-privacy"],
              ["Hướng dẫn mua hàng", "service-buying"],
              ["Điều khoản dịch vụ", "service-terms"],
              ["Hướng dẫn thanh toán", "service-payment"],
              ["Miễn phí giao hàng", "service-free-delivery"],
            ]}
          />
          <MenuItem
            label="Tin tức"
            route="news"
            navigate={navigate}
            children={[
              ["Nép Journal", "news-journal"],
              ["Câu chuyện vật liệu", "news-materials"],
            ]}
          />
          <a onClick={() => navigate("contact")}>Liên hệ</a>
        </nav>
        <nav className="header-account">
          {user && <button type="button" onClick={logout}>Đăng xuất</button>}
          <a onClick={() => navigate(user ? 'account' : 'login')}>
            <span className="ui-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-3.2 3.1-5 7-5s6.2 1.8 7 5" /></svg>
            </span>
            <em>{user ? user.name : 'Tài khoản'}</em>
          </a>
          <a onClick={() => navigate("cart")} className="bag">
            <span className="ui-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>
            </span>
            <em>Giỏ hàng</em>
            {cart > 0 && <b>{cart}</b>}
          </a>
        </nav>
      </div>
    </header>
  );
}
export function Footer({ navigate }) {
  return (
    <footer>
      <a className="logo" onClick={() => navigate("home")}>
        <img src="/nep-living-logo.png" alt="Nép Living" />
      </a>
      <p>Những món đồ làm nên một nơi chốn.</p>
      <small>© 2024 Nép Living · Hà Nội / Sài Gòn</small>
    </footer>
  );
}
export function ProductCard({ p, navigate, add }) {
  return (
    <article className="product-card">
      <div className="product-image" onClick={() => navigate("product")}>
        <img
          src={
            p.img.startsWith("http")
              ? p.img
              : `https://images.unsplash.com/${p.img}?auto=format&fit=crop&w=1200&q=85`
          }
          alt={p.name}
        />
        {p.tag && <span className="tag">{p.tag}</span>}
        <button
          className="quick"
          onClick={(e) => {
            e.stopPropagation();
            add(p);
          }}
        >
          Thêm vào giỏ <span>{icons.arrow}</span>
        </button>
      </div>
      <div className="product-meta">
        <span>{p.cat}</span>
        <h3>{p.name}</h3>
        <strong>
          {p.price} <small>₫</small>
        </strong>
      </div>
    </article>
  );
}
