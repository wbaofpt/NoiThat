import React, { useEffect, useState } from "react";
import { icons, products } from "../data/products";
import { ProductCard } from "../components/SiteChrome";
import "../styles/home.css";

const categories = [
  ["01", "Phòng khách", "Sofa · Ghế", "category-living", "Sofa"],
  ["02", "Bàn ăn", "Bàn · Ghế", "category-dining", "Bàn"],
  ["03", "Ánh sáng", "Đèn · Phụ kiện", "category-light", "Đèn"],
  ["04", "Phòng ngủ", "Giường · Tủ", "category-bedroom", "Giường"],
  ["05", "Góc làm việc", "Bàn · Ghế", "category-office", "Văn phòng"],
  ["06", "Ngoài trời", "Bàn · Ghế", "category-outdoor", "Ngoài trời"],
  ["07", "Tủ & kệ", "Tủ · Kệ", "category-storage", "Tủ"],
  ["08", "Phụ kiện", "Gương · Thảm", "category-accessories", "Phụ kiện"],
];

function SearchBar() {
  return (
    <div className="home-search">
      <span>{icons.search}</span>
      <input
        placeholder="Tìm kiếm sản phẩm, chất liệu..."
        aria-label="Tìm kiếm sản phẩm"
      />
    </div>
  );
}

function CategoryCarousel({ navigate }) {
  const [start, setStart] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const maxStart = Math.max(0, categories.length - visibleCount);

  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth <= 620 ? 1 : window.innerWidth <= 980 ? 2 : 4);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    setStart((current) => Math.min(current, maxStart));
  }, [maxStart]);

  useEffect(() => {
    if (categories.length <= visibleCount) return undefined;
    const timer = setInterval(() => {
      setStart((current) => (current >= maxStart ? 0 : current + 1));
    }, 4600);
    return () => clearInterval(timer);
  }, [maxStart, visibleCount]);

  const move = (direction) => {
    setStart((current) => {
      if (direction === "next") return current >= maxStart ? 0 : current + 1;
      return current <= 0 ? maxStart : current - 1;
    });
  };

  return (
    <div className="category-carousel">
      <div className="home-category-viewport">
        <div
          className="home-category-track"
          style={{ transform: `translateX(calc(-${start} * (var(--category-card-width) + 14px)))` }}
        >
          {categories.map(([number, title, desc, kind, filter]) => (
            <button
              key={title}
              className={`category-card ${kind}`}
              onClick={() => navigate(`shop?category=${filter}`)}
            >
              <span>{number}</span>
              <strong>{title}</strong>
              <small>{desc}</small>
              <i>{icons.arrow}</i>
            </button>
          ))}
        </div>
      </div>
      <div className="category-carousel-controls">
        <div className="carousel-dots" aria-label="Điều hướng danh mục">
          {Array.from({ length: maxStart + 1 }, (_, index) => (
            <button
              key={index}
              className={index === start ? "active" : ""}
              onClick={() => setStart(index)}
              aria-label={`Hiển thị danh mục từ vị trí ${index + 1}`}
            />
          ))}
        </div>
        <div className="category-carousel-arrows">
          <button onClick={() => move("previous")} aria-label="Danh mục trước">←</button>
          <button onClick={() => move("next")} aria-label="Danh mục tiếp theo">→</button>
        </div>
      </div>
    </div>
  );
}

