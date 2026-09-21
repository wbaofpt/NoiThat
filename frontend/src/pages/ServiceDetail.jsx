import React from "react";
import { icons } from "../data/products";
import "../styles/info.css";
import "../styles/service-detail.css";

const pages = {
  support: {
    label: "CUSTOMER SUPPORT",
    title: (
      <>
        Hỗ trợ
        <br />
        <em>khách hàng.</em>
      </>
    ),
    lead: "Nép luôn sẵn sàng giải đáp về sản phẩm, đơn hàng, bảo hành và tư vấn không gian — trước, trong và sau khi bạn mua sắm.",
    image: "photo-1600210492486-724fe5c67fb0",
    intro:
      "Bạn không cần tự mình tìm câu trả lời. Từ câu hỏi về kích thước, chất liệu đến lịch giao hàng, đội ngũ chăm sóc của Nép sẽ giúp bạn có đủ thông tin để đưa ra lựa chọn tự tin.",
    steps: [
      [
        "Trước khi mua",
        "Tư vấn về kích thước, màu sắc, chất liệu và khả năng phối hợp với không gian hiện tại.",
      ],
      [
        "Trong khi mua",
        "Xác nhận đơn, địa chỉ, phương thức thanh toán và lịch giao rõ ràng qua email hoặc điện thoại.",
      ],
      [
        "Sau khi nhận hàng",
        "Hướng dẫn sử dụng, bảo quản, bảo hành và xử lý mọi vấn đề phát sinh.",
      ],
    ],
    faq: [
      [
        "Khi nào tôi nhận được phản hồi?",
        "Nép phản hồi trong giờ làm việc từ 09:00–18:00, thứ Hai đến thứ Bảy.",
      ],
      [
        "Tôi có thể đổi thông tin đơn hàng không?",
        "Có. Liên hệ trong vòng 12 giờ sau khi đặt để chúng tôi hỗ trợ điều chỉnh.",
      ],
      [
        "Tôi muốn tư vấn nhanh thì làm gì?",
        "Gọi 090 123 4567 hoặc ghé showroom gần bạn để được hỗ trợ trực tiếp.",
      ],
    ],
  },
  warranty: {
    label: "NÉP WARRANTY",
    title: (
      <>
        Chính sách
        <br />
        <em>bảo hành.</em>
      </>
    ),
    lead: "Mỗi sản phẩm Nép được bảo hành theo chất liệu và tiêu chuẩn riêng, minh bạch từ ngày bạn nhận hàng.",
    image: "photo-1598300042247-d088f8ab3a91",
    intro:
      "Chúng tôi tin vào những món đồ được làm để dùng lâu. Chính sách bảo hành là cam kết của Nép về chất lượng hoàn thiện và sự đồng hành trong suốt thời gian sử dụng.",
    steps: [
      [
        "Thời hạn",
        "Sản phẩm nội thất được bảo hành 24 tháng; phụ kiện và đèn theo thông tin trên từng sản phẩm.",
      ],
      [
        "Phạm vi",
        "Áp dụng cho lỗi kỹ thuật, kết cấu hoặc hoàn thiện phát sinh từ quá trình sản xuất.",
      ],
      [
        "Quy trình",
        "Gửi mã đơn hàng và hình ảnh tình trạng sản phẩm, đội ngũ sẽ phản hồi trong 2 ngày làm việc.",
      ],
    ],
    faq: [
      [
        "Bảo hành có mất phí không?",
        "Không mất phí nếu lỗi thuộc phạm vi bảo hành. Phí phát sinh sẽ được báo trước nếu do sử dụng sai hướng dẫn.",
      ],
      [
        "Tôi làm mất phiếu bảo hành thì sao?",
        "Chỉ cần cung cấp số điện thoại hoặc email đặt hàng để Nép tra cứu.",
      ],
      [
        "Sản phẩm trưng bày có được bảo hành không?",
        "Có, thời hạn cụ thể sẽ được ghi rõ tại thời điểm xác nhận đơn hàng.",
      ],
    ],
  },
  delivery: {
    label: "NÉP DELIVERY",
    title: (
      <>
        Giao hàng
        <br />
        <em>chỉn chu.</em>
      </>
    ),
    lead: "Theo dõi trọn hành trình món đồ từ showroom đến tận không gian sống của bạn.",
    image: "photo-1600607688969-a5bfcd646154",
    intro:
      "Món đồ đẹp xứng đáng được nâng niu trên suốt hành trình. Nép sử dụng vật liệu đóng gói phù hợp từng sản phẩm và luôn xác nhận lịch giao trước khi vận chuyển.",
    steps: [
      [
        "Chuẩn bị",
        "Sản phẩm được kiểm tra bề mặt, phụ kiện và chụp xác nhận trước khi đóng gói.",
      ],
      [
        "Vận chuyển",
        "Đơn hàng được bàn giao cho đối tác phù hợp với kích thước và trọng lượng sản phẩm.",
      ],
      [
        "Bàn giao",
        "Nhân viên kiểm tra cùng bạn tại chỗ và hỗ trợ lắp đặt nếu dịch vụ đã được chọn.",
      ],
    ],
    faq: [
      [
        "Phí giao hàng được tính thế nào?",
        "Phí phụ thuộc khu vực, kích thước và số lượng sản phẩm; hệ thống sẽ báo trước khi xác nhận.",
      ],
      [
        "Tôi có được chọn ngày giao không?",
        "Có. Nép sẽ liên hệ để thống nhất khung giờ thuận tiện nhất.",
      ],
      [
        "Nếu sản phẩm bị trầy xước khi giao?",
        "Vui lòng ghi nhận ngay trên biên bản bàn giao để chúng tôi xử lý nhanh chóng.",
      ],
    ],
  },
  privacy: {
    label: "YOUR PRIVACY",
    title: (
      <>
        Bảo mật
        <br />
        <em>thông tin.</em>
      </>
    ),
    lead: "Thông tin của bạn được bảo vệ và chỉ sử dụng để phục vụ trải nghiệm mua sắm tại Nép.",
    image: "photo-1616486338812-3dadae4b4ace",
    intro:
      "Nép tôn trọng quyền riêng tư của khách hàng. Chúng tôi chỉ thu thập những thông tin cần thiết để xử lý đơn hàng, hỗ trợ dịch vụ và gửi thông tin bạn đã chủ động đăng ký.",
    steps: [
      [
        "Thu thập tối thiểu",
        "Chỉ yêu cầu thông tin cần thiết như họ tên, liên hệ, địa chỉ giao hàng và thanh toán.",
      ],
      [
        "Lưu trữ an toàn",
        "Dữ liệu được giới hạn quyền truy cập và bảo vệ bằng các biện pháp kỹ thuật phù hợp.",
      ],
      [
        "Bạn luôn có quyền",
        "Có thể yêu cầu xem, chỉnh sửa hoặc ngừng nhận thông tin marketing bất cứ lúc nào.",
      ],
    ],
    faq: [
      [
        "Nép có bán dữ liệu khách hàng không?",
        "Không. Nép không bán hoặc trao đổi dữ liệu cá nhân cho bên thứ ba.",
      ],
      [
        "Tôi muốn ngừng nhận email?",
        "Bấm hủy đăng ký ở cuối email hoặc liên hệ để chúng tôi xử lý.",
      ],
      [
        "Dữ liệu thanh toán được lưu ở đâu?",
        "Nép không lưu thông tin thẻ; giao dịch được xử lý qua cổng thanh toán an toàn.",
      ],
    ],
  },
  buying: {
    label: "SHOPPING GUIDE",
    title: (
      <>
        Hướng dẫn
        <br />
        <em>mua hàng.</em>
      </>
    ),
    lead: "Chọn món đồ, kiểm tra kích thước, xác nhận địa chỉ và để Nép lo phần còn lại.",
    image: "photo-1618220179428-22790b461013",
    intro:
      "Mua nội thất là một lựa chọn có tính lâu dài. Hướng dẫn này giúp bạn đi qua từng bước thật nhẹ nhàng, từ lúc tìm cảm hứng đến khi món đồ có mặt trong căn nhà.",
    steps: [
      [
        "Tìm cảm hứng",
        "Duyệt bộ sưu tập, lọc theo danh mục và lưu lại những món đồ bạn yêu thích.",
      ],
      [
        "Kiểm tra kỹ",
        "Đọc kích thước, chất liệu, màu sắc và thời gian giao trước khi thêm vào giỏ.",
      ],
      [
        "Hoàn tất",
        "Điền thông tin nhận hàng, chọn thanh toán và chờ Nép xác nhận đơn.",
      ],
    ],
    faq: [
      [
        "Tôi có thể đặt hàng qua showroom không?",
        "Có. Đội ngũ showroom sẽ tạo đơn và tư vấn trực tiếp cho bạn.",
      ],
      [
        "Làm sao biết sản phẩm vừa với nhà?",
        "Đo khoảng trống, lối vận chuyển và tham khảo kích thước chi tiết trên trang sản phẩm.",
      ],
      [
        "Tôi có thể hủy đơn không?",
        "Có thể hủy trước khi đơn được bàn giao cho đơn vị vận chuyển.",
      ],
    ],
  },
  terms: {
    label: "NÉP TERMS",
    title: (
      <>
        Điều khoản
        <br />
        <em>dịch vụ.</em>
      </>
    ),
    lead: "Những nguyên tắc rõ ràng giúp mỗi giao dịch giữa Nép và khách hàng luôn thoải mái.",
    image: "photo-1549490349-8643362247b5",
    intro:
      "Các điều khoản giúp hai bên hiểu rõ trách nhiệm, thời gian và cách xử lý trong những tình huống thường gặp khi mua sắm nội thất.",
    steps: [
      [
        "Thông tin sản phẩm",
        "Hình ảnh và màu sắc có thể thay đổi nhẹ theo màn hình và đặc tính tự nhiên của vật liệu.",
      ],
      [
        "Đơn hàng",
        "Đơn chỉ được xác nhận sau khi Nép kiểm tra tồn kho và thông tin giao nhận.",
      ],
      [
        "Thay đổi",
        "Mọi thay đổi về đơn cần được xác nhận bằng văn bản hoặc qua kênh liên hệ chính thức.",
      ],
    ],
    faq: [
      [
        "Giá trên website đã gồm VAT chưa?",
        "Giá niêm yết đã bao gồm VAT, chưa bao gồm phí lắp đặt nếu có.",
      ],
      [
        "Sản phẩm đặt riêng có đổi trả không?",
        "Sản phẩm đặt theo kích thước riêng sẽ có chính sách riêng được báo trước.",
      ],
      [
        "Kênh liên hệ chính thức của Nép?",
        "Email hello@nepliving.vn và số 090 123 4567.",
      ],
    ],
  },
  payment: {
    label: "EASY PAYMENT",
    title: (
      <>
        Hướng dẫn
        <br />
        <em>thanh toán.</em>
      </>
    ),
    lead: "Thanh toán linh hoạt bằng chuyển khoản, thẻ hoặc COD cho sản phẩm có sẵn.",
    image: "photo-1555041469-a586c61ea9bc",
    intro:
      "Nép cung cấp nhiều lựa chọn thanh toán để bạn có thể hoàn tất đơn hàng theo cách thuận tiện và an toàn nhất.",
    steps: [
      [
        "Chuyển khoản",
        "Thông tin tài khoản được hiển thị sau khi xác nhận đơn; ghi đúng mã đơn trong nội dung.",
      ],
      [
        "Thẻ thanh toán",
        "Thanh toán qua cổng bảo mật, không chia sẻ thông tin thẻ với Nép.",
      ],
      [
        "Thanh toán khi nhận",
        "Áp dụng cho sản phẩm đủ điều kiện và đơn hàng trong khu vực hỗ trợ.",
      ],
    ],
    faq: [
      [
        "Tôi đã chuyển khoản nhưng chưa thấy xác nhận?",
        "Gửi ảnh giao dịch kèm mã đơn để đội ngũ kiểm tra nhanh hơn.",
      ],
      [
        "Có thể thanh toán một phần không?",
        "Với sản phẩm đặt riêng, Nép sẽ thông báo rõ mức cọc trước khi sản xuất.",
      ],
      [
        "Thanh toán có xuất hóa đơn không?",
        "Có. Vui lòng cung cấp thông tin xuất hóa đơn khi đặt hàng.",
      ],
    ],
  },
  freeDelivery: {
    label: "NÉP BENEFIT",
    title: (
      <>
        Miễn phí
        <br />
        <em>giao hàng.</em>
      </>
    ),
    lead: "Tận hưởng miễn phí giao hàng toàn quốc cho đơn hàng từ 5.000.000₫.",
    image: "photo-1600607687920-4e2a09cf159d",
    intro:
      "Đây là một trong những đặc quyền Nép dành cho những lựa chọn đủ lớn để tạo nên một thay đổi rõ ràng trong không gian sống.",
    steps: [
      [
        "Điều kiện",
        "Đơn hàng có giá trị từ 5.000.000₫ sau chiết khấu được áp dụng ưu đãi.",
      ],
      [
        "Khu vực",
        "Áp dụng toàn quốc; một số khu vực đặc biệt có thể cần phụ phí nâng hạ.",
      ],
      [
        "Dịch vụ thêm",
        "Phí lắp đặt hoặc các yêu cầu ngoài tiêu chuẩn sẽ được báo riêng.",
      ],
    ],
    faq: [
      [
        "Đơn nhiều sản phẩm có được gộp giao không?",
        "Nép sẽ gộp nếu sản phẩm sẵn sàng cùng lúc và phù hợp với lịch giao.",
      ],
      [
        "Miễn phí có gồm lắp đặt không?",
        "Ưu đãi áp dụng cho vận chuyển tiêu chuẩn, chưa bao gồm lắp đặt.",
      ],
      [
        "Đơn dưới 5 triệu thì sao?",
        "Phí vận chuyển sẽ được tính theo khu vực và kích thước sản phẩm.",
      ],
    ],
  },
};

export default function ServiceDetail({ type, navigate }) {
  const page = pages[type] || pages.support;
  return (
    <main className={`page info-page service-detail service-${type}`}>
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
          <span>NÉP SERVICE</span>
        </div>
      </section>
      <section className="service-detail-body">
        <div>
          <p className="eyebrow">ĐIỀU BẠN CẦN BIẾT</p>
          <h2>{page.intro}</h2>
        </div>
        <div className="service-copy">
          <p>
            Nép xây dựng quy trình đơn giản, minh bạch và dễ hiểu để bạn luôn
            biết điều gì sẽ xảy ra tiếp theo.
          </p>
          <a className="text-link" onClick={() => navigate("contact")}>
            Cần hỗ trợ riêng {icons.arrow}
          </a>
        </div>
      </section>
      <section className="service-steps">
        {page.steps.map(([title, text], index) => (
          <div key={title}>
            <b>0{index + 1}</b>
            <strong>{title}</strong>
            <span>{text}</span>
          </div>
        ))}
      </section>
      <section className="service-faq">
        <p className="eyebrow">FAQ · GIẢI ĐÁP NHANH</p>
        {page.faq.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
    </main>
  );
}
