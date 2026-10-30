# 07 - Hạng mục Xuyên suốt: ADR, Spikes, Câu hỏi mở & Rủi ro

---

## 1. Danh mục Quyết định Kiến trúc (ADR)

| ID | St | Quyết định | Hạn chốt | Mô tả & Trạng thái |
| :--- | :---: | :--- | :---: | :--- |
| **ADR-0001** | `[ ]` | Lựa chọn công cụ quản trị Monorepo: Nx vs Turborepo | W4 | Chọn Turborepo hoặc Nx kết hợp pnpm workspace. |
| **ADR-0002** | `[ ]` | Lựa chọn khung React Native: Expo Prebuild vs React Native CLI thuần | W3 | Đánh giá sau khi làm PoC với native player. |
| **ADR-0003** | `[ ]` | Lựa chọn Native Player chính thức (LibVLC vs Media3/ExoPlayer/FFmpeg) | W3 | Cổng quyết định sống còn của dự án sau PoC. |
| **ADR-0004** | `[ ]` | Đặc tả `ConnectionTestPort` tách biệt `camera-registry` và `diagnostics` | W4 | Đảm bảo không vi phạm ranh giới module (AR-01..03). |
| **ADR-0005** | `[ ]` | Lựa chọn thư viện SQLite (`op-sqlite` vs `expo-sqlite`) & Secure Store | W5 | Tối ưu tốc độ đọc ghi danh sách camera và bảo mật. |
| **ADR-0006** | `[ ]` | Lựa chọn kiến trúc xem từ xa: WireGuard VPN vs WebRTC/TURN Relay | W14 | Chỉ cần nếu người dùng duyệt triển khai Phase 4. |

---

## 2. Danh mục Thử nghiệm Kỹ thuật (Technical Spikes)

| ID | St | Nội dung Spike | Tuần | Tiêu chí Kết luận |
| :--- | :---: | :--- | :---: | :--- |
| **SP-01** | `[ ]` | Đánh giá Native Player tự viết vs Thư viện bọc LibVLC có sẵn | W3 | Độ trễ, tải CPU, kích thước app, giấy phép. |
| **SP-02** | `[ ]` | Tinh chỉnh tham số Low-Latency buffer cho luồng RTSP | W3, W11 | Đạt tiêu chuẩn NFR-002 (độ trễ $\le 1.5\,\text{s}$). |
| **SP-03** | `[ ]` | Thử nghiệm WS-Discovery UDP Multicast trên iOS & Android thật | W9 | Phát hiện được camera trong LAN có và không có quyền multicast. |
| **SP-04** | `[ ]` | Hiện thực ONVIF client bằng TypeScript thuần vs Native module | W9 | Giao tiếp SOAP/Digest auth thành công trên camera thật. |
| **SP-05** | `[ ]` | Khảo sát sự kiện ONVIF Events (PullPoint subscription) | W13 | Camera thật có trả về sự kiện chuyển động qua LAN không. |
| **SP-06** | `[ ]` | Khảo sát khả năng phát lại video thẻ nhớ qua Profile G / Replay URI | W13 | Camera thật có hỗ trợ API trích xuất luồng video lịch sử không. |
| **SP-07** | `[ ]` | Xây dựng thanh thước thời gian (Timeline) bằng Skia + Virtualization | W17 | Cuộn mượt mà 60fps qua các mốc thời gian ghi hình. |
| **SP-08** | `[ ]` | Module Federation trên React Native (Re.Pack) | Tùy chọn | Đánh giá tính khả thi nếu muốn OTA từng feature. |
| **SP-09** | `[ ]` | Mô hình Relay WebRTC + TURN Server + Home Agent | W16 | Đo độ trễ truyền phát qua mạng 4G/5G và chi phí máy chủ. |
| **SP-10** | `[ ]` | Cơ chế đẩy thông báo Push FCM/APNs qua Agent nội bộ | W17 | Tỷ lệ nhận thông báo thành công khi app bị đóng hoàn toàn. |
| **SP-11** | `[ ]` | Dựng môi trường phát luồng RTSP giả lập bằng MediaMTX & FFmpeg | W2 | Hỗ trợ lập trình viên test không cần phụ thuộc camera vật lý. |
| **SP-12** | `[ ]` | Giới hạn số lượng Hardware Decoder đồng thời trên các dòng máy | W11 | Lập bảng giới hạn an toàn cho tính năng xem lưới Multi-view. |
| **SP-13** | `[ ]` | Thiết lập bộ luật tự động kiểm tra vi phạm ranh giới Module trong CI | W4 | CI báo lỗi đỏ ngay lập tức khi phát hiện import chéo trái phép. |

---

## 3. Danh mục Câu hỏi Mở (Open Questions - OQ)

