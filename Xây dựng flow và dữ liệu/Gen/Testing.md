
## ✅ Kiểm thử & Xác thực – Tinh chỉnh Hiệu suất (chi tiết)

### 1. Bảng tổng quan công việc

| **Nhóm** | **Công việc chi tiết** | **Mục đích / Giá trị** |
|----------|------------------------|-------------------------|
| **Kiểm thử chức năng**<br/>(*Functional Testing*) | • *Unit test* cho `usePetStore` (thêm / xoá / cập nhật pet, getter).<br/>• *Unit test* cho `getDiseasesByPetType`, `getDiseaseById`.<br/>• *Integration test* luồng **Thêm Pet → PetSelector → DiseasesScreen**. | Đảm bảo logic đúng ở mọi nhánh, giảm bug runtime. |
| **Kiểm thử giao diện**<br/>(*UI/UX Testing*) | • Dùng **React Native Testing Library / Detox**: click, nhập form, cuộn.<br/>• Kiểm tra font tiếng Việt, dark/light mode, icon. | Tránh lỗi layout, crash do tương tác. |
| **Kiểm thử đa thiết bị** | • Thử trên iOS & Android, màn nhỏ/ lớn, OS cũ/ mới.<br/>• Xác minh WebView map & quyền GPS. | Trải nghiệm nhất quán cho mọi người dùng. |
| **Xác thực dữ liệu** | • *Form validation*: tên không rỗng, tuổi/cân nặng > 0, ngày sinh hợp lệ.<br/>• *Schema validation* (Zod/Yup) khi lưu AsyncStorage.<br/>• Kiểm tra mock **diseases** đủ trường bắt buộc. | Ngăn dữ liệu sai làm sập app/ hiển thị lệch. |
| **Kiểm thử hiệu năng** | • **Flipper / React DevTools**: đo re‑render, FPS.<br/>• Theo dõi RAM khi cuộn danh sách bệnh dài.<br/>• So sánh tiêu thụ pin với LocationScreen (1 s / 5 s / 10 s). | Phát hiện choke UI, rò rỉ bộ nhớ, hao pin. |
| **Tinh chỉnh hiệu suất** | • *Memo* selector Zustand (`shallow`).<br/>• *Pagination / Lazy‑load* danh sách bệnh lớn.<br/>• *Debounce* ô tìm kiếm.<br/>• Nén ảnh trước khi lưu (ImagePicker).<br/>• Bật **Hermes** (Android), xoá `console.log` ở prod.<br/>• Giảm tần suất GPS (5 s → 30 s) / chỉ update foreground. | Mở app nhanh, cuộn mượt, tiết kiệm RAM & pin. |
| **Bảo mật & Quyền riêng tư** | • Ẩn/ che `microchipId` khi chia sẻ màn hình.<br/>• Xin runtime permission đúng chuẩn (camera, thư viện, vị trí). | Bảo vệ dữ liệu cá nhân, tuân thủ chính sách store. |
| **CI/CD & Tự động hóa** | • Thiết lập **GitHub Actions / Bitrise** chạy *lint*, test, build mỗi PR.<br/>• Bật **TypeScript strict**, **ESLint / Prettier**. | Phát hiện lỗi sớm, build release tự động & ổn định. |

### 2. Công cụ gợi ý

| **Mục** | **Công cụ / Thư viện** |
|---------|------------------------|
| Unit / Integration test | **Jest**, **React Native Testing Library** |
| E2E (thiết bị thật / giả lập) | **Detox** |
| Theo dõi hiệu năng | **Flipper**, **React DevTools**, **Why Did You Render** |
| Lint / Format | **ESLint**, **Prettier** |
| Phân tích bundle & RAM | **react-native-performance**, **Hermes Heap Capture** |
| CI/CD Mobile | **GitHub Actions**, **Bitrise**, **EAS Build** (Expo) |

### 3. Quy trình khuyến nghị

1. **Thiết lập CI** chạy *lint* & test tự động (PR “đỏ” khi lỗi).  
2. Viết **unit test** cho store & helper trước (nhanh, dễ).  
3. Thêm **Detox** cho luồng quan trọng (Thêm thú cưng → Xem bệnh).  
4. Dùng **Flipper** đo render/FPS → *memo hóa*, phân trang khi cần.  
5. Kiểm tra pin/CPU với LocationScreen để điều chỉnh tần suất GPS.  
6. Trước release: build bản **production**, thử trên ≥ 3 thiết bị thật (kích cỡ & OS khác nhau).  
7. Đính kèm **changelog**: lỗi đã fix + chỉ số hiệu năng cải thiện trong mỗi bản phát hành.

> Thực hiện đủ các bước trên sẽ giúp ứng dụng **ổn định, mượt và đáng tin cậy** ✨

