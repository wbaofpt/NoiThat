import React from "react";
import { products, icons } from "../data/products";
import { ProductCard } from "../components/SiteChrome";
import "../styles/detail.css";

export default function ProductDetail({ add, navigate }) {
  const p = products[0];
  return (
    <main className="product-page">
      <section className="product-detail page">
        <div className="detail-image">
          <img
            src={
              p.img.startsWith("http")
                ? p.img
                : `https://images.unsplash.com/${p.img}?auto=format&fit=crop&w=1200&q=85`
            }
            alt={p.name}
          />
        </div>
        <div className="detail-copy">
          <p className="eyebrow">GHẾ · AF-001</p>
          <h1>{p.name}</h1>
          <p className="detail-price">{p.price} ₫</p>
          <p className="detail-description">
            Một chiếc ghế được cân bằng bằng bản năng. Arco ôm lấy cơ thể bằng
            da thuộc mềm và khung gỗ óc chó nguyên khối — càng dùng, càng đẹp.
          </p>
          <div className="specs">
            <div>
              <span>Chất liệu</span>
              <b>Da thuộc · Óc chó</b>
            </div>
            <div>
              <span>Kích thước</span>
              <b>78 × 83 × 76 cm</b>
            </div>
            <div>
              <span>Thời gian giao</span>
              <b>3 — 5 ngày</b>
            </div>
            <div>
              <span>Bảo hành</span>
              <b>24 tháng</b>
            </div>
          </div>
          <button className="button dark" onClick={() => add(p)}>
            Thêm vào giỏ <span>{icons.arrow}</span>
          </button>
          <div className="care">
            + Hướng dẫn bảo quản <br />+ Chính sách đổi trả 30 ngày
          </div>
        </div>
      </section>
      <section className="product-info-strip">
        <div>
          <b>01</b>
          <strong>Vật liệu tự nhiên</strong>
          <p>
            Da thuộc và gỗ óc chó sẽ phát triển patina đẹp hơn theo thời gian sử
            dụng.
          </p>
        </div>
        <div>
          <b>02</b>
          <strong>Đóng gói cẩn thận</strong>
          <p>Mỗi sản phẩm được kiểm tra, bọc chống sốc và giao tận nơi.</p>
        </div>
        <div>
          <b>03</b>
          <strong>Đổi trả 30 ngày</strong>
          <p>
            Thử món đồ trong không gian của bạn. Nếu chưa phù hợp, chúng tôi hỗ
            trợ đổi.
          </p>
        </div>
      </section>
      <section className="related-products page">
        <div className="section-head">
          <div>
            <p className="eyebrow">YOU MAY ALSO LIKE</p>
            <h2>
              Đặt cạnh sẽ <em>đẹp hơn.</em>
            </h2>
          </div>
        </div>
        <div className="product-grid">
          {products.slice(1, 5).map((product) => (
            <ProductCard
              key={product.id}
              p={product}
              navigate={navigate}
              add={add}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
