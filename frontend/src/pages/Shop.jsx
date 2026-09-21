import React, { useEffect, useMemo, useState } from "react";
import { categories, icons, products } from "../data/products";
import { ProductCard } from "../components/SiteChrome";
import "../styles/shop.css";

const filters = ["Tất cả", ...categories];
const queryFilters = {
  "Tất cả": "Tất cả",
  "Phòng khách": "Tất cả",
  Bàn: "Bàn",
  Đèn: "Đèn",
  "Phụ kiện": "Phụ kiện",
  "tat-ca": "Tất cả",
  ban: "Bàn",
  den: "Đèn",
  "phu-kien": "Phụ kiện",
};

export default function Shop({ navigate, add }) {
  const [activeFilter, setActiveFilter] = useState(
    () =>
      queryFilters[new URLSearchParams(location.search).get("category")] ||
      "Tất cả",
  );
  const [sortNewest, setSortNewest] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  useEffect(() => {
    setActiveFilter(
      queryFilters[new URLSearchParams(location.search).get("category")] ||
        "Tất cả",
    );
  }, [location.search]);
  const filteredProducts = useMemo(() => {
    const filtered =
      activeFilter === "Tất cả"
        ? [...products]
        : products.filter((product) => product.cat === activeFilter);
    const searched = searchTerm
      ? filtered.filter((product) =>
          `${product.name} ${product.cat}`.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : filtered;
    return sortNewest ? searched.reverse() : searched;
  }, [activeFilter, searchTerm, sortNewest]);
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const paginationPages = pageCount <= 7
    ? Array.from({ length: pageCount }, (_, index) => index + 1)
    : [...new Set([1, currentPage - 1, currentPage, currentPage + 1, pageCount])]
        .filter((page) => page >= 1 && page <= pageCount)
        .sort((a, b) => a - b);
  const selectFilter = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };
  const submitSearch = (event) => {
    event.preventDefault();
    setSearchTerm(searchInput.trim());
    setCurrentPage(1);
  };
  useEffect(() => {
    setCurrentPage((page) => Math.min(page, pageCount));
  }, [pageCount]);

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <div>
          <p className="eyebrow">THE NÉP COLLECTION · 2024</p>
          <h1>
            Đồ vật có
            <br />
            <em>linh hồn.</em>
          </h1>
          <p>
            Tuyển tập những thiết kế vượt qua mùa vụ, dành cho những không gian
            sống thật.
          </p>
        </div>
        <div className="shop-hero-image">
          <span>
            CURATED
            <br />
            FOR HOME
          </span>
        </div>
      </section>
      <section className="shop-intro">
        <div>
          <p className="eyebrow">CHỌN CHẬM · SỐNG LÂU</p>
          <h2>
            Một lựa chọn
            <br />
            <em>đáng để ở lại.</em>
          </h2>
        </div>
        <p>
          Nép tìm kiếm những món đồ có tỷ lệ đẹp, chất liệu tử tế và khả năng
          trở nên thân thuộc theo thời gian. Mỗi thiết kế đều được chọn bằng mắt
          nhìn và cảm giác chạm.
        </p>
      </section>
      <section className="shop-categories">
          <button onClick={() => selectFilter("Tất cả")}>
          <span>01</span>
          <b>Phòng khách</b>
          <i>→</i>
        </button>
        <button onClick={() => selectFilter("Bàn")}>
          <span>02</span>
          <b>Bàn & ghế</b>
          <i>→</i>
        </button>
        <button onClick={() => selectFilter("Đèn")}>
          <span>03</span>
          <b>Ánh sáng</b>
          <i>→</i>
        </button>
        <button onClick={() => selectFilter("Phụ kiện")}>
          <span>04</span>
          <b>Phụ kiện</b>
          <i>→</i>
        </button>
      </section>
      <section className="shop-catalog">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow">CURATED OBJECTS</p>
            <h2>
              {activeFilter === "Tất cả" ? "Tất cả sản phẩm" : activeFilter}
            </h2>
          </div>
          <span>
            {filteredProducts.length} sản phẩm <i>↓</i>
          </span>
        </div>
        <form className="shop-search" onSubmit={submitSearch}>
          <span aria-hidden="true">⌕</span>
          <input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Tìm sản phẩm, danh mục..." aria-label="Tìm kiếm sản phẩm" />
          <button type="submit">Tìm kiếm</button>
        </form>
        <div className="shop-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? "active" : ""}
              onClick={() => selectFilter(filter)}
            >
              {filter}
            </button>
          ))}
          <button
            className="sort-button"
            onClick={() => {
              setSortNewest((value) => !value);
              setCurrentPage(1);
            }}
          >
            Sắp xếp: {sortNewest ? "Mới nhất" : "Nổi bật"}{" "}
            <span className="sort-chevron" aria-hidden="true" />
          </button>
        </div>
        <div className="product-grid shop-grid">
          {visibleProducts.length ? (
            visibleProducts.map((p) => (
              <ProductCard key={p.id} p={p} navigate={navigate} add={add} />
            ))
          ) : (
            <p className="no-results">
              Chúng tôi đang tuyển chọn thêm sản phẩm cho danh mục này.
            </p>
          )}
        </div>
        {filteredProducts.length > 0 && (
          <div className="shop-pagination" aria-label="Phân trang sản phẩm">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage((page) => page - 1)}>← Trước</button>
            <div>
              {paginationPages.map((page) => (
                <button key={page} className={page === currentPage ? "active" : ""} onClick={() => setCurrentPage(page)}>{page}</button>
              ))}
            </div>
            <button disabled={currentPage === pageCount} onClick={() => setCurrentPage((page) => page + 1)}>Sau →</button>
          </div>
        )}
      </section>
      <section className="shop-note">
        <p className="eyebrow">NÉP SERVICE</p>
        <strong>Không chắc mình đang tìm gì?</strong>
        <p>
          Gửi cho chúng tôi một bức ảnh không gian. Đội ngũ Nép sẽ gợi ý những
          món đồ phù hợp nhất.
        </p>
        <a onClick={() => navigate("about")}>Nhận tư vấn riêng {icons.arrow}</a>
      </section>
    </main>
  );
}
