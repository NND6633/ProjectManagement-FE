import { useNavigate } from 'react-router-dom';

const AuthHeader = ({ title, subtitle, showBack = false }) => {
  const navigate = useNavigate();

  return (
    <div className="text-center relative mb-8 mt-4">
      {/* Nút Back (Chỉ hiển thị nếu showBack = true) */}
      {showBack && (
        <button 
          onClick={() => navigate('/login')}
          className="absolute -left-2 top-0 p-2 text-slate-400 hover:text-slate-700 transition-colors"
          title="Quay lại trang Đăng nhập"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      )}

      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#5b61f4"/>
            <path d="M12 28V12H20C23.3137 12 26 14.6863 26 18C26 21.3137 23.3137 24 20 24H16V28H12ZM16 20H20C21.1046 20 22 19.1046 22 18C22 16.8954 21.1046 16 20 16H16V20Z" fill="white"/>
            <path d="M22 22L28 28" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <span className="text-2xl font-bold text-slate-800 tracking-tight">ProManage</span>
      </div>
      
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      <p className="text-slate-500 text-sm mt-1">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;