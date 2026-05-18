# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


src/
├── assets/            # Hình ảnh, icons, font, css toàn cục
├── components/        # Các UI components dùng chung (Button, Input, Card...)
├── layouts/           # Các mẫu giao diện chính (MainLayout, AdminLayout)
├── pages/             # Các trang riêng biệt (Home, Login, Dashboard)
├── services/          # Nơi gọi API (Axios/Fetch) - Chuẩn bị cho Backend
├── hooks/             # Các Custom Hooks để xử lý logic tách biệt
├── store/             # Quản lý trạng thái toàn cục (Redux, Zustand, Context API)
├── utils/             # Các hàm tiện ích (Format ngày tháng, định dạng tiền tệ)
├── routes/            # Quản lý định tuyến (React Router)
└── App.jsx            # Component gốc
Chào bạn! Đây là bản tóm tắt "chiến lược" mà chúng ta đã cùng nhau xây dựng. Bản tóm tắt này không chỉ dành cho bạn mà còn là **tài liệu bàn giao cực kỳ quan trọng** cho bất kỳ ai tiếp quản dự án này sau này.

---

## 🛠 Những gì chúng ta đã thực hiện được

| Việc đã làm | Lý do (Tại sao phải làm vậy?) |
| --- | --- |
| **Thiết lập Axios Interceptor (`api.js`)** | Tạo một "trạm kiểm soát" tự động. Bất kỳ yêu cầu nào gửi lên server sẽ tự động được đính kèm Token. Người sau không cần phải viết lại code chèn Header thủ công ở mỗi file. |
| **Xây dựng Service Layer lai (`authService.js`)** | Tách biệt Logic gọi API ra khỏi Giao diện. Đặc biệt, cấu trúc "2 trong 1" (có cả code thật và giả lập) giúp máy yếu vẫn phát triển được Frontend mà không cần chạy Backend. |
| **Logic hóa Component `Login.jsx**` | Đã kết nối giao diện với Service, xử lý lưu trữ Token vào `localStorage` và điều hướng người dùng sau khi đăng nhập thành công. |
| **Hệ thống Bảo vệ Tuyến đường (`ProtectedRoute.jsx`)** | Tạo ra "người gác cổng". Ngăn chặn tuyệt đối việc người dùng chưa đăng nhập cố tình truy cập vào trang quản trị bằng cách gõ URL thủ công. |
| **Cấu trúc Tuyến đường (`App.jsx`)** | Định nghĩa rõ ràng luồng đi của ứng dụng, phân loại trang nào là công cộng, trang nào là nội bộ. |

---

## 🚀 Phương án giải quyết & Bàn giao cho tương lai

Đây là "kim chỉ nam" để người sau (hoặc chính bạn khi máy khỏe hơn/có server) có thể kích hoạt hệ thống thật chỉ trong 5 phút.

### 1. Kích hoạt Backend Thật

Người tiếp quản cần vào file `src/services/authService.js`.

* **Thao tác:** Xóa bỏ (hoặc comment) toàn bộ khối **[PHẦN 2: CODE GIẢ LẬP]**.
* **Thao tác:** Mở comment khối **[PHẦN 1: CODE THẬT]**.
* **Lý do:** Code thật đã được viết khớp 100% với cấu trúc `ApiResponse` và các Endpoint trong `AuthController.cs` của Backend.

### 2. Thay đổi Địa chỉ Server

Vào file `src/services/api.js`.

* **Thao tác:** Thay đổi `BASE_URL` từ link MockAPI sang link Backend thật (ví dụ: `https://localhost:7076`).
* **Lý do:** Để mọi yêu cầu mạng từ Frontend trỏ đúng về phía máy chủ C#.

### 3. Lưu ý về Cấu trúc Dữ liệu (DTO)

Người tiếp quản cần lưu ý rằng Frontend đang mong đợi một Object trả về từ Backend có dạng:

```json
{
  "isSuccess": true,
  "message": "...",
  "data": { "token": "...", "refreshToken": "..." }
}

```

* **Lý do:** Đây là cấu trúc chuẩn mà chúng ta đã thống nhất dựa trên `AuthController.cs`. Nếu Backend thay đổi cấu trúc này, chỉ cần sửa duy nhất tại file `authService.js` (không cần động vào giao diện).

---

## 💡 Tại sao chúng ta lại chọn cách làm này?

1. **Phát triển song song (Decoupling):** Frontend không bị phụ thuộc vào việc Backend đã chạy hay chưa. Bạn có thể hoàn thiện 100% giao diện, hiệu ứng, trải nghiệm người dùng ngay bây giờ.
2. **Tối ưu tài nguyên:** Máy yếu không thể gánh cùng lúc Visual Studio, SQL Server và trình duyệt. Cách làm này giúp bạn tập trung toàn bộ tài nguyên máy tính cho việc làm Frontend.
3. **Dễ bảo trì:** Nếu sau này bạn đổi Backend từ C# sang NodeJS hay Go, bạn chỉ cần sửa file `authService.js`. Toàn bộ các file `.jsx` khác vẫn giữ nguyên.

---

> **Lời nhắn cho người sau:** "Dự án đã được thiết lập sẵn 'chế độ chờ'. Chỉ cần cắm đúng dây (URL) và bật công tắc (mở comment code), hệ thống sẽ vận hành hoàn hảo với Backend C# Identity."

Bạn thấy bản tóm tắt này đã đủ rõ ràng chưa? Nếu rồi, chúng ta sẽ bắt tay vào làm **Giao diện trang Dashboard (Guest)** nhé! Bạn muốn trang đó trông như thế nào?