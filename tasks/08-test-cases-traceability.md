# 08 - Kiểm soát Chất lượng: Bảng Test Cases & Ma trận Đối chiếu

> **Quy ước trạng thái kết quả kiểm thử:**  
> `P` = Pass (Đạt) · `F` = Fail (Không đạt) · `-` = Chưa chạy · `N/A` = Không áp dụng.

---

## 1. Bảng Kiểm soát Test Cases

### 1.1 Nhóm Kiểm thử PoC & Khả thi ban đầu (TC-POC)
| Mã TC | Tên kịch bản kiểm thử | Yêu cầu đối chiếu | Nền tảng | Trạng thái | Ghi chú / Ngày test |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **TC-POC-01** | Kiểm tra luồng RTSP trên máy tính bằng VLC/ffplay | Feasibility | PC | `-` | Phát video liên tục $\ge 60\,\text{s}$ |
| **TC-POC-02** | Phân tích thông số kỹ thuật (Codec, FPS, Bitrate) qua ffprobe | Feasibility | PC | `-` | Xác định rõ H.264/H.265 |
| **TC-POC-03** | Khảo sát ONVIF Profiles & PTZ qua ONVIF Device Manager | Feasibility | PC | `-` | Kiểm tra Profile S/G |
| **TC-POC-04** | Phát video RTSP liên tục $\ge 10$ phút trên thiết bị Android thật | Gate G1 | Android | `-` | Không giật hình, không rò rỉ RAM |
| **TC-POC-05** | Phát video RTSP liên tục $\ge 10$ phút trên thiết bị iOS thật | Gate G1 | iOS | `-` | Quyền Local Network hoạt động |
| **TC-POC-06** | Đo đạc và so sánh hiệu năng giữa 2 giải pháp Native Player | Gate G1 | Android/iOS | `-` | So sánh TTFF, CPU, RAM |

---

### 1.2 Nhóm Kiểm thử Nghiệp vụ MVP (Bắt buộc Pass - Must Pass)
| Mã TC | Tên kịch bản kiểm thử | User Story | Nền tảng | Trạng thái | Ghi chú / Ngày test |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **TC-001** | Thêm camera thủ công với địa chỉ IP hợp lệ | UC-03 | Chung | `-` | Lưu thông tin thành công |
| **TC-002** | Chặn lưu camera khi form nhập liệu không hợp lệ (IP sai, tên trống) | UC-03 | Chung | `-` | Hiện thông báo lỗi inline |
| **TC-003** | Kiểm tra kết nối RTSP thành công với cổng 554 mở | UC-05 | Chung | `-` | Modal hiện các bước tích xanh |
| **TC-004** | Xử lý lỗi 401 Unauthorized khi sai tên đăng nhập hoặc mật khẩu | UC-05 | Chung | `-` | Báo lỗi sai auth rõ ràng |
| **TC-005** | Xử lý lỗi 404 Stream Not Found khi sai đường dẫn RTSP path | UC-05 | Chung | `-` | Hướng dẫn kiểm tra lại path |
| **TC-006** | Xử lý lỗi Timeout khi camera không phản hồi trong 5-10 giây | UC-05 | Chung | `-` | Báo lỗi timeout chính xác |
| **TC-007** | Cảnh báo khi định dạng codec video không được thiết bị hỗ trợ | UC-05 | Chung | `-` | Báo codec không tương thích |
| **TC-008** | Mở xem trực tiếp camera (Live View) thành công | UC-06 | Chung | `-` | Hiển thị video mượt mà |
| **TC-009** | Chuyển đổi qua lại giữa luồng Main-stream (HD) và Sub-stream (SD) | UC-07 | Chung | `-` | Đổi stream mượt, không giật |
| **TC-010** | Hiển thị danh sách camera trên Dashboard đầy đủ các trạng thái | UC-08 | Chung | `-` | Empty, Loading, Live, Offline |
| **TC-011** | Chỉnh sửa thông tin kết nối camera | UC-09 | Chung | `-` | Lưu thông tin mới thành công |
| **TC-012** | Xóa camera khỏi danh sách và xóa mật khẩu trong Keystore | UC-10 | Chung | `-` | Dữ liệu được dọn sạch hoàn toàn |
| **TC-013** | Tự động kết nối lại khi rớt mạng theo thuật toán Exponential Backoff | UC-11 | Chung | `-` | Thử lại 1s, 2s, 4s, 8s, 30s |
| **TC-014** | Dừng kết nối lại khi gặp lỗi 401 Unauthorized để tránh bị khóa IP | BR-U15 | Chung | `-` | Không thử lại vô hạn |
| **TC-015** | Giải phóng tài nguyên và dừng stream khi ứng dụng xuống background | FR-016 | Chung | `-` | Dừng trong vòng $\le 5\,\text{s}$ |
| **TC-016** | Phát hiện và hiển thị cảnh báo khi thiết bị rời khỏi mạng Wi-Fi nội bộ | FR-016 | Chung | `-` | Hiện banner ngoài mạng LAN |

