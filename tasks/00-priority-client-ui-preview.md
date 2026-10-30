# 00 - Priority: Client UI & UI Preview Framework (Ưu tiên Hàng đầu)

> **Mục tiêu:** Hoàn thiện 100% giao diện (Design System, UI Components, Screens, Navigation Flow) kèm bộ dữ liệu giả lập (Mock/Fake Data) để người dùng và nhóm phát triển có thể tương tác, xem trước (UI Preview) trực quan trên trình duyệt / điện thoại trước khi ghép logic RTSP native.

---

## 1. Giai đoạn UI-1: Design System & UI Kit (`packages/ui-kit`)

Tập hợp các atomic component, tokens và style nhất quán theo chuẩn dark/light theme, tối ưu hiển thị thiết bị di động và tablet.

| ID | St | Task | Mô tả chi tiết | Verification Step | Done khi |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **UI-TOK-01** | `[ ]` | **Design Tokens & Theme** | Định nghĩa bảng màu (Dark palette chuyên dụng camera, contrast ratio $\ge 4.5:1$), typographic scale, khoảng cách (spacing 4/8/12/16/24/32), bán kính bo góc (radius), animation timing tokens. | Chạy type-check và render bảng mã màu trong test | File `tokens.ts` export đầy đủ color, font, spacing, radius |
| **UI-KIT-01** | `[ ]` | **Button Component** | Hỗ trợ các biến thể: Primary, Secondary, Destructive, Ghost, Icon-only. Đầy đủ trạng thái: Normal, Pressed, Disabled, Loading spinner. Kích thước tap target tối thiểu $\ge 44 \times 44\,\text{pt}$. | Unit test render với Jest / RTL | Đạt chuẩn accessibility, không lỗi touch target |
| **UI-KIT-02** | `[ ]` | **Input & Form Field** | Input text, password input (có nút mắt bật/tắt hiện mật khẩu), input số (cho Port). Hỗ trợ label, helper text, inline error message, trạng thái focus/error. | Unit test tương tác nhập liệu | Nhập liệu mượt mà, toggle mật khẩu hoạt động chuẩn |
| **UI-KIT-03** | `[ ]` | **Status Badge & StatusDot** | Hiển thị trạng thái camera với màu tương ứng: Xanh lá (`Live/Online`), Vàng (`Connecting/Buffering`), Xám (`Offline`), Đỏ (`Error/Auth Failed`). | Render snapshot test các trạng thái màu | Hiển thị đúng 4 màu kèm text nhãn tương ứng |
| **UI-KIT-04** | `[ ]` | **Card & Container** | Khung chứa thẻ camera và thẻ cài đặt, hỗ trợ elevation/shadow tinh tế, viền viền nhẹ ở chế độ dark mode. | Render trong storybook/sandbox | Thẻ hiển thị đẹp, phân cấp thị giác rõ ràng |
| **UI-KIT-05** | `[ ]` | **Modal, Dialog & ActionSheet** | Modal xác nhận hành động nguy hiểm (xóa camera, xóa dữ liệu), Bottom Sheet chọn độ phân giải stream (Main/Sub), Modal hiển thị tiến trình. | Tương tác mở/đóng modal mượt mà | Hỗ trợ backdrop dismiss, animation trượt nhẹ |
| **UI-KIT-06** | `[ ]` | **Loading Skeleton & Spinner** | Skeleton loader cho danh sách thẻ camera trong lúc chờ tải dữ liệu; Spinner loading tinh gọn cho các nút bấm. | Test visual transition | Không giật layout khi chuyển từ Skeleton sang Card thật |
| **UI-KIT-07** | `[ ]` | **Empty State Component** | Thành phần hiển thị khi danh sách trống: Minh họa vector tinh tế + Tiêu đề + Đoạn mô tả + Nút hành động kêu gọi (CTA). | Test render với props tùy biến | Dùng chung cho: Trống danh sách camera, Trống danh sách quét mạng |

---

## 2. Giai đoạn UI-2: Mock Data & Fake State Simulator

Cung cấp dữ liệu mẫu và cơ chế giả lập trạng thái phong phú giúp UI Preview phản ánh sát 100% các tình huống thực tế.

| ID | St | Task | Mô tả chi tiết | Verification Step | Done khi |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **UI-MCK-01** | `[ ]` | **Bộ Mock Data Camera mẫu** | Tạo danh sách camera giả lập đa dạng: 1 camera Yoosee (Living Room), 1 camera Imou (Front Door), 1 camera Generic RTSP (Garage), 1 camera mất kết nối (Offline), 1 camera lỗi xác thực (Auth Error). | Export hàm `getMockCameras()` | Có ít nhất 5 camera với đầy đủ trạng thái khác nhau |
| **UI-MCK-02** | `[ ]` | **Video Player Mock / Test Pattern** | Tạo component `MockVideoPlayer` giả lập khung phát RTSP: hiển thị hình ảnh camera mẫu / canvas animation test pattern / video giả lập MP4 vòng lặp kèm timestamp chạy theo thời gian thực (hh:mm:ss:ms). | Chạy trên UI preview | Khung video mô phỏng hiển thị như camera thật có timestamp |
| **UI-MCK-03** | `[ ]` | **FSM State Switcher (Trình chuyển trạng thái)** | Thanh điều khiển nhỏ trong chế độ Dev/Preview cho phép người dùng click để ép Player chuyển qua các trạng thái: `DISCONNECTED`, `CONNECTING`, `PLAYING`, `BUFFERING`, `RECONNECTING`, `FAILED`. | Thử click trên thanh Switcher | Màn hình phản ứng tức thì theo từng trạng thái |

