import React from "react";
import { icons } from "../data/products";
import "../styles/service-article.css";

const articles = {
  support: {
    title: "Hỗ trợ khách hàng",
    intro:
      "Nép luôn sẵn sàng giải đáp về sản phẩm, đơn hàng, bảo hành và tư vấn không gian — trước, trong và sau khi bạn mua sắm.",
    image: "photo-1600210492486-724fe5c67fb0",
    tags: "hỗ trợ khách hàng · tư vấn · đơn hàng",
    sections: [
      [
        "Hỗ trợ trước khi mua",
        [
          "Tư vấn kích thước, màu sắc và chất liệu của từng sản phẩm.",
          "Gợi ý cách phối sản phẩm với không gian và đồ nội thất hiện có.",
          "Kiểm tra tình trạng hàng, thời gian giao và các lựa chọn thanh toán.",
        ],
      ],
      [
        "Hỗ trợ trong quá trình mua",
        [
          "Xác nhận thông tin đơn hàng và địa chỉ giao nhận.",
          "Cập nhật tiến độ chuẩn bị, vận chuyển và lắp đặt.",
          "Tiếp nhận yêu cầu thay đổi trong thời gian cho phép.",
        ],
      ],
      [
        "Hỗ trợ sau khi nhận hàng",
        [
          "Hướng dẫn sử dụng và bảo quản theo từng chất liệu.",
          "Tiếp nhận yêu cầu bảo hành, đổi trả hoặc kiểm tra sản phẩm.",
          "Theo dõi đến khi vấn đề được giải quyết hoàn toàn.",
        ],
      ],
    ],
  },
  warranty: {
    title: "Chính sách bảo hành",
    intro:
      "Chính sách bảo hành được áp dụng nhằm đảm bảo quyền lợi cho khách hàng khi sản phẩm gặp lỗi kỹ thuật hoặc lỗi từ nhà sản xuất.",
    image: "photo-1598300042247-d088f8ab3a91",
    tags: "chính sách bảo hành · dịch vụ bảo hành · hỗ trợ sửa chữa",
    sections: [
      [
        "1. Điều kiện bảo hành miễn phí",
        [
          "Sản phẩm còn trong thời hạn bảo hành và có đăng ký bảo hành.",
          "Sản phẩm bị hỏng do lỗi kỹ thuật của nhà sản xuất.",
          "Phiếu bảo hành hoặc thông tin đơn hàng còn nguyên vẹn, thể hiện rõ người mua và ngày mua.",
          "Khách hàng cung cấp hình ảnh/video tình trạng sản phẩm để Nép kiểm tra ban đầu.",
        ],
      ],
      [
        "2. Các trường hợp không được bảo hành miễn phí",
        [
          "Sản phẩm đã hết thời hạn bảo hành hoặc không xác định được nguồn gốc mua hàng.",
          "Hư hỏng do thiên tai, lũ lụt, hỏa hoạn, di chuyển sai cách hoặc sử dụng không đúng hướng dẫn.",
          "Bề mặt trầy xước, biến màu do va đập, hóa chất, vật nuôi hoặc điều kiện môi trường bất thường.",
          "Sản phẩm đã được tự ý sửa chữa, tháo lắp hoặc thay đổi kết cấu.",
        ],
      ],
      [
        "3. Quy trình tiếp nhận bảo hành",
        [
          "Bước 1: Gửi mã đơn hàng, mô tả lỗi và hình ảnh qua email hoặc hotline.",
          "Bước 2: Nép phản hồi trong 2 ngày làm việc và thống nhất phương án xử lý.",
          "Bước 3: Kỹ thuật viên kiểm tra trực tiếp nếu cần, sau đó sửa chữa hoặc thay thế theo điều kiện bảo hành.",
        ],
      ],
    ],
  },
  delivery: {
    title: "Giao hàng",
    intro:
      "Món đồ đẹp xứng đáng được nâng niu trên suốt hành trình từ showroom đến không gian sống của bạn.",
    image: "photo-1600607688969-a5bfcd646154",
    tags: "giao hàng · lắp đặt · vận chuyển",
    sections: [
      [
        "1. Chuẩn bị trước khi giao",
        [
          "Kiểm tra bề mặt, phụ kiện và số lượng sản phẩm.",
          "Đóng gói theo kích thước và đặc tính của từng chất liệu.",
          "Liên hệ xác nhận ngày, khung giờ và điều kiện lối vào.",
        ],
      ],
      [
        "2. Trong quá trình vận chuyển",
        [
          "Đơn hàng được bàn giao cho đối tác phù hợp với kích thước và trọng lượng.",
          "Khách hàng có thể liên hệ Nép để cập nhật tình trạng đơn.",
          "Các yêu cầu nâng hạ đặc biệt sẽ được thông báo chi phí trước khi giao.",
        ],
      ],
      [
        "3. Khi nhận sản phẩm",
        [
          "Kiểm tra ngoại quan và số lượng trước khi ký biên bản.",
          "Ghi nhận ngay tình trạng bất thường trên biên bản bàn giao.",
          "Dịch vụ lắp đặt được thực hiện theo lịch đã xác nhận.",
        ],
      ],
    ],
  },
  privacy: {
    title: "Bảo mật thông tin",
    intro:
      "Thông tin của bạn được bảo vệ và chỉ sử dụng để phục vụ trải nghiệm mua sắm tại Nép.",
    image: "photo-1616486338812-3dadae4b4ace",
    tags: "bảo mật thông tin · quyền riêng tư · dữ liệu",
    sections: [
      [
        "1. Thông tin chúng tôi thu thập",
        [
          "Họ tên, số điện thoại, email và địa chỉ giao hàng khi bạn đặt hàng.",
          "Thông tin sản phẩm, lịch sử giao dịch và yêu cầu hỗ trợ.",
          "Thông tin kỹ thuật cần thiết để cải thiện trải nghiệm trên website.",
        ],
      ],
      [
        "2. Cách chúng tôi sử dụng thông tin",
        [
          "Xử lý đơn hàng, giao hàng, thanh toán và chăm sóc sau mua.",
          "Liên hệ khi có thay đổi liên quan trực tiếp đến đơn hàng.",
          "Gửi thông tin thương hiệu hoặc ưu đãi khi bạn đã chủ động đăng ký.",
        ],
      ],
      [
        "3. Quyền của bạn",
        [
          "Yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân.",
          "Ngừng nhận email marketing bất cứ lúc nào.",
          "Liên hệ Nép nếu bạn có câu hỏi về cách dữ liệu được sử dụng.",
        ],
      ],
    ],
  },
  buying: {
    title: "Hướng dẫn mua hàng",
    intro:
      "Chọn món đồ, kiểm tra kích thước, xác nhận địa chỉ và để Nép lo phần còn lại.",
    image: "photo-1618220179428-22790b461013",
    tags: "hướng dẫn mua hàng · đặt hàng · sản phẩm",
    sections: [
      [
        "1. Tìm sản phẩm phù hợp",
        [
          "Duyệt theo danh mục hoặc chọn không gian bạn đang muốn hoàn thiện.",
          "Đọc thông tin kích thước, vật liệu, màu sắc và thời gian giao.",
          "Liên hệ tư vấn nếu cần kiểm tra khả năng phối hợp với căn phòng.",
        ],
      ],
      [
        "2. Thêm vào giỏ và xác nhận",
        [
          "Chọn sản phẩm và bấm Thêm vào giỏ hàng.",
          "Kiểm tra số lượng, giá trị đơn và phí giao hàng.",
          "Điền chính xác thông tin nhận hàng trước khi gửi yêu cầu đặt.",
        ],
      ],
      [
        "3. Sau khi đặt hàng",
        [
          "Nép kiểm tra tồn kho và liên hệ xác nhận đơn.",
          "Bạn nhận thông tin về lịch giao, phương thức thanh toán và lắp đặt.",
          "Theo dõi đơn và liên hệ hỗ trợ trong suốt quá trình giao nhận.",
        ],
      ],
    ],
  },
  terms: {
    title: "Điều khoản dịch vụ",
    intro:
      "Những nguyên tắc rõ ràng giúp mỗi giao dịch giữa Nép và khách hàng luôn thoải mái.",
    image: "photo-1549490349-8643362247b5",
    tags: "điều khoản · giao dịch · trách nhiệm",
    sections: [
      [
        "1. Thông tin sản phẩm",
        [
          "Hình ảnh có thể khác nhẹ do điều kiện ánh sáng và màn hình.",
          "Các vật liệu tự nhiên có vân, màu và dấu vết riêng.",
          "Kích thước và thông số trên website là thông tin tham khảo chính thức tại thời điểm đăng bán.",
        ],
      ],
      [
        "2. Xác nhận đơn hàng",
        [
          "Đơn chỉ được xác nhận sau khi Nép kiểm tra tồn kho và thông tin giao nhận.",
          "Giá, thời gian giao và phí dịch vụ được xác nhận trước khi hoàn tất.",
          "Sản phẩm đặt riêng sẽ có điều kiện riêng được thông báo trước.",
        ],
      ],
      [
        "3. Thay đổi và hủy đơn",
        [
          "Mọi thay đổi cần được xác nhận qua kênh liên hệ chính thức.",
          "Đơn đã bàn giao vận chuyển có thể phát sinh chi phí điều chỉnh.",
          "Nép bảo lưu quyền từ chối đơn có thông tin không hợp lệ.",
        ],
      ],
    ],
  },
  payment: {
    title: "Hướng dẫn thanh toán",
    intro:
      "Thanh toán linh hoạt bằng chuyển khoản, thẻ hoặc COD cho sản phẩm có sẵn.",
    image: "photo-1555041469-a586c61ea9bc",
    tags: "hướng dẫn thanh toán · chuyển khoản · COD",
    sections: [
      [
        "1. Chuyển khoản ngân hàng",
        [
          "Thông tin tài khoản được hiển thị sau khi đơn được xác nhận.",
          "Ghi đúng mã đơn hàng trong nội dung chuyển khoản.",
          "Gửi ảnh giao dịch nếu cần Nép kiểm tra nhanh hơn.",
        ],
      ],
      [
        "2. Thanh toán bằng thẻ",
        [
          "Giao dịch được xử lý qua cổng thanh toán bảo mật.",
          "Nép không lưu thông tin thẻ của khách hàng.",
          "Không chia sẻ mã OTP hoặc thông tin xác thực cho bất kỳ ai.",
        ],
      ],
      [
        "3. Thanh toán khi nhận hàng",
        [
          "Áp dụng cho sản phẩm có sẵn và khu vực được hỗ trợ.",
          "Kiểm tra sản phẩm trước khi hoàn tất bàn giao.",
          "Sản phẩm đặt riêng có thể cần đặt cọc theo thỏa thuận.",
        ],
      ],
    ],
  },
  freeDelivery: {
    title: "Miễn phí giao hàng",
    intro: "Tận hưởng miễn phí giao hàng toàn quốc cho đơn hàng từ 5.000.000₫.",
    image: "photo-1600607687920-4e2a09cf159d",
    tags: "miễn phí giao hàng · ưu đãi · vận chuyển",
    sections: [
      [
        "1. Điều kiện áp dụng",
        [
          "Đơn hàng có giá trị từ 5.000.000₫ sau chiết khấu.",
          "Áp dụng cho giao hàng tiêu chuẩn trên toàn quốc.",
          "Các đơn hàng tách nhiều lần vẫn được kiểm tra theo tổng giá trị đơn.",
        ],
      ],
      [
        "2. Phạm vi dịch vụ",
        [
          "Miễn phí vận chuyển đến địa chỉ có thể tiếp cận bằng phương tiện tiêu chuẩn.",
          "Khu vực đặc biệt hoặc yêu cầu nâng hạ có thể phát sinh phí.",
          "Phí lắp đặt không nằm trong ưu đãi giao hàng miễn phí.",
        ],
      ],
      [
        "3. Lưu ý khi nhận hàng",
        [
          "Nép liên hệ thống nhất lịch giao trước khi vận chuyển.",
          "Kiểm tra ngoại quan và phụ kiện khi nhận hàng.",
          "Liên hệ ngay nếu sản phẩm có dấu hiệu bất thường.",
        ],
      ],
    ],
  },
};
export default function ServiceArticle({ type, navigate }) {
  const page = articles[type] || articles.support;
  return (
    <main className="service-article page">
      <section className="article-top">
        <div
          className="article-cover"
          style={{
            backgroundImage: `url(https://images.unsplash.com/${page.image}?auto=format&fit=crop&w=1200&q=90)`,
          }}
        />
        <div className="article-heading">
          <p className="eyebrow">NÉP SERVICE · {page.tags}</p>
          <h1>{page.title}</h1>
          <p>{page.intro}</p>
          <div className="article-share">
            <span>● Chia sẻ bài viết</span>
            <button aria-label="Chia sẻ">↗</button>
          </div>
        </div>
      </section>
      <section className="article-body">
        <h2>MÔ TẢ DỊCH VỤ</h2>
        <p className="article-lead">
          {page.intro} Nép đặt sự minh bạch và trải nghiệm của khách hàng làm
          trọng tâm trong từng bước phục vụ.
        </p>
        {page.sections.map(([heading, items]) => (
          <section className="article-section" key={heading}>
            <h3>{heading}</h3>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              Nếu cần làm rõ thông tin hoặc có trường hợp đặc biệt, vui lòng
              liên hệ đội ngũ Nép trước khi thực hiện để được hướng dẫn chính
              xác.
            </p>
          </section>
        ))}
        <div className="article-callout">
          Cần hỗ trợ thêm?{" "}
          <a onClick={() => navigate("contact")}>Liên hệ Nép {icons.arrow}</a>
        </div>
      </section>
      <section className="article-related">
        <p className="eyebrow">DỊCH VỤ LIÊN QUAN</p>
        <div>
          <a onClick={() => navigate("service-support")}>
            Hỗ trợ khách hàng <span>→</span>
          </a>
          <a onClick={() => navigate("service-warranty")}>
            Chính sách bảo hành <span>→</span>
          </a>
          <a onClick={() => navigate("service-delivery")}>
            Giao hàng <span>→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
