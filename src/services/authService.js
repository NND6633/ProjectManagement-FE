//import api from './api';

// ==========================================
// 1. HÀM ĐĂNG NHẬP (LOGIN)
// ==========================================
export const loginApi = async (email, password) => {
  // ---------------------------------------------------------
  // [PHẦN 1: CODE THẬT] (Bỏ comment phần này khi nối Backend C#)
  // ---------------------------------------------------------
  /*
  try {
    const response = await api.post('/api/v1/auth/login', { 
      email: email, 
      password: password 
    });

    const isSuccess = response.data.isSuccess;
    const message = response.data.message;
    const token = response.data.data?.token;
    const refreshToken = response.data.data?.refreshToken;

    if (!isSuccess) {
      throw new Error(message || "Đăng nhập thất bại!");
    }

    if(refreshToken) localStorage.setItem('refreshToken', refreshToken);
    
    return { token, message };

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Lỗi kết nối máy chủ!";
    throw new Error(errorMessage, { cause: error });
  }
  */

  // ---------------------------------------------------------
  // [PHẦN 2: CODE GIẢ LẬP] (Xóa toàn bộ phần này khi nối Backend)
  // ---------------------------------------------------------
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Giả lập check C#: Nếu đúng email này thì cho qua
      if (email === "test@gmail.com" && password === "123456") {
        resolve({
          token: "fake-jwt-token-sieu-cap-vip-pro", // Dữ liệu móc ra từ response.data.data
          refreshToken: "fake-refresh-token-cho-zui",
          message: "Login successful"
        });
      } else {
        // Giả lập lỗi trả về từ C#
        reject(new Error("Email does not exist or Password is incorrect"));
      }
    }, 1000); // Giả vờ load mạng 1 giây
  });
};

// ==========================================
// 2. HÀM ĐĂNG KÝ (REGISTER)
// ==========================================
export const registerApi = async (userData) => {
  // ---------------------------------------------------------
  // [PHẦN 1: CODE THẬT] (Bỏ comment phần này khi nối Backend C#)
  // ---------------------------------------------------------
  /*
  try {
    const response = await api.post('/api/v1/auth/register', {
      email: userData.email,
      password: userData.password,
      fullName: userData.name // Map từ form sang DTO của C#
    });

    const isSuccess = response.data.isSuccess;
    const message = response.data.message;

    if (!isSuccess) {
      throw new Error(message || "Đăng ký thất bại!");
    }

    return { message };

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Lỗi kết nối máy chủ!";
    throw new Error(errorMessage, { cause: error });
  }
  */

  // ---------------------------------------------------------
  // [PHẦN 2: CODE GIẢ LẬP] (Xóa toàn bộ phần này khi nối Backend)
  // ---------------------------------------------------------
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Giả lập check: Nếu email trùng thì báo lỗi giống C#
      if (userData.email === "test@gmail.com") {
        reject(new Error("Email already registered"));
      } else {
        resolve({
          message: "Register successful. Please check your email to confirm your account."
        });
      }
    }, 1000);
  });
};

// ==========================================
// 3. HÀM QUÊN MẬT KHẨU (FORGOT PASSWORD)
// ==========================================
export const forgotPasswordApi = async (email) => {
  // ---------------------------------------------------------
  // [PHẦN 1: CODE THẬT] (Bỏ comment phần này khi nối Backend C#)
  // ---------------------------------------------------------
  /*
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
  */

  // ---------------------------------------------------------
  // [PHẦN 2: CODE GIẢ LẬP] (Xóa toàn bộ phần này khi nối Backend)
  // ---------------------------------------------------------
  return new Promise((resolve) => {
    setTimeout(() => {
      // Dùng biến email in ra console để ESLint hết báo lỗi "never used"
      console.log("Đã giả lập gửi yêu cầu khôi phục cho email:", email);
      resolve({
        message: "If the email exists, a password reset link has been sent."
      });
    }, 1000);
  });
};
export const resetPasswordApi = async (email, token, newPassword) => {
  // ---------------------------------------------------------
  // [PHẦN 1: CODE THẬT] (Bỏ comment phần này khi nối Backend C#)
  // ---------------------------------------------------------
  /*
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
  */

  // ---------------------------------------------------------
  // [PHẦN 2: CODE GIẢ LẬP] (Xóa toàn bộ phần này khi nối Backend)
  // ---------------------------------------------------------
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In ra console để theo dõi luồng dữ liệu VÀ giải quyết lỗi ESLint "no-unused-vars"
      console.log("Mock API - Yêu cầu đổi mật khẩu cho email:", email);
      console.log("Mock API - Mật khẩu mới nhận được:", newPassword);

      // Giả lập: Nếu không có token từ URL thì báo lỗi
      if (!token) {
        reject(new Error("Đường dẫn không hợp lệ hoặc đã hết hạn."));
      } else {
        resolve({
          message: "Đổi mật khẩu thành công! Đang chuyển hướng..."
        });
      }
    }, 1000);
  });
};