---

## 3. Giai đoạn UI-3: Xây dựng toàn bộ các Màn hình Giao diện (Screens)

Hiện thực đầy đủ 10 màn hình chuẩn theo tài liệu [06-ui-ux-specification.md](file:///d:/Workspaces/cameras_vapp/documents/06-ui-ux-specification.md).

### 3.1 Nhóm Onboarding & Dashboard
| ID | St | Task | Mô tả chi tiết theo Spec | Verification Step | Done khi |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **UI-SCR-01** | `[ ]` | **SCR-01: Splash & Onboarding** | Màn hình giới thiệu 3 trang carousel (Lợi ích LAN-first, Cảnh báo chỉ dùng cho camera sở hữu hợp pháp theo quy tắc BR-U01, Yêu cầu quyền mạng nội bộ), nút Bỏ qua / Bắt đầu. | Vuốt qua 3 slide và click bắt đầu | Carousel mượt mà, lưu trạng thái đã xem onboarding |
| **UI-SCR-02** | `[ ]` | **SCR-02: Camera Dashboard** | • Danh sách camera dạng thẻ: Tên camera, IP/Host, Chấm trạng thái, Snapshot thumbnail.<br>• Nút thêm nhanh (+), nút chuyển chế độ xem lưới Multi-view, nút Cài đặt.<br>• Đầy đủ 4 trạng thái: Loading (Skeleton), Empty (Minh họa + nút Thêm), Error, Offline.<br>• Thao tác: Chạm vào thẻ mở xem trực tiếp (SCR-06), Nhấn giữ mở menu Sửa/Xóa. Kéo xuống để refresh (Pull-to-refresh). | Test cả 4 trạng thái (Empty, Loading, Danh sách 5 camera, Danh sách 20 camera) | Cuộn danh sách 60fps, chạm phản hồi tức thì |

### 3.2 Nhóm Thêm Camera & Kiểm tra Kết nối
| ID | St | Task | Mô tả chi tiết theo Spec | Verification Step | Done khi |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **UI-SCR-03** | `[ ]` | **SCR-03: Add / Edit Camera** | • Form nhập thông tin: Tên camera, Địa chỉ IP/Hostname, RTSP Port (mặc định 554), Đường dẫn RTSP Path (mặc định `/onvif1` hoặc `/live/ch0`), Username, Password (nút toggle ẩn/hiện), Substream Path.<br>• Khối nút gợi ý Preset nhanh: Preset Yoosee, Preset Imou kèm cảnh báo *"Đường dẫn mẫu, tùy thuộc firmware" (BR-U05)*.<br>• Validation tức thời (Inline error khi IP không hợp lệ hoặc Tên để trống).<br>• Nút "Kiểm tra kết nối" và nút "Lưu camera" (vô hiệu khi form chưa hợp lệ). | Nhập thử các giá trị hợp lệ / không hợp lệ | Form validate chính xác, bấm Preset tự điền đường dẫn |
| **UI-SCR-05** | `[ ]` | **SCR-05: Connection Test Modal** | Popup/Modal trực quan hiển thị tiến trình kiểm tra kết nối từng bước (DNS Lookup $\rightarrow$ TCP Port 554 $\rightarrow$ RTSP OPTIONS $\rightarrow$ RTSP DESCRIBE $\rightarrow$ Auth OK). Đồ họa hiển thị tích xanh/chấm đỏ cho từng bước. Nút "Thử lại", "Chẩn đoán nâng cao". | Kích hoạt modal với các kịch bản test thành công / thất bại | Modal hiển thị tuần tự sinh động, không lộ password |

### 3.3 Nhóm Xem Camera (Live View & Multi-View)
| ID | St | Task | Mô tả chi tiết theo Spec | Verification Step | Done khi |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **UI-SCR-06** | `[ ]` | **SCR-06: Live Viewer (Màn hình Xem Đơn)** | • Khung phát video trung tâm tỷ lệ 16:9, tự động phóng to toàn màn hình khi xoay ngang thiết bị.<br>• Lớp phủ điều khiển (Overlay Controls) tự động mờ dần sau 3 giây không chạm.<br>• Nút điều khiển: Play/Pause, Đổi luồng Main-stream (HD) / Sub-stream (SD), Chụp ảnh nhanh (Snapshot), Toàn màn hình.<br>• Cụm phím điều hướng PTZ (D-Pad 4 hướng + Zoom In/Out) hiển thị dạng trượt từ dưới lên khi camera có hỗ trợ.<br>• Lớp hiển thị trạng thái: Đang kết nối... (kèm nút Hủy), Mất tín hiệu (kèm nút Thử lại). | Tương tác chạm ẩn/hiện overlay, bấm nút chụp snapshot | Chuyển chế độ xoay ngang mượt mà, layout không bị vỡ |
| **UI-SCR-07** | `[ ]` | **SCR-07: Multi-camera View (Xem Lưới)** | • Lưới camera 2x2 (hoặc 3x3 trên máy tính bảng/màn hình lớn).<br>• Hiển thị tên camera và chấm trạng thái ở góc mỗi ô.<br>• Chạm vào một ô bất kỳ để phóng to sang màn hình xem đơn SCR-06.<br>• Xử lý hiển thị thông minh khi có ô bị lỗi (không làm ảnh hưởng các ô còn lại). | Chuyển đổi giữa lưới 4 ô và xem đơn | Hiển thị đồng bộ, bố cục lưới căn chuẩn |

### 3.4 Nhóm Cài đặt & Chẩn đoán
| ID | St | Task | Mô tả chi tiết theo Spec | Verification Step | Done khi |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **UI-SCR-08** | `[ ]` | **SCR-08: Camera Settings** | Màn hình cấu hình riêng từng camera: Đổi tên, sửa thông số kết nối, chọn luồng mặc định ưu tiên, Nút "Xóa Camera" màu đỏ ở đáy trang (bấm vào mở Modal xác nhận và giải thích rõ xóa toàn bộ thông tin đăng nhập). | Thử sửa thông tin và bấm xóa | Modal xác nhận hiện rõ ràng, hủy/xóa phản hồi chuẩn |
| **UI-SCR-09** | `[ ]` | **SCR-09: Network Diagnostics UI** | Màn hình hỗ trợ người dùng khi không xem được camera: Bảng hiển thị thông số chẩn đoán (IP Gateway, Ping latency, Trạng thái mở cổng 554, Codec video dự kiến), Nút "Sao chép báo cáo chẩn đoán" (đã tự động che thông tin nhạy cảm password/URL). | Kiểm tra nội dung clipboard sau khi bấm sao chép | Không chứa mật khẩu plaintext trong báo cáo |
| **UI-SCR-10** | `[ ]` | **SCR-10: App Settings** | Màn hình cài đặt chung ứng dụng: Chọn Theme (Sáng / Tối / Tự động theo hệ thống), Giao thức truyền tải mặc định (TCP / UDP), Xóa toàn bộ dữ liệu, Trang Giới thiệu & Bản quyền (About & Third-party Licenses). | Thử chuyển theme Sáng/Tối | Toàn bộ ứng dụng đổi màu theme tức thì |

---

## 4. Giai đoạn UI-4: Môi trường Xem trước Giao diện (UI Preview Harness)

| ID | St | Task | Mô tả chi tiết | Verification Step | Done khi |
| :--- | :---: | :--- | :--- | :--- | :--- |
| **UI-PRV-01** | `[ ]` | **Điều hướng Preview (Navigation Shell)** | Dựng thanh Bottom Tab Navigation kết nối các màn hình chính: `Dashboard`, `Lưới Multi-view`, `Cài đặt` + Stack Navigation cho `Live View`, `Thêm Camera`, `Chẩn đoán`. | Click chuyển giữa các tab và mở các màn hình con | Điều hướng mượt mà, chuyển trang đúng hierarchy |
| **UI-PRV-02** | `[ ]` | **Web / Simulator Preview Runner** | Cấu hình cho phép chạy UI Preview trực tiếp trên trình duyệt Web hoặc Mobile Simulator với lệnh đơn giản (`pnpm preview` / `pnpm dev`). | Mở trình duyệt truy cập `localhost:xxxx` | Giao diện hiển thị trực quan 100% trên cả kích thước Mobile (375px) và Desktop |
| **UI-PRV-03** | `[ ]` | **Chụp ảnh Kiểm thử Giao diện (Screenshots)** | Tự động mở trình duyệt và chụp ảnh toàn bộ các màn hình (Onboarding, Dashboard có camera, Dashboard empty, Add camera form, Live view, Multi-view grid, Settings) lưu vào thư mục `docs/ui-preview/` để nghiệm thu. | Mở file ảnh chụp kiểm tra độ sắc nét | Bộ ảnh đầy đủ tất cả các màn hình |

---

## 5. Tiêu chí Nghiệm thu Hoàn thành Giai đoạn UI Preview (DoD)
1. Toàn bộ 10 màn hình (SCR-01 đến SCR-10) đã hiển thị đầy đủ, đúng layout và design token.
2. Hoạt động trơn tru với bộ dữ liệu giả lập (Mock Cameras, Fake Stream Video Canvas).
3. Đã có ảnh chụp giao diện thực tế đối chiếu và người dùng nghiệm thu trải nghiệm thị giác trước khi bắt tay viết code Native/RTSP logic.

