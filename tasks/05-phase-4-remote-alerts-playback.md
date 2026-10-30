# 05 - Phase 4: Remote Access, Alerts & Playback (W13-W18, TÙY CHỌN, chỉ khi qua G4)

> **Mục tiêu:** Xây dựng hạ tầng Cloud Relay (WebRTC / TURN), cơ chế đẩy thông báo khi app đóng (Push Notifications FCM/APNs) và xem lại video từ thẻ nhớ camera (Profile G).  
> *Lưu ý: Chỉ thực hiện khi đã vượt qua Cổng Quyết định G4.*

---

## Tuần 13 (25/01 - 29/01): Cổng Quyết định G4 & Nghiên cứu Kỹ thuật (Spikes)

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P4-W13-01** | `[ ]` | Họp Cổng Gate G4: Kiểm tra 5 điều kiện tiên quyết (Nhu cầu xem từ xa, ngân sách, nhân sự) | PO, BA | Gate G4 | Biên bản quyết định chính thức được lưu |
| **P4-W13-02** | `[ ]` | Spike kỹ thuật: Khảo sát sự kiện ONVIF Events PullPoint trên camera thực tế | NAT, RN | SP-05, OQ-12 | Xác định camera có phát sự kiện chuyển động hay không |
| **P4-W13-03** | `[ ]` | Spike kỹ thuật: Khảo sát khả năng xem lại Profile G / Replay URI từ thẻ nhớ | NAT, RN | SP-06 | Xác định camera có cho phép trích xuất video lưu trữ |
| **P4-W13-04** | `[ ]` | Chốt phạm vi kiến trúc: (a) Chỉ xem lại trong LAN không server hay (b) Cần Relay + Backend Cloud | PO, BA | RSK-16 | Tài liệu ADR phạm vi được phê duyệt |

---

## Tuần 14 (01/02 - 05/02): Thiết kế Kiến trúc An ninh & Hạ tầng Relay

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P4-W14-01** | `[ ]` | Mô hình hóa mối đe dọa an ninh mạng (Threat Modeling: SSRF, Token Hijacking, Video Snooping) | BA, DEV | SEC-009..011 | Tài liệu phân tích an ninh được duyệt |
| **P4-W14-02** | `[ ]` | Lựa chọn giải pháp Relay: WireGuard VPN vs WebRTC Media Relay (MediaMTX / go2rtc + coturn) | DEV, RN | ADR-0006 | Tài liệu ADR-0006 được phê duyệt |
| **P4-W14-03** | `[ ]` | Bảng dự toán chi phí vận hành: Số phiên đồng thời $\times$ Băng thông $\times$ Giá Cloud Server | PO, DEV | RSK-17 | Bảng dự toán chi phí chi tiết |
| **P4-W14-04** | `[ ]` | Soạn thảo Điều khoản Dịch vụ mở rộng (Terms of Service) và Thỏa thuận Dữ liệu Cá nhân (DPA) | BA, PO | Doc 13.4 | Bản thảo pháp lý hoàn tất |

---

## Tuần 15 (08/02 - 12/02): Triển khai Backend API & Database

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P4-W15-01** | `[ ]` | Xây dựng API Backend: Xác thực (Auth), Quản lý thiết bị (Devices), Quản lý Camera (Tuyệt đối không lưu mật khẩu camera trên máy chủ) | BE, RN | Doc 11 | API chạy trên môi trường phát triển |
| **P4-W15-02** | `[ ]` | Triển khai Rate Limiting, Audit Logging và chuẩn hóa mã lỗi phản hồi API | BE | Doc 11 | Unit test bảo vệ API pass 100% |
| **P4-W15-03** | `[ ]` | Thiết lập CSDL PostgreSQL, Docker Compose và Nginx Reverse Proxy hỗ trợ TLS 1.3 | DEV | Doc 19.4 | Môi trường Staging hoạt động ổn định |
| **P4-W15-04** | `[ ]` | Phân tách rạch ròi 3 môi trường: Dev / Staging / Production kèm công cụ quản lý bí mật | DEV | - | 0 secret bị lộ trong source code |
| **P4-W15-05** | `[ ]` | Kiểm tra tiêu chuẩn mã hóa đường truyền TLS $\ge 1.2$ | QA | TC-043 | TC-043 Pass |

