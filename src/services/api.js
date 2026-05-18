import axios from 'axios';

// Link MockAPI hiện tại (Sau này chạy C# thì đổi thành https://localhost:7076)
const BASE_URL = 'https://6a02982d0d92f63dd253c8e1.mockapi.io'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==========================================
// TRẠM KIỂM SOÁT YÊU CẦU (REQUEST INTERCEPTOR)
// ==========================================
api.interceptors.request.use(
  (config) => {
    // 1. Lấy token từ túi localStorage
    const token = localStorage.getItem('token');
    
    // 2. Nếu có chìa khóa (token), tự động gắn vào Header
    // Lưu ý: C# Identity yêu cầu định dạng "Bearer <token>"
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// TRẠM KIỂM SOÁT PHẢN HỒI (RESPONSE INTERCEPTOR)
// ==========================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Nếu Backend trả về 401 (Token hết hạn hoặc không hợp lệ)
    if (error.response && error.response.status === 401) {
      console.warn("Phiên đăng nhập hết hạn!");
      // Có thể tự động đuổi người dùng ra trang Login tại đây:
      // localStorage.clear();
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;