| ID | St | Nội dung câu hỏi | Độ ưu tiên | Hạn trả lời | Trạng thái / Kết luận |
| :--- | :---: | :--- | :---: | :---: | :--- |
| **OQ-01** | `[ ]` | Dòng camera "iMouse" trong yêu cầu gốc là model/hãng nào? (Có phải Imou Dahua?) | Cao | W1 | Đang xác nhận với người dùng. |
| **OQ-02** | `[ ]` | Có tồn tại SDK/API chính thức của Yoosee / Imou mở cho bên thứ 3 không? | Cao | W3 | Rà soát sơ bộ: Đều khóa cloud, hướng đi RTSP LAN là chuẩn xác. |
| **OQ-03** | `[ ]` | Danh sách model + firmware camera cụ thể đang có sẵn để thử nghiệm? | Cao | W1 | Chờ người dùng cung cấp thông tin thiết bị. |
| **OQ-04** | `[ ]` | Người dùng có thực sự cần xem từ xa ngoài mạng trong giai đoạn đầu? | Trung bình | Trước G4 | MVP tập trung 100% vào mạng LAN nội bộ. |
| **OQ-05** | `[ ]` | Thư viện ONVIF / WS-Discovery nào ổn định nhất trên React Native hiện nay? | Trung bình | W9 | Sẽ đánh giá trong Spike SP-03 và SP-04. |
| **OQ-06** | `[ ]` | Ứng dụng phát hành nội bộ cho doanh nghiệp hay thương mại trên Store? | Cao | W1 | Định hình phương án tài khoản store và chính sách. |
| **OQ-07** | `[ ]` | Phiên bản hệ điều hành tối thiểu cần hỗ trợ (iOS/Android)? | Thấp | W3 | Khuyến nghị: Android 8.0+ (API 26) và iOS 15.0+. |
| **OQ-08** | `[ ]` | Camera trong thực tế hỗ trợ transport UDP hay TCP ổn định hơn? | Trung bình | W3 | PoC sẽ kiểm chứng cụ thể. |
| **OQ-09** | `[ ]` | Ngôn ngữ giao diện ứng dụng (Tiếng Việt hay Đa ngôn ngữ VI/EN)? | Thấp | W3 | Mặc định Tiếng Việt, hỗ trợ i18n mở rộng. |
| **OQ-10** | `[ ]` | Lựa chọn Monorepo tool giữa Turborepo và Nx? | Trung bình | W4 | Khuyến nghị Turborepo (nhẹ, nhanh cho React Native). |
| **OQ-11** | `[ ]` | Có cần nhận cảnh báo chuyển động khi đóng app trong 6 tháng đầu? | Cao | Trước G4 | Phụ thuộc quyết định Phase 4. |
| **OQ-12** | `[ ]` | Camera thử nghiệm có khe cắm thẻ nhớ và ghi hình Profile G không? | Cao | W13 | Xác định khi có thiết bị camera cụ thể. |
| **OQ-13** | `[ ]` | Đội ngũ có sẵn máy Mac và iPhone thật để kiểm thử trực tiếp không? | Cao | W1 | Xác định phương án local build hay cloud build EAS. |
| **OQ-14** | `[ ]` | Lựa chọn nhà đăng ký domain và dịch vụ hosting cho trang tĩnh Privacy Policy? | Thấp | W9-W10 | Dùng GitHub Pages / Cloudflare Pages (miễn phí, nhanh). |

---

## 4. Ma trận Rủi ro & Kế hoạch Ứng phó (Risk Register)

| ID | Tên rủi ro | Mức độ | Kế hoạch giảm thiểu / Ứng phó |
| :--- | :--- | :---: | :--- |
| **RSK-01** | Camera mua về không hỗ trợ hoặc bị nhà sản xuất tắt RTSP | Rất cao | Khảo sát kỹ model trước khi mua; luôn có kịch bản test bằng MediaMTX giả lập. |
| **RSK-02** | Thư viện VLC Player trên React Native lỗi thời, không tương thích Fabric | Rất cao | Đã chuẩn bị phương án dự phòng: Tự viết native bridge bọc Media3 (Android) và AVPlayer/IJKPlayer (iOS). |
| **RSK-03** | Bản cập nhật firmware của hãng bất ngờ khóa cổng RTSP | Cao | Khuyến cáo người dùng tắt tự động nâng cấp firmware trong tài liệu hướng dẫn. |
| **RSK-04** | Luồng camera dùng định dạng H.265 khiến một số máy cũ không giải mã được | Trung bình | Bắt buộc hỗ trợ Sub-stream H.264 hoặc cảnh báo không tương thích rõ ràng. |
| **RSK-05** | Đường dẫn RTSP của các hãng khác nhau quá nhiều gây khó khăn cấu hình | Trung bình | Cung cấp danh mục Preset đường dẫn phổ biến và tính năng tự động dò qua ONVIF. |
| **RSK-06** | Vi phạm nhãn hiệu thương mại của Yoosee / Imou khi đưa lên Store | Cao | Tuyệt đối không dùng logo, tên nhãn hiệu của hãng trong tên ứng dụng hay hình quảng bá. |
| **RSK-07** | Lộ lọt mật khẩu camera do lưu trữ không an toàn hoặc in ra log | Rất cao | Sử dụng 100% Keychain/Keystore; áp dụng bộ lọc Redaction tự động che giấu mật khẩu trong mọi log. |
| **RSK-08** | Vướng mắc điều khoản giấy phép phần mềm mã nguồn mở LGPL của LibVLC | Trung bình | Liên kết động (Dynamic linking) đúng chuẩn LGPL; hiển thị đầy đủ thông tin bản quyền trong mục About. |
| **RSK-09** | Apple hoặc Google từ chối phê duyệt do yêu cầu quyền mạng nội bộ | Cao | Soạn thảo giải trình rõ ràng: Ứng dụng xem camera do chính người dùng sở hữu trong mạng gia đình. |
| **RSK-10** | Xem lưới 4 camera gây nóng máy và tụt pin nhanh | Cao | Chỉ phát sub-stream độ phân giải thấp; dừng ngay decoder khi ô bị che khuất. |
| **RSK-13** | Tách module quá phức tạp làm chậm tiến độ ra mắt bản MVP | Trung bình | Ưu tiên hoàn thiện phần Client UI Preview trước; áp dụng Clean Architecture ở mức vừa đủ, thực dụng. |

