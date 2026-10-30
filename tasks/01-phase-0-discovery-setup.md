# 01 - Phase 0: Discovery & Setup Môi trường (W1, 02/11 - 06/11/2026)

> **Mục tiêu:** Chuẩn bị đầy đủ công cụ phân tích mạng, khảo sát thiết bị camera thật và khởi tạo bộ khung Monorepo skeleton chuẩn Clean Architecture.

---

## Danh sách Công việc Phase 0

| ID | St | Task | Vai trò | Tham chiếu | Done khi | Ghi chú |
| :--- | :---: | :--- | :---: | :--- | :--- | :--- |
| **P0-W1-01** | `[ ]` | Xác định camera thật: hãng, model, firmware (chụp ảnh nhãn thiết bị) | PO, BA | OQ-01, OQ-03 | Bảng thông tin camera đầy đủ: MAC, IP, Model, FW | |
| **P0-W1-02** | `[ ]` | Xác nhận có Mac + iPhone (hoặc phương án EAS Build đám mây) | PO | OQ-13 | Có thiết bị thật hoặc pipeline build iOS | |
| **P0-W1-03** | `[ ]` | Chốt mục đích phát hành (nội bộ/thương mại), OS tối thiểu, ngôn ngữ UI | PO | OQ-06, 07, 09 | 3 OQ có câu trả lời chốt | |
| **P0-W1-04** | `[ ]` | Cài Node LTS + pnpm, khóa phiên bản (`.nvmrc` / `package.json engines`) | RN | - | `node -v`, `pnpm -v` đúng phiên bản | |
| **P0-W1-05** | `[ ]` | Cài JDK, Android Studio + SDK, emulator & kết nối thiết bị Android thật | RN, NAT | - | Build và chạy được Hello World trên Android | |
| **P0-W1-06** | `[ ]` | Cài Xcode + CocoaPods (hoặc cấu hình EAS Build) | NAT | OQ-13 | Build được iOS | |
| **P0-W1-07** | `[ ]` | Cài công cụ mạng PC: VLC, ffprobe/ffplay, ONVIF Device Manager, Wireshark | QA | - | Tất cả công cụ chạy tốt trên PC | |
| **P0-W1-08** | `[ ]` | Bật RTSP/ONVIF trong app hãng, đặt mật khẩu quản trị (không để trống) | BA, QA | E3 | Luồng RTSP trên camera thật được kích hoạt | |
| **P0-W1-09** | `[ ]` | Đặt IP tĩnh / DHCP reservation; quét cổng 554/5000/3702; ghi path ứng viên | QA | - | Bảng IP, cổng mở và danh sách path thử nghiệm | |
| **P0-W1-10** | `[ ]` | Repo skeleton: git, pnpm workspace, TS strict, ESLint, Prettier | RN, DEV | - | Lệnh `pnpm lint` và `pnpm typecheck` chạy pass | |
| **P0-W1-11** | `[ ]` | Cấu hình Husky + lint-staged, commitlint, file `.env.example`, quy tắc nhánh | DEV | - | Hook chạy chặn commit không chuẩn | |
| **P0-W1-12** | `[ ]` | Tạo thư mục tài liệu `docs/ba`, `docs/adr`, `docs/ui-preview` | BA | - | Thư mục có tài liệu ban đầu | |
| **P0-W1-13** | `[ ]` | Hello world Android | RN | - | Chạy thành công trên thiết bị thật | |
| **P0-W1-14** | `[ ]` | Hello world iOS | RN, NAT | - | Chạy thành công trên iPhone / simulator | |
| **P0-W1-15** | `[ ]` | Đọc tài liệu nghiên cứu tuần 0: A1-A4, A7-A9, B1-B9, C1, C5 | BA, RN | Chương 22 (doc 20) | Có ghi chú tóm tắt kiến thức | |
| **P0-W1-16** | `[ ]` | Lập ma trận tương thích ban đầu (Model + FW) | BA | File 03 | Ma trận có thông tin camera thật | |
| **P0-W1-17** | `[ ]` | Họp duyệt Cổng Gate G0 | PO | Gate G0 | Toàn bộ tiêu chí G0 được tích xanh | |

---

## Tiêu chí Cổng Quyết định G0 (Cuối Tuần 1)
- [ ] Đã có $\ge 1$ camera thật, ghi rõ model + firmware.
- [ ] Bảng ma trận tương thích ban đầu đã được thiết lập.
- [ ] Dự án skeleton chạy được Hello World trên cả Android và iOS.