---

### 1.3 Nhóm Kiểm thử An toàn & Bảo mật (Security Must Pass)
| Mã TC | Tên kịch bản kiểm thử | Tiêu chuẩn | Trạng thái | Ghi chú / Ngày test |
| :--- | :--- | :---: | :---: | :--- |
| **TC-040** | Kiểm tra lưu trữ mật khẩu trong Keychain (iOS) và Keystore (Android) | SEC-001 | `-` | 0 lưu mật khẩu plaintext trong file |
| **TC-041** | Quét file SQLite và bộ nhớ đệm: Không chứa mật khẩu camera | SEC-001 | `-` | Dữ liệu DB được bảo vệ |
| **TC-042** | Kiểm tra hệ thống Log và Crash Report: Đã che giấu thông tin nhạy cảm | SEC-002 | `-` | Không lọt URL chứa user:pass |
| **TC-043** | Kiểm tra chứng chỉ SSL/TLS khi gọi API ngoài (yêu cầu TLS $\ge 1.2$) | SEC-003 | `-` | Bắt buộc HTTPS chuẩn |
| **TC-044** | Cảnh báo người dùng khi camera đang mở không có mật khẩu bảo vệ | SEC-006 | `-` | Khuyến cáo đổi mật khẩu |
| **TC-045** | Giới hạn quét mạng chỉ trong subnet hiện tại và có nút dừng | SEC-007 | `-` | Không quét tràn ra mạng ngoài |
| **TC-049** | Hiển thị cảnh báo trách nhiệm pháp lý khi khởi chạy lần đầu | BR-U01 | `-` | Người dùng phải xác nhận sở hữu |
| **TC-050** | Cơ chế gửi log báo lỗi hoàn toàn là Opt-in (tắt mặc định) | SEC-013 | `-` | Tôn trọng quyền riêng tư |

---

### 1.4 Nhóm Kiểm thử Hiệu năng & Ổn định (Performance & Soak Test)
| Mã TC | Tên kịch bản kiểm thử | Tiêu chuẩn NFR | Trạng thái | Ghi chú / Ngày test |
| :--- | :--- | :---: | :---: | :--- |
| **TC-025** | Soak test: Xem video liên tục 4 giờ trên thiết bị thật | NFR-007 | `-` | RAM không tăng quá 20%, không crash |
| **TC-026** | Đo mức tiêu thụ Pin và CPU khi xem camera trong 30 phút | NFR-008 | `-` | Không làm máy quá nóng |
| **TC-027** | Đo thời gian tải khung hình đầu tiên (Time to First Frame - TTFF) | NFR-001 | `-` | Trung vị $\le 3\,\text{s}$ qua 30 lần thử |
| **TC-028** | Đo độ trễ từ camera tới màn hình (Glass-to-glass latency) | NFR-002 | `-` | Đạt $\le 1.5\,\text{s}$ trong mạng LAN |
| **TC-029** | Kiểm tra chu kỳ vào/ra màn hình Live View liên tục 100 lần | PERF-08 | `-` | Không rò rỉ bộ nhớ, giải phóng sạch |
| **TC-030** | Chạy kiểm thử trên ma trận thiết bị thực tế ($\ge 5$ thiết bị) | NFR-009 | `-` | Tương thích đa kích thước màn hình |
| **TC-032** | Kiểm thử tiếp cận người dùng khuyết tật (VoiceOver / TalkBack) | NFR-012 | `-` | Đọc được nhãn nút và trạng thái |
| **TC-073** | Chạy bộ Contract Test Suite xác minh Adapter thật tương đương Fake | AR-07 | `-` | Đảm bảo tính thay thế của Ports |

