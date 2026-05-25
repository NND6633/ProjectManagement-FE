import api from './api';

// ==========================================
// 1. HÀM ĐĂNG NHẬP (LOGIN)
// ==========================================
export const loginApi = async (email, password) => {
  try {
    const response = await api.post('/api/v1/auth/login', { 
      email: email, 
      password: password 
    });

    // Axios tự động ném lỗi nếu HTTP Status Code là 4xx, 5xx.
    // Nếu code chạy đến đây có nghĩa là API đã gọi thành công (Status 200 OK).
    
    // Linh hoạt lấy token (đề phòng BE đổi cấu trúc)
    const token = response.data?.data?.token || response.data?.token;
    const refreshToken = response.data?.data?.refreshToken || response.data?.refreshToken;

    if (!token) {
      throw new Error("Login success but no token received from Server!");
    }
    
    return { token, refreshToken };

  } catch (error) {
    // Chỉ nhảy vào đây khi Backend thực sự trả về mã lỗi (Sai pass, tài khoản chưa confirm...)
    const errorMessage = error.response?.data?.message || error.response?.data || error.message || "Server connection failed!";
    throw new Error(errorMessage, { cause: error });
  }
};

// ==========================================
// 2. HÀM ĐĂNG KÝ (REGISTER)
// ==========================================
export const registerApi = async (userData) => {
  try {
    const response = await api.post('/api/v1/auth/register', {
      email: userData.email,
      password: userData.password,
      fullName: userData.name
    });

    // Trả về thẳng message từ Backend (Nếu có)
    return { message: response.data.message || "Đăng ký thành công!" };

  } catch (error) {
    // Chỉ nhảy vào đây khi Backend trả về mã lỗi 400, 500...
    const errorMessage = error.response?.data?.message || error.message || "Lỗi kết nối máy chủ!";
    throw new Error(errorMessage, { cause: error });
  }
};

// ==========================================
// 3. HÀM QUÊN MẬT KHẨU (FORGOT PASSWORD)
// ==========================================
export const forgotPasswordApi = async (email) => {
  
  
  try {
    const response = await api.post('/api/v1/auth/forgot-password', {
      email: email
    });

    const isSuccess = response.data.isSuccess;
    const message = response.data.message;

    if (!isSuccess) {
      throw new Error(message || "Gửi yêu cầu thất bại!");
    }

    return { message };

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Lỗi kết nối máy chủ!";
    throw new Error(errorMessage, { cause: error });
  }
    
};
export const resetPasswordApi = async (email, token, newPassword) => {

  
  try {
    const response = await api.post('/api/v1/auth/reset-password', {
      email: email,
      token: token,
      newPassword: newPassword
    });

    const isSuccess = response.data.isSuccess;
    const message = response.data.message;

    if (!isSuccess) {
      throw new Error(message || "Đổi mật khẩu thất bại!");
    }

    return { message };

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Lỗi kết nối máy chủ!";
    throw new Error(errorMessage, { cause: error });
  }
  
 
};