---

## Tuần 16 (15/02 - 19/02): Triển khai Media Relay & Home Agent

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P4-W16-01** | `[ ]` | Dựng Media Relay Server: Chuyển đổi RTSP sang WebRTC / HLS kèm máy chủ STUN/TURN coturn | DEV, NAT | SP-09 | Stream thử nghiệm xem được qua mạng ngoài |
| **P4-W16-02** | `[ ]` | Phát triển Home Agent / Cơ chế kết nối an toàn Outbound TLS từ camera tới máy chủ Relay | RN, NAT | Flow A7 | Luồng truyền phát từ xa hoạt động |
| **P4-W16-03** | `[ ]` | `POST /cameras/{id}/remote-sessions`: Cấp phiên xem tạm thời (TTL $\le 15$ phút, token băm 1 lần) | BE | SEC-010 | TC-046, TC-047 Pass |
| **P4-W16-04** | `[ ]` | Hệ thống giám sát vận hành: Prometheus + Grafana theo dõi độ trễ, CPU, RAM và băng thông | DEV | - | Bảng điều khiển giám sát hoạt động |

---

## Tuần 17 (22/02 - 26/02): Module Remote Access, Cảnh báo Push & Playback

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P4-W17-01** | `[ ]` | Module `remote-access`: Tích hợp luồng xem WebRTC vào `PlayerPort` trên ứng dụng mobile | RN, NAT | FR-017 | Xem được video khi ngắt Wi-Fi sang 4G/5G |
| **P4-W17-02** | `[ ]` | Module `alerts`: Lắng nghe sự kiện chuyển động, thuật toán khử rung (debounce/throttle), ghi log sự kiện | RN | Flow A6 | TC-060, TC-063 Pass |
| **P4-W17-03** | `[ ]` | Thông báo đẩy Push Notifications (FCM / APNs) khi phát hiện sự kiện lúc app đang đóng | RN, BE | SP-10 | Nhận được push notification kèm ảnh snapshot |
| **P4-W17-04** | `[ ]` | Module `playback`: Màn hình thước thời gian (Timeline) hỗ trợ cuộn tìm kiếm đoạn video ghi hình | RN | SP-07 | TC-061 Pass (nếu camera hỗ trợ) |
| **P4-W17-05** | `[ ]` | Tính năng chia sẻ quyền xem camera cho tài khoản khác kèm nhật ký kiểm toán (Audit Trail) | RN, BE | FR-018 | TC-048 Pass |

---

## Tuần 18 (01/03 - 05/03): Rà soát An ninh Chuyên sâu & Cổng G5

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P4-W18-01** | `[ ]` | Đánh giá an ninh theo chuẩn OWASP MASVS và thử nghiệm thâm nhập (Penetration Test) | QA, DEV | MASVS | Báo cáo an ninh sạch, các lỗ hổng đã vá |
| **P4-W18-02** | `[ ]` | Kế hoạch sao lưu dữ liệu tự động hằng ngày, quy trình khôi phục sự cố (Disaster Recovery) | DEV | - | Kiểm thử khôi phục thành công từ file backup |
| **P4-W18-03** | `[ ]` | Đo đạc và đối soát chi phí băng thông thực tế so với ngân sách dự kiến | PO, DEV | RSK-17 | Chi phí thực tế nằm trong ngưỡng an toàn |
| **P4-W18-04** | `[ ]` | Mở đợt Beta Test kín cho tính năng xem từ xa | DEV, QA | - | Phản hồi beta tích cực, không lỗi rò rỉ dữ liệu |
| **P4-W18-05** | `[ ]` | Họp duyệt Cổng Gate G5 (Hoàn thành Phase 4) | PO | Gate G5 | Biên bản ký duyệt Gate G5 |

