# UICV - Quản lý Danh mục Công việc (Task Registry)

> **Cập nhật:** 2026-10-30  
> **Định hướng chiến lược:** **ƯU TIÊN LÀM CLIENT UI & UI PREVIEW TRƯỚC** để nghiệm thu trực quan giao diện, luồng trải nghiệm (UX) và trạng thái component bằng mock data trước khi tích hợp logic camera / RTSP native.

---

## 1. Bản đồ Thư mục Công việc (`tasks/`)

| File | Nội dung & Mục đích | Độ ưu tiên |
| :--- | :--- | :---: |
| [00-priority-client-ui-preview.md](file:///d:/Workspaces/cameras_vapp/tasks/00-priority-client-ui-preview.md) | **Client UI Preview (Ưu tiên số 1):** Design Tokens, UI-Kit, Mock Data, toàn bộ Screens SCR-01 -> SCR-10, Sandbox Preview | 🔥 **CAO NHẤT** |
| [01-phase-0-discovery-setup.md](file:///d:/Workspaces/cameras_vapp/tasks/01-phase-0-discovery-setup.md) | **Phase 0 (W1):** Setup công cụ phát triển, môi trường monorepo, kiểm tra mạng | Bình thường |
| [02-phase-1-poc-player.md](file:///d:/Workspaces/cameras_vapp/tasks/02-phase-1-poc-player.md) | **Phase 1 (W2-W3):** PoC giải mã RTSP trên camera thật, chốt Player native, Gate G1 | Theo lộ trình |
| [03-phase-2-mvp-core-logic.md](file:///d:/Workspaces/cameras_vapp/tasks/03-phase-2-mvp-core-logic.md) | **Phase 2 (W4-W8):** Clean Architecture, Core Contracts, SQLite, KeyStore, RTSP FSM, Gate G2 | Sau khi duyệt UI |
| [04-phase-3-advanced-features.md](file:///d:/Workspaces/cameras_vapp/tasks/04-phase-3-advanced-features.md) | **Phase 3 (W9-W12):** ONVIF Discovery, PTZ, Multi-view thật, Diagnostics đầy đủ | Nâng cao |
| [05-phase-4-remote-alerts-playback.md](file:///d:/Workspaces/cameras_vapp/tasks/05-phase-4-remote-alerts-playback.md) | **Phase 4 (W13-W18):** WebRTC Relay, Push FCM/APNs, Playback Profile G (Tùy chọn) | Tùy chọn |
| [06-phase-5-hardening-release.md](file:///d:/Workspaces/cameras_vapp/tasks/06-phase-5-hardening-release.md) | **Phase 5:** Tối ưu hóa, giấy phép store, TestFlight & Google Play rollout | Phát hành |
| [07-cross-cutting-adr-spike-risks.md](file:///d:/Workspaces/cameras_vapp/tasks/07-cross-cutting-adr-spike-risks.md) | Danh mục ADR, Spikes kỹ thuật (SP-01..13), Câu hỏi mở (OQ) & Bảng rủi ro | Xuyên suốt |
| [08-test-cases-traceability.md](file:///d:/Workspaces/cameras_vapp/tasks/08-test-cases-traceability.md) | Bảng kiểm soát Test Cases (TC-001..073) và ma trận đối chiếu | Đo lường |

---

## 2. Quy tắc Đánh dấu Trạng thái
* `[ ]` **Chưa làm:** Task đang chờ thực hiện.
* `[~]` **Đang làm:** Đang trong quá trình code hoặc thiết kế.
* `[x]` **Hoàn thành:** Đạt đầy đủ tiêu chí nghiệm thu (Done khi) và vượt qua bước kiểm chứng (Verification Step).
* `[!]` **Bị chặn (Blocked):** Cần làm rõ spec hoặc vướng phụ thuộc.
* `[-]` **Bỏ qua / Không áp dụng.**

---

## 3. Chiến lược: "UI Preview First, Logic Later"
1. **Bước 1:** Xây dựng Design System & Component Library thuần túy trong `packages/ui-kit`.
2. **Bước 2:** Cung cấp bộ dữ liệu giả lập (Mock Data & Fake Ports) mô phỏng đầy đủ trạng thái: Normal, Connecting, Buffering, Reconnecting, Empty, Error, Offline.
3. **Bước 3:** Lắp ráp toàn bộ 10 màn hình giao diện (SCR-01 đến SCR-10).
4. **Bước 4:** Khởi chạy môi trường **UI Preview Sandbox** (hỗ trợ preview ngay trên web browser / mobile simulator) để tương tác, review luồng và chốt trải nghiệm thị giác.
5. **Bước 5:** Ghép nối logic nghiệp vụ thật (RTSP, SQLite, Keychain, Socket) vào các Port đã thiết kế sẵn.

