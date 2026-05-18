import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconInput from '../components/ForgetPassword/IconInput';
import AuthButton from '../components/ForgetPassword/AuthButton';

// Thay vì import api và emailjs, chúng ta import service đã viết sẵn
import { forgotPasswordApi } from '../services/authService'; 

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError(''); 

    try {
      // 1. Gọi hàm forgotPasswordApi từ service
      // Hàm này (bản C# thật hoặc Mock) sẽ lo việc kiểm tra email và gửi link
      const response = await forgotPasswordApi(email);
      
      // 2. Hiển thị thông báo thành công từ server (hoặc file mock)
      setMessage(response.message || "Đường link khôi phục mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư của bạn.");
      
      // Lưu ý: Không cần chuyển hướng (navigate) sang trang nhập OTP nữa.
      // Người dùng sẽ tự mở email, click vào link và được dẫn thẳng đến trang /reset-password.
      
    } catch (err) {
      setError(err.message || "Có lỗi xảy ra khi gửi email.");
    } finally {
      setLoading(false);
    }
  };

  // Icon Lá thư 
  const MailIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );

  // Icon Mũi tên quay lại
  const ArrowLeftIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="text-[#5b61f4] font-bold text-2xl flex items-center gap-2">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/>
                </svg>
                ProManage
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Reset Password</h2>
            <p className="text-sm text-slate-500">Enter your email to receive a reset link.</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <IconInput 
              label="Email Address" 
              type="email" 
              name="email" 
              placeholder="name@company.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              icon={MailIcon}
              required
            />

            {/* Thông báo lỗi */}
            {error && (
              <div className="text-red-700 bg-red-50 text-sm font-medium p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            {/* Thông báo gửi thành công */}
            {message && (
              <div className="text-emerald-700 bg-emerald-50 text-sm font-medium p-3 rounded-lg text-center">
                {message}
              </div>
            )}

            {/* Group Nút bấm */}
            <div className="flex flex-col gap-3 pt-2">
              <AuthButton type="submit" disabled={loading} variant="primary">
                {loading ? "Sending link..." : "Send Reset Link"}
              </AuthButton>
              
              <AuthButton 
                type="button" 
                onClick={() => navigate('/login')} 
                variant="secondary" 
                className="gap-2"
              >
                {ArrowLeftIcon}
                Back to Login
              </AuthButton>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;