function ProductCarousel({ navigate, add }) {
  const [start, setStart] = useState(0);
  const total = products.length;
  const visibleCount = Math.min(5, total);
  const dotCount = Math.min(8, total);
  const dotStep = Math.max(1, Math.ceil(total / dotCount));
  const activeDot = Math.min(dotCount - 1, Math.floor(start / dotStep));
  const next = () => setStart((current) => (current + 1) % total);
  const previous = () => setStart((current) => (current - 1 + total) % total);

  useEffect(() => {
    if (total <= visibleCount) return undefined;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [total, visibleCount]);

  const visibleProducts = Array.from(
    { length: visibleCount },
    (_, index) => products[(start + index) % total],
  );
  return (
    <div className="product-carousel">
      <div className="carousel-stage" key={start}>
        {visibleProducts.map((product) => (
          <ProductCard
            key={`${start}-${product.id}`}
            p={product}
            navigate={navigate}
            add={add}
          />
        ))}
      </div>
      {total > visibleCount && (
        <div className="carousel-controls">
          <div className="carousel-dots">
            {Array.from({ length: dotCount }, (_, index) => (
              <button
                key={index}
                className={index === activeDot ? "active" : ""}
                onClick={() => setStart(Math.min(index * dotStep, total - 1))}
                aria-label={`Hiển thị nhóm sản phẩm ${index + 1}`}
              />
            ))}
          </div>
          <div>
            <button onClick={previous} aria-label="Sản phẩm trước">
              ←
            </button>
            <button onClick={next} aria-label="Sản phẩm tiếp theo">
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HomePage({ navigate, add }) {
  return (
    <main className="home-page">
      <div className="home-utility">
        <span>Miễn phí giao hàng toàn quốc cho đơn từ 5.000.000₫</span>
        <span>Showroom Hà Nội · Sài Gòn</span>
      </div>
      <section className="home-hero-wrap">
        <div className="home-hero-copy">
          <p className="eyebrow">NÉP SELECTS · 2024</p>
          <h1>
            Một căn nhà
            <br />
            <em>biết thở.</em>
          </h1>
          <p>
            Những món đồ được chọn để sống cùng bạn lâu hơn — tự nhiên, cân bằng
            và có chủ đích.
          </p>
          <button className="button light" onClick={() => navigate("shop")}>
            Mua sắm bộ sưu tập <span>{icons.arrow}</span>
          </button>
        </div>
        <div className="home-hero-image">
          <span className="hero-badge">
            NEW
            <br />
            <b>COLLECTION</b>
          </span>
          <div className="hero-caption">Living slowly / 01</div>
        </div>
      </section>
      <section className="home-content">
        <div className="home-section-heading">
          <div>
            <p className="eyebrow">EXPLORE NÉP</p>
            <h2>
              Chọn theo <em>không gian.</em>
            </h2>
          </div>
          <p>Điều gì đang thiếu trong căn phòng của bạn?</p>
        </div>
        <CategoryCarousel navigate={navigate} />
        <div className="home-section-heading bestseller-heading">
          <div>
            <p className="eyebrow">THE NÉP FAVOURITES</p>
            <h2>
              Bestsellers được <em>yêu thích.</em>
            </h2>
          </div>
          <button className="outline" onClick={() => navigate("shop")}>
            Xem tất cả {icons.arrow}
          </button>
        </div>
        <ProductCarousel navigate={navigate} add={add} />
        <div className="home-section-heading new-arrivals-heading">
          <div>
            <p className="eyebrow">JUST LANDED</p>
            <h2>
              Những món đồ <em>vừa về.</em>
            </h2>
          </div>
          <p>Thiết kế mới, đã sẵn sàng tìm một nơi để ở lại.</p>
        </div>
        <div className="product-grid home-product-grid">
          {products.slice(2, 6).map((p) => (
            <ProductCard key={p.id} p={p} navigate={navigate} add={add} />
          ))}
        </div>
      </section>
      <section className="service-ribbon">
        <div>
          <b>01</b>
          <strong>Giao hàng toàn quốc</strong>
          <span>Đóng gói cẩn thận, giao tận nơi.</span>
        </div>
        <div>
          <b>02</b>
          <strong>Tư vấn tận tâm</strong>
          <span>Giúp bạn chọn đúng cho căn nhà.</span>
        </div>
        <div>
          <b>03</b>
          <strong>Đổi trả dễ dàng</strong>
          <span>30 ngày để thật sự làm quen.</span>
        </div>
        <div>
          <b>04</b>
          <strong>Thanh toán linh hoạt</strong>
          <span>Chuyển khoản hoặc COD.</span>
        </div>
      </section>
      <section className="promise-section">
        <div className="promise-copy">
          <p className="eyebrow">OUR PROMISE</p>
          <h2>
            Đẹp có lý do.
            <br />
            <em>Dùng được thật lâu.</em>
          </h2>
          <p>
            Chúng tôi tin đồ nội thất tốt cần vượt qua cả ánh nhìn đầu tiên. Mỗi
            món đồ được chọn vì chất liệu, độ bền và cảm giác nó đem lại mỗi
            ngày.
          </p>
          <a className="text-link" onClick={() => navigate("about")}>
            Tìm hiểu về Nép {icons.arrow}
          </a>
        </div>
        <div className="promise-points">
          <div>
            <b>01</b>
            <strong>Vật liệu tử tế</strong>
            <span>Gỗ tự nhiên, linen, đá và da có nguồn gốc rõ ràng.</span>
          </div>
          <div>
            <b>02</b>
            <strong>Thiết kế bền dáng</strong>
            <span>Tỷ lệ vượt thời gian, không chạy theo mùa vụ.</span>
          </div>
          <div>
            <b>03</b>
            <strong>Chăm sóc trọn đời</strong>
            <span>Hướng dẫn bảo quản và hỗ trợ sau mua.</span>
          </div>
        </div>
      </section>
      <section className="home-story">
        <div className="story-ticket">
          <p className="eyebrow">THE NÉP JOURNAL · 08</p>
          <h2>
            Khoảng lặng
            <br />
            <em>cũng là một món đồ.</em>
          </h2>
          <p>
            Gợi ý tạo nên một góc đọc sách đủ yên: một chiếc ghế có tay vịn, đèn
            ánh sáng ấm và chiếc bàn nhỏ vừa đủ.
          </p>
          <button className="button dark" onClick={() => navigate("stories")}>
            Đọc câu chuyện <span>{icons.arrow}</span>
          </button>
        </div>
        <div className="story-collage">
          <div className="collage-one" />
          <div className="collage-two" />
          <div className="collage-three" />
          <div className="collage-four" />
        </div>
      </section>
      <section className="home-quote">
        <p className="eyebrow">FROM OUR COMMUNITY</p>
        <blockquote>
          “Nép không bán đồ để lấp đầy căn nhà. Nép giúp tôi chọn đúng những
          gì cần ở lại.”
        </blockquote>
        <span>— Lan Chi · Căn hộ ven hồ</span>
      </section>
      <section className="home-faq">
        <div>
          <p className="eyebrow">NEED TO KNOW</p>
          <h2>
            Những điều
            <br />
            <em>bạn hay hỏi.</em>
          </h2>
        </div>
        <div className="faq-list">
          <details open>
            <summary>Nép giao hàng trong bao lâu?</summary>
            <p>
              Đơn hàng có sẵn được giao trong 3–5 ngày làm việc. Với sản phẩm
              đặt riêng, thời gian dự kiến sẽ được thông báo trước khi xác nhận.
            </p>
          </details>
          <details>
            <summary>Sản phẩm có được lắp đặt không?</summary>
            <p>
              Đội ngũ Nép hỗ trợ lắp đặt tại Hà Nội và TP. Hồ Chí Minh. Vui
              lòng chọn dịch vụ khi thanh toán.
            </p>
          </details>
          <details>
            <summary>Tôi có thể xem sản phẩm trực tiếp ở đâu?</summary>
            <p>
              Ghé showroom tại Tây Hồ hoặc Thảo Điền để chạm thử chất liệu và
              nhận tư vấn phối không gian.
            </p>
          </details>
        </div>
      </section>
      <section className="home-newsletter">
        <p className="eyebrow">THE NÉP LETTER</p>
        <h2>
          Một chút cảm hứng,
          <br />
          <em>mỗi tháng một lần.</em>
        </h2>
        <div>
          <input placeholder="Địa chỉ email của bạn" />
          <button aria-label="Đăng ký">{icons.arrow}</button>
        </div>
      </section>
    </main>
  );
}
