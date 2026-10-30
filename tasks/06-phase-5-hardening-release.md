# 06 - Phase 5: Tối ưu hóa, Pháp lý & Phát hành (Hardening & Release)

> **Mục tiêu:** Rà soát tính tuân thủ pháp lý, tối ưu trải nghiệm thiết bị cấu hình thấp, hoàn thiện tài sản trên App Store / Google Play và triển khai phát hành theo từng giai đoạn (Staged Rollout).

---

## Giai đoạn P5-1: Pháp lý, Giấy phép & Chính sách Bảo mật (Tuần 1)

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P5-W1-01** | `[ ]` | Rà soát toàn bộ giấy phép mã nguồn mở: LibVLC (LGPL), FFmpeg, react-native; tạo trang Licences | BA, RN | SEC-014, RSK-08 | Không vi phạm điều khoản giấy phép phần mềm |
| **P5-W1-02** | `[ ]` | Cập nhật Privacy Policy, Google Play Data Safety form, Apple Privacy Nutrition Labels | BA, DEV | RSK-09 | Nội dung chính sách khớp chính xác hành vi app |
| **P5-W1-03** | `[ ]` | Rà soát bảo vệ thương hiệu: Tuyệt đối không dùng logo/tên Yoosee/Imou vi phạm sở hữu trí tuệ | BA | RSK-06 | Tài sản đồ họa và nội dung sạch bản quyền |
| **P5-W1-04** | `[ ]` | Kiểm tra tài khoản nhà phát triển: Apple Developer Program và Google Play Console | PO | - | Cả hai tài khoản đều sẵn sàng phát hành |

---

## Giai đoạn P5-2: Tài sản Quảng bá Store & Tự động Ký Ứng dụng (Tuần 2)

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P5-W2-01** | `[ ]` | Thiết kế bộ nhận diện Store: Biểu tượng (App Icon), Ảnh chụp màn hình (Screenshots quảng bá) | UX, BA | - | Đầy đủ ảnh theo các kích cỡ chuẩn của Apple & Google |
| **P5-W2-02** | `[ ]` | Xuất bản tài liệu hướng dẫn trực tuyến: FAQ, Hướng dẫn người dùng bật RTSP trên camera hãng | BA | - | Các bài viết hỗ trợ hiển thị đẹp trên trang web |
| **P5-W2-03** | `[ ]` | Rà soát chuẩn tiếp cận toàn diện (Accessibility Audit) theo tiêu chuẩn WCAG 2.1 AA | QA | NFR-012 | 0 lỗi tiếp cận mức nghiêm trọng |
| **P5-W2-04** | `[ ]` | Thiết lập luồng ký tự động: Google Play App Signing và Apple Fastlane Match / EAS Credentials | DEV | - | CI tự động ký và tạo file cài đặt production |

---

## Giai đoạn P5-3: Tối ưu Thiết bị Cũ, Giám sát Crash & Nộp Duyệt (Tuần 3)

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P5-W3-01** | `[ ]` | Kiểm thử trên thiết bị cấu hình thấp: Android API 26 (Android 8.0), RAM 2-3GB; iPhone iOS 15 | QA, NAT | NFR-009 | App chạy mượt mà, không bị tràn RAM (OOM) |
| **P5-W3-02** | `[ ]` | Kiểm thử các kịch bản mạng khắc nghiệt: Rớt mạng đột ngột, đổi từ Wi-Fi sang 4G, app chạy ngầm | QA | TC-013..016 | App phục hồi mượt mà không crash |
| **P5-W3-03** | `[ ]` | Tích hợp hệ thống giám sát lỗi Crashlytics / Sentry (Cơ chế Opt-in, cấm gửi dữ liệu nhạy cảm) | RN | SEC-013 | TC-050 Pass |
| **P5-W3-04** | `[ ]` | Chạy bộ kiểm thử hồi quy toàn diện lần cuối và chạy Soak Test 4 giờ liên tục | QA | Gate G6 | Toàn bộ kiểm thử đạt trạng thái Release Candidate |
| **P5-W3-05** | `[ ]` | Nộp hồ sơ ứng dụng lên Apple App Store Review và Google Play Review | DEV, PO | - | Trạng thái nộp chuyển sang *Waiting for Review* |

---

## Giai đoạn P5-4: Phát hành Phân tầng & Giám sát Vận hành (Tuần 4)

| ID | St | Task | Vai trò | Tham chiếu | Done khi |
| :--- | :---: | :--- | :---: | :--- | :--- |
| **P5-W4-01** | `[ ]` | Tiếp nhận và phản hồi nhanh các yêu cầu giải trình của đội ngũ kiểm duyệt Store | RN, DEV | - | Ứng dụng được App Store và Google Play phê duyệt |
| **P5-W4-02** | `[ ]` | Kích hoạt phát hành từng giai đoạn: 5% $\rightarrow$ 10% $\rightarrow$ 25% $\rightarrow$ 50% $\rightarrow$ 100% người dùng | DEV | - | Lượng người dùng tăng dần có kiểm soát |
| **P5-W4-03** | `[ ]` | Trực chiến giám sát tỷ lệ crash và các sự cố phát sinh (Crash-free users $\ge 99.5\%$) | DEV, BA | - | Không có sự cố Blocker diện rộng |
| **P5-W4-04** | `[ ]` | Họp tổng kết dự án (Retrospective), cập nhật ma trận tương thích và lập Backlog phiên bản tiếp theo | PO, BA | - | Biên bản tổng kết hoàn tất |
| **P5-W4-05** | `[ ]` | Họp ký nghiệm thu chính thức Cổng Gate G6 (Release Gate) | PO | Gate G6 | Gate G6 được ký duyệt thành công |

---

## Tiêu chí Cổng Quyết định G6 (Phát hành Chính thức - Release Gate)
- [ ] 0 lỗi ở mức độ Blocker / Critical.
- [ ] 100% các Test Case trong nhóm Must Pass và Security Pass đạt yêu cầu.
- [ ] Soak test 4 giờ đạt yêu cầu ổn định.
- [ ] Hoàn thành 100% checklist pháp lý, giấy phép bên thứ ba và chính sách bảo mật của Store.
- [ ] Phát hành theo cơ chế Staged Rollout an toàn, không có sự cố crash nghiêm trọng.

