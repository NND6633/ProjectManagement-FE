import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import IconInput from '../components/ForgetPassword/IconInput';
import AuthButton from '../components/ForgetPassword/AuthButton';
import AuthHeader from '../components/Signup/AuthHeader';
import { resetPasswordApi } from '../services/authService'; // Import hàm gọi API

const ResetPassword = () => {
  const navigate = useNavigate();
  // Sử dụng useSearchParams để lấy email và token từ URL (thanh địa chỉ)
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Nếu URL không có email hoặc token, đẩy về trang forgot-password
    if (!email || !token) {
      navigate('/forgot-password');
    }
  }, [navigate, email, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      return setError('Mật khẩu phải có ít nhất 6 ký tự.');
    }

    // Kiểm tra khớp mật khẩu
    if (password !== confirmPassword) {
      return setError('Mật khẩu xác nhận không khớp!');
    }

    setLoading(true);

    try {
      // Gọi qua service, truyền đủ 3 tham số
      const response = await resetPasswordApi(email, token, password);

      setSuccess(response.message || 'Đổi mật khẩu thành công! Đang chuyển về đăng nhập...');
      
      // Chuyển về trang Login sau 2 giây
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.message || 'Cập nhật mật khẩu thất bại. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  // Icon Ổ khóa
  const LockIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100">
          
          <AuthHeader title="Tạo mật khẩu mới">
            Vui lòng nhập mật khẩu mới cho tài khoản <br/>
            <span className="font-medium text-slate-900">{email}</span>
          </AuthHeader>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            <IconInput 
              label="Mật khẩu mới" 
              type="password" 
              name="password" 
              placeholder="Nhập mật khẩu mới" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              icon={LockIcon}
              required
            />

            <IconInput 
              label="Xác nhận mật khẩu" 
              type="password" 
              name="confirmPassword" 
              placeholder="Nhập lại mật khẩu mới" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={LockIcon}
              required
            />

            {error && (
              <div className="text-red-700 bg-red-50 text-sm font-medium p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-700 bg-green-50 text-sm font-medium p-3 rounded-lg text-center">
                {success}
              </div>
            )}

            <div className="pt-2">
              <AuthButton type="submit" disabled={loading} variant="primary">
                {loading ? "Đang cập nhật..." : "Xác nhận đổi mật khẩu"}
              </AuthButton>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;