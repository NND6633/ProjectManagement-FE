import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { loginApi } from '../services/authService';
import Input from '../components/Login/Input';
import Button from '../components/Login/Button';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

 const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Gọi qua service, truyền email và password
      const response = await loginApi(email, password);
      
      // 1. Lưu token "xịn" vừa lấy được vào LocalStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('refreshToken', response.refreshToken); 
      // 2. Vì API login chưa trả về user profile, tạm thời lưu email định danh
      localStorage.setItem('user', JSON.stringify({ email: email }));
      
      // 3. Chuyển hướng người dùng vào trang chủ/Dashboard
      navigate('/'); 
    } catch (err) {
      // In ra câu thông báo lỗi đã được chuẩn hóa bên authService
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Nền ngoài cùng màu xám/tím cực nhạt giống bản thiết kế
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fc] p-4 font-sans">
      
      {/* Box trắng chứa form */}
      <div className="max-w-[420px] w-full bg-white rounded-2xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] p-8 sm:p-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            {/* Logo ProManage chuẩn theo ảnh */}
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5 12.5C14.5 11.3954 15.3954 10.5 16.5 10.5H23.5C27.6421 10.5 31 13.8579 31 18C31 22.1421 27.6421 25.5 23.5 25.5H18.5V30.5C18.5 31.6046 17.6046 32.5 16.5 32.5C15.3954 32.5 14.5 31.6046 14.5 30.5V12.5Z" fill="#5b61f4"/>
              <path d="M12 16L18 22L28 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-bold text-slate-800">ProManage</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 mt-1.5 text-sm">Please enter your details to sign in.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="name@company.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          <div className="flex items-center justify-between text-sm pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-500">
              <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#5b61f4] focus:ring-[#5b61f4]" />
              Remember me
            </label>
            
            {/* Đã thay đổi thẻ <a> thành <Link> */}
            <Link to="/forgot-password" className="font-medium text-[#5b61f4] hover:text-indigo-700">
              Forgot Password?
            </Link>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <div className="flex flex-col gap-3 pt-2">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </Button>

            <Button type="button" variant="google">
              Continue with Google
            </Button>
          </div>

        </form>

        <p className="text-center text-slate-500 mt-8 text-sm">
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={() => navigate('/signup')} 
            className="text-[#5b61f4] font-medium hover:underline bg-transparent border-none p-0 cursor-pointer"
          >
            Signup
          </button>
        </p>

      </div>
    </div>
  );
};

export default Login;