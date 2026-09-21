import React from "react";
import { icons } from "../data/products";
import "../styles/cart.css";

export default function Cart({ navigate, items, remove }) {
  const total = items.reduce(
    (sum, product) => sum + Number(product.price.replace(/\./g, "")),
    0,
  );
  return (
    <main className="page cart-page">
      <p className="eyebrow">YOUR SELECTION</p>
      <h1>
        Giỏ hàng <em>của bạn.</em>
      </h1>
      {items.length === 0 ? (
        <div className="empty-cart">
          <span>◌</span>
          <h2>Chưa có món đồ nào ở đây.</h2>
          <p>Một không gian đẹp bắt đầu từ một lựa chọn thật đúng.</p>
          <button className="button dark" onClick={() => navigate("shop")}>
            Khám phá sản phẩm {icons.arrow}
          </button>
        </div>
      ) : (
        <section className="cart-content">
          <div className="cart-items">
            {items.map((product, index) => (
              <article className="cart-item" key={`${product.id}-${index}`}>
                <img
                  src={product.img.startsWith("http") ? product.img : `https://images.unsplash.com/${product.img}?auto=format&fit=crop&w=500&q=85`}
                  alt={product.name}
                />
                <div>
                  <span>{product.cat}</span>
                  <h2>{product.name}</h2>
                  <strong>{product.price} ₫</strong>
                  <button onClick={() => remove(index)}>Xóa khỏi giỏ</button>
                </div>
              </article>
            ))}
          </div>
          <aside className="cart-summary">
            <p className="eyebrow">ORDER SUMMARY</p>
            <h2>Tóm tắt đơn hàng</h2>
            <div><span>Tạm tính</span><strong>{total.toLocaleString("vi-VN")} ₫</strong></div>
            <div><span>Phí giao hàng</span><strong>Miễn phí</strong></div>
            <div className="cart-total"><span>Tổng cộng</span><strong>{total.toLocaleString("vi-VN")} ₫</strong></div>
            <button className="button dark">Tiến hành thanh toán {icons.arrow}</button>
          </aside>
        </section>
      )}
      <section className="cart-benefits">
        <div>
          <b>01</b>
          <strong>Giao hàng an tâm</strong>
          <span>Đóng gói kỹ lưỡng, theo dõi được hành trình.</span>
        </div>
        <div>
          <b>02</b>
          <strong>Đổi trả dễ dàng</strong>
          <span>30 ngày trải nghiệm tại không gian của bạn.</span>
        </div>
        <div>
          <b>03</b>
          <strong>Tư vấn miễn phí</strong>
          <span>Gọi cho Nép nếu bạn cần một lựa chọn chắc chắn hơn.</span>
        </div>
      </section>
      <section className="cart-help">
        <p className="eyebrow">NEED A LITTLE HELP?</p>
        <h2>
          Để chúng tôi
          <br />
          <em>gợi ý cho bạn.</em>
        </h2>
        <p>
          Chia sẻ một góc nhà và ngân sách dự kiến, Nép sẽ gửi lại một
          shortlist vừa đủ.
        </p>
        <a onClick={() => navigate("contact")}>Liên hệ tư vấn {icons.arrow}</a>
      </section>
    </main>
  );
}
