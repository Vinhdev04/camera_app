# 03 - Phase 2: MVP Core Logic & Composition Root (W4-W8, 23/11 - 25/12/2026)

> **Mục tiêu:** Xây dựng phần logic cốt lõi (Core Contracts, SQLite, KeyStore, RTSP State Machine, Event Bus) và tích hợp vào Composition Root (`apps/mobile`) để đạt chuẩn phát hành bản MVP.

---

## Tuần 4 (23/11 - 27/11): Cấu trúc Monorepo, Contracts & Boundaries

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P2-W4-01** | `[ ]` | Chốt công cụ Monorepo: Nx hay Turborepo (ADR-0001) | RN, DEV | OQ-10 | Tài liệu ADR-0001 được duyệt |
| **P2-W4-02** | `[ ]` | Phân tách các packages: `core-contracts`, `ui-kit`, `features/*`, `adapters/*`, `apps/mobile` | RN, DEV | File 17 | Thư mục được thiết lập chuẩn theo cấu trúc |
| **P2-W4-03** | `[ ]` | Script Generator sinh tự động khung module mới | DEV | RSK-13 | Tạo module mới chuẩn bằng 1 câu lệnh |
| **P2-W4-04** | `[ ]` | Cấu hình kiểm soát biên ranh giới: ESLint boundaries + `dependency-cruiser` trong CI | DEV, RN | SP-13, AR-01..03 | Import chéo giữa các feature làm CI fail ngay |
| **P2-W4-05** | `[ ]` | `core-contracts`: Khai báo toàn bộ Ports (`CameraRepository`, `SecretStore`, `Player`, `NetworkStatus`, `Logger`, `ConnectionTest`) | RN | File 17 | Compile sạch không lỗi, 100% TypeScript |
| **P2-W4-06** | `[ ]` | `core-contracts`: Khai báo Domain Events, Route names, Error codes và Fake implementation cho mọi Port | RN | AR-04 | Fake adapters sẵn sàng cho unit/component test |
| **P2-W4-07** | `[ ]` | Chốt thông điệp cảnh báo sở hữu (BR-U01) và mã lỗi kết nối UC-05 | BA | BR-U01, UC-05 | File từ điển thông báo được duyệt |
| **P2-W4-08** | `[ ]` | Cấu hình quy tắc PR: Bắt buộc CI lint, typecheck, unit test pass trước khi merge | DEV | - | GitHub Actions / CI pipeline hoạt động |
| **P2-W4-09** | `[ ]` | ADR-0004: Đặc tả `ConnectionTestPort` tách biệt giữa `camera-registry` và `diagnostics` | RN | AR-03 | ADR-0004 được duyệt |

---

## Tuần 5 (30/11 - 04/12): Dữ liệu bền vững (SQLite) & Bảo mật (KeyStore)

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P2-W5-01** | `[ ]` | Lựa chọn thư viện SQLite: `op-sqlite` hoặc `expo-sqlite` (ADR-0005) | RN | Doc 09 | ADR-0005 được phê duyệt |
| **P2-W5-02** | `[ ]` | `storage-sqlite`: Hiện thực schema 4 bảng, migration script tự động, chế độ WAL | RN | Doc 09 | Vượt qua bộ Contract Test của Repository |
| **P2-W5-03** | `[ ]` | `secure-store`: Hiện thực lưu trữ an toàn trong iOS Keychain & Android Keystore | RN, NAT | SEC-001, BR-U04 | Mật khẩu được mã hóa an toàn ở mức OS |
| **P2-W5-04** | `[ ]` | `logger`: Hiện thực Redaction tự động che giấu mật khẩu (`://user:***@host`) | RN | SEC-002, 004 | Unit test redaction pass 100% |
| **P2-W5-05** | `[ ]` | Bộ Contract Suite kiểm tra tính tương đương giữa Adapter thật và Fake Adapter | RN, QA | TC-073 | TC-073 Pass |
| **P2-W5-06** | `[ ]` | Chạy sớm kiểm thử bảo mật lưu trữ: TC-040, TC-041, TC-042 | QA | SEC-001..004 | 0 mật khẩu bị lộ dạng plaintext |

---

## Tuần 6 (07/12 - 11/12): Logic Camera Registry & Kiểm tra Kết nối RTSP

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P2-W6-01** | `[ ]` | Tích hợp Form SCR-03 với `CameraRepositoryPort` + Validation IP/Hostname/Port | RN | FR-001, UC-03 | TC-001, TC-002 Pass |
| **P2-W6-02** | `[ ]` | Tích hợp Dashboard SCR-02 với DB SQLite: Kéo-thả refresh, cập nhật trạng thái | RN | FR-005, UC-08 | TC-010 Pass |
| **P2-W6-03** | `[ ]` | Logic Sửa/Xóa camera: Rollback xóa mật khẩu trong Keystore khi xóa DB thất bại | RN | BR-U04, A1 | Xóa an toàn, có unit test kịch bản lỗi |
| **P2-W6-04** | `[ ]` | `rtsp adapter`: Trình xây dựng URL an toàn không in mật khẩu ra log hệ thống | RN | BR-U05 | Unit test URL builder pass |
| **P2-W6-05** | `[ ]` | `rtsp adapter`: Kiểm tra TCP connect (timeout 5s), OPTIONS / DESCRIBE (timeout 10s) | RN, NAT | FR-002, UC-05 | TC-003 Pass |
| **P2-W6-06** | `[ ]` | Ánh xạ lỗi chi tiết: 401 Unauthorized, 404 Stream Not Found, Timeout, Codec lạ | RN | UC-05 | TC-004 đến TC-007 Pass |
| **P2-W6-07** | `[ ]` | Nối tiến trình kiểm tra vào Modal SCR-05 (DNS $\rightarrow$ TCP $\rightarrow$ OPTIONS $\rightarrow$ Auth) | RN | SCR-05 | Modal hiển thị tiến trình thật chính xác |
| **P2-W6-08** | `[ ]` | Kiểm thử trên camera thật cho cụm Camera Registry | QA | TC-001..007, 010..012 | Báo cáo kiểm thử đạt yêu cầu |

