import React from "react";
import { icons } from "../data/products";
import "../styles/info.css";

const pages = {
  about: {
    label: "OUR PHILOSOPHY",
    title: (
      <>
        Một nơi chốn
        <br />
        <em>để trở về.</em>
      </>
    ),
    lead: "Nép tìm kiếm vẻ đẹp trong những điều bền vững — một đường cong đúng chỗ, một bề mặt chạm vào thấy ấm, một khoảng trống làm căn phòng rộng hơn.",
    image: "photo-1600607687920-4e2a09cf159d",
    cards: [
      ["Vật liệu tử tế", "Gỗ tự nhiên, linen, đá và da có nguồn gốc rõ ràng."],
      [
        "Thiết kế bền dáng",
        "Những tỷ lệ vượt thời gian, không chạy theo mùa vụ.",
      ],
      [
        "Đồ vật có câu chuyện",
        "Mỗi món đồ được chọn để sống cùng bạn thật lâu.",
      ],
    ],
  },
  services: {
    label: "NÉP SERVICE",
    title: (
      <>
        Dịch vụ
        <br />
        <em>của Nép.</em>
      </>
    ),
    lead: "Một hành trình mua sắm nhẹ nhàng, từ lúc bạn có ý tưởng đến khi món đồ tìm được chỗ đứng trong căn nhà.",
    image: "photo-1600210492486-724fe5c67fb0",
    cards: [
      [
        "Tư vấn không gian",
        "Đo đạc, lên moodboard và gợi ý phối đồ theo thói quen sống.",
      ],
      [
        "Giao hàng & lắp đặt",
        "Đóng gói, vận chuyển và lắp đặt tận nơi bởi đội ngũ Nép.",
      ],
      [
        "Chăm sóc sản phẩm",
        "Bảo quản, vệ sinh và hỗ trợ sau mua trong suốt vòng đời.",
      ],
    ],
  },
  "services-consult": {
    label: "NÉP SERVICE · 01",
    title: (
      <>
        Tư vấn
        <br />
        <em>không gian.</em>
      </>
    ),
    lead: "Một căn phòng tốt bắt đầu từ cách bạn muốn sống trong đó. Hãy để Nép giúp bạn nhìn thấy những khả năng đang có.",
    image: "photo-1618221195710-dd6b41faaea6",
    cards: [
      [
        "Bước 01 · Chia sẻ",
        "Gửi ảnh, mặt bằng và vài dòng về cảm giác bạn muốn có.",
      ],
      [
        "Bước 02 · Gợi ý",
        "Nhận moodboard, palette và shortlist sản phẩm phù hợp.",
      ],
      [
        "Bước 03 · Hoàn thiện",
        "Tinh chỉnh cùng chuyên gia đến khi mọi thứ vừa vặn.",
      ],
    ],
  },
  "services-delivery": {
    label: "NÉP SERVICE · 02",
    title: (
      <>
        Giao hàng
        <br />
        <em>chỉn chu.</em>
      </>
    ),
    lead: "Món đồ đẹp xứng đáng được nâng niu trên suốt hành trình đến căn nhà của bạn.",
    image: "photo-1600607688969-a5bfcd646154",
    cards: [
      ["Đóng gói an toàn", "Kiểm tra nhiều lớp, chống sốc và bảo vệ bề mặt."],
      [
        "Theo dõi đơn hàng",
        "Cập nhật lịch giao rõ ràng qua điện thoại và email.",
      ],
      ["Lắp đặt tận nơi", "Đội ngũ hỗ trợ hoàn thiện món đồ đúng vị trí."],
    ],
  },
  "services-care": {
    label: "NÉP SERVICE · 03",
    title: (
      <>
        Chăm sóc
        <br />
        <em>để dùng lâu.</em>
      </>
    ),
    lead: "Chất liệu tự nhiên sẽ đẹp hơn khi được chăm sóc đúng cách. Nép luôn ở đây sau ngày mua hàng.",
    image: "photo-1598300042247-d088f8ab3a91",
    cards: [
      ["Gỗ & đá", "Lau bằng khăn mềm, tránh ẩm đọng và ánh nắng gắt."],
      [
        "Da & linen",
        "Vệ sinh định kỳ bằng sản phẩm chuyên dụng, không chà mạnh.",
      ],
      ["Bảo hành", "Liên hệ Nép để được kiểm tra và hướng dẫn xử lý."],
    ],
  },
  news: {
    label: "THE NÉP JOURNAL",
    title: (
      <>
        Tin tức
        <br />
        <em>từ Nép.</em>
      </>
    ),
    lead: "Những ghi chép về không gian sống, người làm nghề và chất liệu tạo nên một món đồ đẹp.",
    image: "photo-1618221195710-dd6b41faaea6",
    cards: [
      [
        "Ánh sáng ở lại",
        "Cách nguồn sáng ấm thay đổi nhịp sinh hoạt trong căn phòng.",
      ],
      ["Nhà của bạn", "Những căn hộ thật và các chi tiết làm nên cá tính."],
      [
        "Chậm lại một chút",
        "Những nghi thức nhỏ giúp căn nhà trở thành nơi muốn về.",
      ],
    ],
  },
  "news-journal": {
    label: "NÉP JOURNAL · 08",
    title: (
      <>
        Ánh sáng
        <br />
        <em>ở lại.</em>
      </>
    ),
    lead: "Một căn phòng đẹp không cần lên tiếng. Nó chỉ cần đúng ánh sáng, đúng chất liệu và một khoảng lặng đủ dài.",
    image: "photo-1507473885765-e6ed057f782c",
    cards: [
      ["Ánh sáng tự nhiên", "Để nắng trở thành một phần của kiến trúc."],
      [
        "Đèn cho buổi tối",
        "Chọn nhiệt màu và vị trí cho những cuộc trò chuyện dài.",
      ],
      ["Một góc đọc sách", "Ba món đồ đủ tạo nên khoảng nghỉ riêng."],
    ],
  },
  "news-materials": {
    label: "MATERIAL STORIES",
    title: (
      <>
        Chuyện của
        <br />
        <em>vật liệu.</em>
      </>
    ),
    lead: "Từ thân cây, tấm đá đến sợi vải — mỗi chất liệu đều có một hành trình đáng để kể.",
    image: "photo-1549490349-8643362247b5",
    cards: [
      ["Gỗ óc chó", "Vân gỗ sâu và sắc nâu ấm theo thời gian."],
      ["Travertine", "Bề mặt tự nhiên, mỗi đường rỗ là một dấu vết riêng."],
      ["Linen dệt tay", "Sự không hoàn hảo làm nên cảm giác sống động."],
    ],
  },
  library: {
    label: "NÉP LIBRARY",
    title: (
      <>
        Thư viện
        <br />
        <em>cảm hứng.</em>
      </>
    ),
    lead: "Lookbook, bảng màu và những căn phòng được tuyển chọn để bạn tìm thấy một nhịp sống phù hợp.",
    image: "photo-1616486338812-3dadae4b4ace",
    cards: [
      ["Lookbook 2024", "Những cách kết hợp mới nhất từ bộ sưu tập Nép."],
      ["Material guide", "Chạm vào câu chuyện phía sau từng chất liệu."],
      ["Room planner", "Lưu lại moodboard cho góc sống của riêng bạn."],
    ],
  },
  "library-lookbook": {
    label: "NÉP LOOKBOOK",
    title: (
      <>
        Những căn phòng
        <br />
        <em>có nhịp riêng.</em>
      </>
    ),
    lead: "Một tuyển tập hình ảnh để bạn hình dung món đồ Nép khi bước vào đời sống thật.",
    image: "photo-1600210492486-724fe5c67fb0",
    cards: [
      ["Quiet morning", "Màu kem, gỗ sáng và ánh nắng đầu ngày."],
      ["Soft contrast", "Nâu gạch, đá mờ và một điểm nhấn xanh sâu."],
      ["After dark", "Ánh đèn ấm cho những buổi tối chậm rãi."],
    ],
  },
  "library-living": {
    label: "NÉP MOODBOARD",
    title: (
      <>
        Phòng khách
        <br />
        <em>thật tự nhiên.</em>
      </>
    ),
    lead: "Bắt đầu với những món đồ nền tảng, rồi để căn phòng dần kể câu chuyện của riêng nó.",
    image: "photo-1618220179428-22790b461013",
    cards: [
      ["Nền tảng", "Sofa, bàn trà và đèn sàn tạo thành nhịp chính."],
      ["Lớp lang", "Thêm thảm, gối và vật liệu có bề mặt."],
      ["Khoảng thở", "Để lại đủ khoảng trống cho ánh sáng và con người."],
    ],
  },
  contact: {
    label: "COME SAY HELLO",
    title: (
      <>
        Hãy nói
        <br />
        <em>với chúng tôi.</em>
      </>
    ),
    lead: "Bạn đang tìm một món đồ, cần tư vấn không gian hay chỉ muốn ghé qua xem chất liệu? Nép luôn sẵn lòng đón bạn.",
    image: "photo-1600607688969-a5bfcd646154",
    cards: [
      ["Showroom Hà Nội", "32 Xuân Diệu, Tây Hồ · 09:00–19:00 mỗi ngày."],
      ["Showroom Sài Gòn", "18 Thảo Điền, Quận 2 · 09:00–19:00 mỗi ngày."],
      ["Email & điện thoại", "hello@nepliving.vn · 090 123 4567"],
    ],
  },
};

export default function InfoPage({ type = "about", navigate }) {
  const page = pages[type] || pages.about;
  return (
    <main className={`page info-page info-${type}`}>
      <section className="info-hero">
        <div>
          <p className="eyebrow">{page.label}</p>
          <h1>{page.title}</h1>
          <p className="info-intro">{page.lead}</p>
        </div>
        <div
          className="info-hero-image"
          style={{
            backgroundImage: `url(https://images.unsplash.com/${page.image}?auto=format&fit=crop&w=1600&q=90)`,
          }}
        >
          <span>NÉP / {type.toUpperCase()}</span>
        </div>
      </section>
      <section className="info-values">
        <p className="eyebrow">EXPLORE THIS PAGE</p>
        <div className="info-card-grid">
          {page.cards.map(([title, text], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h2>{title}</h2>
              <p>{text}</p>
              <a
                onClick={() => navigate(type === "about" ? "shop" : "contact")}
              >
                Khám phá thêm {icons.arrow}
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="info-quote">
        <blockquote>
          “Mỗi lựa chọn đúng làm căn nhà gần với mình hơn.”
        </blockquote>
        <span>NÉP LIVING · HÀ NỘI / SÀI GÒN</span>
      </section>
    </main>
  );
}
