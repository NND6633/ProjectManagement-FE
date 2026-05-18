import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between py-5 px-6 md:px-12 bg-white sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="8" fill="#5b61f4"/>
            <path d="M12 28V12H20C23.3137 12 26 14.6863 26 18C26 21.3137 23.3137 24 20 24H16V28H12ZM16 20H20C21.1046 20 22 19.1046 22 18C22 16.8954 21.1046 16 20 16H16V20Z" fill="white"/>
            <path d="M22 22L28 28" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <span className="text-xl font-bold text-slate-800 tracking-tight">ProManage</span>
      </div>

      {/* Menu Links */}
      <div className="hidden md:flex items-center gap-8 text-slate-600 font-medium">
        <a href="#features" className="hover:text-[#5b61f4] transition-colors">Features</a>
        <a href="#pricing" className="hover:text-[#5b61f4] transition-colors">Pricing</a>
        <a href="#faq" className="hover:text-[#5b61f4] transition-colors">FAQ</a>
      </div>

      {/* Buttons: Navigate tới trang Login */}
      <div className="flex items-center gap-6">
        <button 
          onClick={() => navigate('/login')} 
          className="text-slate-800 font-semibold hover:text-[#5b61f4] transition-colors"
        >
          Login
        </button>
        <button 
          onClick={() => navigate('/login')} 
          className="bg-[#5b61f4] text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition-all transform active:scale-95 shadow-md shadow-indigo-200"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navbar;