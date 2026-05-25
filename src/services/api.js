import axios from 'axios';

// Lấy link API từ biến môi trường
// Chú ý: Mở comment dòng phù hợp với công cụ bạn đang dùng

// Dành cho VITE:
const BASE_URL = import.meta.env.VITE_API_URL;

// Dành cho CREATE REACT APP (CRA):
// const BASE_URL = process.env.REACT_APP_API_URL; 

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
    const token = localStorage.getItem('token');
    
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
    if (error.response && error.response.status === 401) {
      console.warn("Phiên đăng nhập hết hạn!");
    }
    return Promise.reject(error);
  }
);

export default api;