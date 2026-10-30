# 04 - Phase 3: Tính năng Nâng cao & Tối ưu Hiệu năng (W9-W12, 28/12/2026 - 22/01/2027)

> **Mục tiêu:** Mở rộng tính năng tự động khám phá ONVIF trong LAN, xem lưới đa camera (Multi-view), chẩn đoán mạng chuyên sâu, điều khiển PTZ và tối ưu hóa xử lý danh sách dữ liệu lớn.

---

## Tuần 9 (28/12 - 01/01): Tự động Khám phá LAN (WS-Discovery & ONVIF)

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P3-W9-01** | `[ ]` | Triển khai WS-Discovery Probe qua UDP Multicast (`239.255.255.250:3702`) trên Android/iOS | RN, NAT | SP-03, FR-010 | TC-018 Pass |
| **P3-W9-02** | `[ ]` | Module Discovery: Chỉ quét khi người dùng bấm, giới hạn trong subnet hiện tại, timeout $\le 10\,\text{s}$ | RN | SEC-007, UC-04 | TC-045 Pass |
| **P3-W9-03** | `[ ]` | Xử lý từ chối quyền Local Network & phát hiện AP Isolation trong Wi-Fi | RN | UC-02 | TC-019 Pass |
| **P3-W9-04** | `[ ]` | `onvif adapter`: Xử lý bản tin SOAP, cơ chế xác thực WS-Security / Digest Auth | RN, NAT | SP-04 | Gửi nhận thành công với camera thật |
| **P3-W9-05** | `[ ]` | Tự động lấy: `GetDeviceInformation`, `GetProfiles`, `GetStreamUri`; fallback sang nhập tay khi lỗi | RN | FR-013 | TC-022 Pass |
| **P3-W9-06** | `[ ]` | Xử lý HTTP Cleartext trên Android và `NSAllowsLocalNetworking` trên iOS cho cổng ONVIF | NAT | Doc 09.6 | ONVIF HTTP hoạt động trên cả hai nền tảng |
| **P3-W9-07** | `[ ]` | Chạm vào thiết bị tìm thấy tự động điền sẵn thông số vào form thêm camera | RN | UC-04 $\rightarrow$ UC-03 | Luồng thêm tự động hoàn chỉnh |
| **P3-W9-08** | `[ ]` | Đăng ký domain chính thức, cấu hình DNS và bảo vệ quyền riêng tư WHOIS | PO, DEV | OQ-14 | Domain được sở hữu hợp lệ |

---

## Tuần 10 (04/01 - 08/01): Chẩn đoán Mạng Đầy đủ, Chụp ảnh Snapshot & PTZ

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P3-W10-01** | `[ ]` | Diagnostics đầy đủ: Kiểm tra từng chặng DNS $\rightarrow$ TCP $\rightarrow$ OPTIONS $\rightarrow$ DESCRIBE $\rightarrow$ Auth $\rightarrow$ Test Play | RN | FR-009 | TC-017 Pass |
| **P3-W10-02** | `[ ]` | Cơ chế tạo báo cáo chẩn đoán đã che giấu thông tin nhạy cảm; cảnh báo camera không đặt mật khẩu | RN | UC-12, SEC-006 | TC-044 Pass |
| **P3-W10-03** | `[ ]` | Tính năng Chụp ảnh nhanh (Snapshot): Xin quyền lưu ảnh theo ngữ cảnh, trích xuất frame native | RN, NAT | FR-012 | TC-021 Pass |
| **P3-W10-04** | `[ ]` | Module Settings đầy đủ: Giao thức truyền tải (TCP/UDP), tùy chọn gửi crash log (tắt mặc định) | RN | FR-015 | TC-024, TC-050 Pass |
| **P3-W10-05** | `[ ]` | Điều khiển PTZ (Xoay/Gật/Phóng to) cho camera có hỗ trợ profile ONVIF PTZ | RN, NAT | FR-014 | TC-023 Pass |
| **P3-W10-06** | `[ ]` | Xây dựng trang web tĩnh: Landing page, Privacy Policy, Trang hỗ trợ và Hướng dẫn bật RTSP | DEV, BA | Doc 19.3 | URL HTTPS truy cập công khai |
| **P3-W10-07** | `[ ]` | Thiết lập hòm thư hỗ trợ chính thức `support@` theo tên miền ứng dụng | DEV | - | Gửi và nhận email thử nghiệm thành công |

---

