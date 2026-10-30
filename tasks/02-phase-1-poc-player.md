# 02 - Phase 1: PoC Player RTSP & Cổng Quyết định G1 (W2-W3, 09/11 - 20/11/2026)

> **Mục tiêu:** Chứng minh khả năng stream RTSP ổn định trên camera thật bằng native player trên cả Android và iOS thông qua ứng dụng thử nghiệm `apps/sandbox-poc`.

---

## Danh sách Công việc Tuần 2 (09/11 - 13/11)

| ID | St | Task | Vai trò | Tham chiếu | Done khi | Ghi chú |
| :--- | :---: | :--- | :---: | :--- | :--- | :--- |
| **P1-W2-01** | `[ ]` | PC: xem URL ứng viên bằng VLC/ffplay, thử TCP/UDP, main/sub | QA, BA | TC-POC-01 | Có hình liên tục $\ge 60\,\text{s}$ hoặc kết luận Unsupported | |
| **P1-W2-02** | `[ ]` | Dùng ffprobe: codec, độ phân giải, fps, kiểu auth; ghi bảng model+fw+transport | QA | TC-POC-02 | Hoàn thành bảng thông số kỹ thuật PoC | |
| **P1-W2-03** | `[ ]` | Dùng ONVIF Device Manager: discovery, GetProfiles, GetStreamUri, PTZ | QA, BA | TC-POC-03 | Có bảng kết quả tương thích ONVIF | |
| **P1-W2-04** | `[ ]` | Tạo app tối giản `apps/sandbox-poc` | RN | - | App build và chạy độc lập thành công | |
| **P1-W2-05** | `[ ]` | Cài đặt `react-native-vlc-media-player` bằng custom dev build (không dùng Expo Go) | RN, NAT | E11 | Thư viện native biên dịch thành công trên Android | |
| **P1-W2-06** | `[ ]` | Màn hình PoC: nhập URL $\rightarrow$ phát; hiển thị log sự kiện player + đo time-to-first-frame (TTFF) | RN | - | Màn hình hiển thị đầy đủ thông số runtime | |
| **P1-W2-07** | `[ ]` | Android: phát liên tục $\ge 10$ phút, ghi nhận TTFF, TCP/UDP, buffer, lỗi | QA, NAT | TC-POC-04 | Video phát ổn định $\ge 10$ phút không rớt | |
| **P1-W2-08** | `[ ]` | (Tùy chọn) Dựng camera giả lập RTSP bằng MediaMTX/ffmpeg | RN | SP-11 | Stream giả lập phát thành công trong LAN | |

---

## Danh sách Công việc Tuần 3 (16/11 - 20/11)

| ID | St | Task | Vai trò | Tham chiếu | Done khi | Ghi chú |
| :--- | :---: | :--- | :---: | :--- | :--- | :--- |
| **P1-W3-01** | `[ ]` | iOS: khai báo `NSLocalNetworkUsageDescription`, xử lý hộp thoại Local Network Permission | NAT | C5 | Hộp thoại cấp quyền hiện đúng và hoạt động | |
| **P1-W3-02** | `[ ]` | iOS: phát liên tục $\ge 10$ phút trên thiết bị iPhone thật | NAT, QA | TC-POC-05 | Video phát ổn định $\ge 10$ phút không rớt | |
| **P1-W3-03** | `[ ]` | Đánh giá khả dụng player thứ 2 (Media3/ExoPlayer RTSP, ffmpeg-based, AVFoundation) | NAT | C3, C4 | Báo cáo tính khả thi của phương án thay thế | |
| **P1-W3-04** | `[ ]` | So sánh $\ge 2$ player: TTFF, độ trễ glass-to-glass, CPU, hỗ trợ H.265 | NAT, QA | TC-POC-06 | Có bảng phân tích số liệu so sánh | |
| **P1-W3-05** | `[ ]` | Đánh giá native player tự viết vs LibVLC | NAT | SP-01 | Ghi chú kết luận chi phí bảo trì & hiệu năng | |
| **P1-W3-06** | `[ ]` | Thử nghiệm cấu hình buffer thấp (low-latency), TCP vs UDP, jitter buffer | NAT | SP-02 | Có số liệu độ trễ tối ưu | |
| **P1-W3-07** | `[ ]` | Soạn và duyệt **ADR-0003**: Lựa chọn Native Player chính thức | RN, BA | ADR-0003 | Tài liệu ADR được phê duyệt | |
| **P1-W3-08** | `[ ]` | Soạn và duyệt **ADR-0002**: Lựa chọn Expo Prebuild hay RN CLI thuần | RN | ADR-0002 | Tài liệu ADR được phê duyệt | |
| **P1-W3-09** | `[ ]` | Rà soát sơ bộ điều khoản giấy phép mã nguồn mở LibVLC / FFmpeg | BA | SEC-014, RSK-08 | Có biên bản kiểm tra rủi ro pháp lý | |
| **P1-W3-10** | `[ ]` | Cập nhật ma trận tương thích: Chuyển từ *Partially Verified* sang *Verified* | BA | Mục 4.4 | Ma trận có ít nhất 1 camera Verified | |
| **P1-W3-11** | `[ ]` | Hiệu chỉnh lại ước lượng effort cho Phase 2 đến Phase 5 | PO, BA | RSK-12 | Kế hoạch dự án được cập nhật | |
| **P1-W3-12** | `[ ]` | Họp Cổng Gate G1: Ra quyết định **Go / No-Go** | PO | Gate G1 | Biên bản duyệt Go/No-Go có chữ ký | |
| **P1-W3-13** | `[ ]` | (Nếu No-Go): Chạy kịch bản đổi camera thử nghiệm hoặc đổi player native | PO | RSK-01, 02 | Quyết định hướng đi tiếp | |

---

## Tiêu chí Cổng Quyết định G1 (Go / No-Go - Cuối Tuần 3)
- [ ] $\ge 1$ camera xem ổn định $\ge 10$ phút trên Android.
- [ ] $\ge 1$ camera xem ổn định $\ge 10$ phút trên iOS.
- [ ] Các kịch bản kiểm thử PoC (TC-POC-01 đến 06) đã hoàn thành và có báo cáo.
- [ ] Đã chốt Player chính thức qua ADR-0003.
- [ ] Đạt quyết định: **GO**.