---

## Tuần 7 (14/12 - 18/12): Logic Live View & Finite State Machine

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P2-W7-01** | `[ ]` | Bọc Native Player đã chọn thành `PlayerPort` (buffer thấp, TCP/UDP mode) | NAT, RN | ADR-0003 | Đạt contract test của Player |
| **P2-W7-02** | `[ ]` | Triển khai Finite State Machine (FSM) Live View (Flow A2, tài liệu 18) | RN | FR-003, UC-06 | Unit test đầy đủ các chuyển trạng thái FSM |
| **P2-W7-03** | `[ ]` | Thuật toán Reconnect Exponential Backoff (1s $\rightarrow$ 2s $\rightarrow$ 4s $\rightarrow$ 8s $\rightarrow$ 30s, tối đa 5 lần) | RN | FR-008, UC-11 | TC-013 Pass |
| **P2-W7-04** | `[ ]` | Chặn retry khi gặp lỗi 401 Unauthorized (tránh bị camera khóa IP) | RN | BR-U15, SEC-008 | TC-014 Pass |
| **P2-W7-05** | `[ ]` | `network-info adapter`: Lắng nghe thay đổi mạng Wi-Fi/Cellular, cảnh báo khi rời LAN | RN | FR-016 | TC-016 Pass |
| **P2-W7-06** | `[ ]` | Xử lý chuyển đổi linh hoạt giữa Main-stream và Sub-stream | RN | FR-004, UC-07 | TC-009 Pass |
| **P2-W7-07** | `[ ]` | Quản lý vòng đời màn hình: Dừng stream khi app xuống Background ($\le 5\,\text{s}$), giải phóng decoder | NAT, RN | FR-016, NFR-008 | TC-015, TC-062 Pass |

---

## Tuần 8 (21/12 - 25/12): Tích hợp Toàn diện, Ổn định & Cổng G2

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P2-W8-01** | `[ ]` | Ghép Onboarding vào luồng khởi chạy đầu tiên; xin quyền Local Network theo ngữ cảnh | RN, UX | UC-01, 02 | TC-019, TC-049 Pass |
| **P2-W8-02** | `[ ]` | Composition Root (`apps/mobile`): Container DI tiêm toàn bộ adapter vào các feature | RN | AR-05 | TC-072 Pass |
| **P2-W8-03** | `[ ]` | Kiểm thử độ bền (Soak test): Phát liên tục 4 giờ trên thiết bị thật | QA | TC-025 | Không crash, RAM tăng không quá 20% |
| **P2-W8-04** | `[ ]` | Đo đạc hiệu năng: TTFF trung vị $\le 3\,\text{s}$ qua 30 lần thử; đo CPU/Pin trong 30 phút | QA | TC-026, TC-027 | Đạt chỉ số NFR |
| **P2-W8-05** | `[ ]` | Chạy toàn bộ Regression Test các case bắt buộc (Must Pass TC-001 đến TC-016) | QA | - | Tỷ lệ Pass đạt 100% |
| **P2-W8-06** | `[ ]` | Đóng gói build bản nội bộ: TestFlight Internal (iOS) & Google Play Internal (Android) | DEV | - | Tester cài đặt và mở app thành công |
| **P2-W8-07** | `[ ]` | Tổ chức kiểm thử người dùng UAT (3-5 người dùng thực tế) | QA, BA | - | Thu thập đầy đủ biên bản UAT |
| **P2-W8-08** | `[ ]` | Sửa chữa triệt để mọi lỗi Blocker / Critical phát hiện trong đợt UAT | RN, NAT | - | 0 lỗi Blocker/Critical còn mở |
| **P2-W8-09** | `[ ]` | Họp duyệt Cổng Gate G2 (Nghiệm thu bản MVP) | PO | Gate G2 | Biên bản ký duyệt Gate G2 |

---

## Tiêu chí Cổng Quyết định G2 (Nghiệm thu MVP - Cuối Tuần 8)
- [ ] 100% các Test Case bắt buộc (TC-001..016, TC-040..042, TC-049) đạt trạng thái **PASS**.
- [ ] Số lỗi Blocker / Critical = 0.
- [ ] Soak test 4 giờ đạt yêu cầu (TC-025).
- [ ] Có $\ge 1$ model camera đạt trạng thái **Verified** trên cả Android và iOS.
- [ ] Đã phát hành bản build qua TestFlight và Google Play Internal Testing.