## Tuần 11 (11/01 - 15/01): Lưới Đa Camera (Multi-View) & Tối ưu Dữ liệu lớn

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P3-W11-01** | `[ ]` | Đo số lượng hardware decoder tối đa có thể chạy đồng thời theo từng nhóm cấu hình thiết bị | NAT, QA | SP-12, PERF-02 | Bảng giới hạn decoder theo RAM/Chipset |
| **P3-W11-02** | `[ ]` | Lưới 2x2: Bắt buộc dùng Sub-stream; chỉ giải mã các ô nằm trong khung nhìn (Viewport); khởi tạo so le 200-300ms | RN, NAT | FR-011, PERF-03 | TC-020 Pass |
| **P3-W11-03** | `[ ]` | Các ô vượt quá giới hạn decoder hiển thị ảnh Thumbnail tĩnh kèm nút Play; lỗi ô nào cô lập ô đó | RN | UC-14 | Không crash toàn bộ lưới khi 1 ô lỗi |
| **P3-W11-04** | `[ ]` | Quản lý bộ nhớ đệm Thumbnail: Kích thước $\le 320\,\text{px}$, chính sách LRU tối đa 50MB | RN | Doc 15.3 | Bộ nhớ không bị phình to |
| **P3-W11-05** | `[ ]` | Ảo hóa danh sách Dashboard (20-50 camera): Dùng FlashList/FlatList với `getItemLayout`, `memo` | RN | PERF-05..07 | Cuộn mượt $\ge 55\,\text{fps}$ |
| **P3-W11-06** | `[ ]` | Tinh chỉnh độ trễ hiển thị (Glass-to-glass latency) về ngưỡng mục tiêu | NAT, QA | SP-02, NFR-002 | TC-028 Pass |
| **P3-W11-07** | `[ ]` | Chế độ Low Power Mode: Tự động đề xuất chuyển sang Sub-stream khi pin yếu hoặc nhiệt độ tăng | RN | Doc 15.8 | Tùy chọn hoạt động ổn định |

---

## Tuần 12 (18/01 - 22/01): Kiểm thử Quy mô, Beta Test & Cổng G3

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P3-W12-01** | `[ ]` | Kiểm thử trên ma trận thiết bị: $\ge 3$ Android (thấp/trung/cao) + $\ge 2$ iPhone + 1 iPad/Tablet | QA | TC-030 | Có báo cáo ma trận thiết bị |
| **P3-W12-02** | `[ ]` | Kiểm tra tiêu thụ CPU/RAM/Pin, băng thông mạng và test lặp mở/đóng màn hình 100 lần | QA, NAT | TC-026, 029, 031 | Đạt tiêu chuẩn NFR |
| **P3-W12-03** | `[ ]` | Kiểm thử tiếp cận người dùng khuyết tật: VoiceOver (iOS) và TalkBack (Android) | QA, UX | TC-032 | 0 lỗi chặn thao tác bằng giọng nói |
| **P3-W12-04** | `[ ]` | Chạy bộ kiểm thử hồi quy toàn diện: TC-001 đến TC-032 và TC-040 đến TC-050 | QA | - | Báo cáo kiểm thử hồi quy pass |
| **P3-W12-05** | `[ ]` | Mở đợt Beta Test kín (TestFlight External / Google Play Closed Testing) cho 20-50 người | DEV, BA | - | Bản beta được phát hành và người dùng cài đặt |
| **P3-W12-06** | `[ ]` | Thu thập, phân loại phản hồi từ người dùng beta; mở rộng ma trận tương thích ($\ge 3$ model) | BA | BR-002 | Danh sách phản hồi đã phân loại |
| **P3-W12-07** | `[ ]` | Soạn thảo bộ hồ sơ đánh giá và quyết định có làm Phase 4 hay không | PO, BA | OQ-04, 11 | Gói quyết định Phase 4 hoàn tất |
| **P3-W12-08** | `[ ]` | Họp duyệt Cổng Gate G3 (Kết thúc Beta) | PO | Gate G3 | Biên bản ký duyệt Gate G3 |

---

## Tiêu chí Cổng Quyết định G3 (Kết thúc Beta - Cuối Tuần 12)
- [ ] Tính năng xem lưới Multi-view đạt chuẩn NFR-006 (chạy ổn định $\ge 4$ ô).
- [ ] 100% các Test Case từ TC-001 đến TC-032 và TC-040 đến TC-050 đạt **PASS**.
- [ ] Ma trận kiểm thử thiết bị (TC-030) hoàn tất không có lỗi tương thích nghiêm trọng.
- [ ] Đạt quyết định rõ ràng: Tiến hành Phase 4 (Remote/Alerts) hay chuyển thẳng sang Phase 5 (Release).

