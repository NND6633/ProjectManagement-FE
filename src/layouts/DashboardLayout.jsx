import { Outlet, Link, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  // 1. Lấy thông tin đường dẫn (URL) hiện tại
  const location = useLocation();

  // 2. Hàm hỗ trợ để kiểm tra xem menu nào đang được chọn
  const checkIsActive = (path) => {
    if (path === '/') {
      // Dành riêng cho trang chủ (Dashboard)
      return location.pathname === '/';
    }
    // Dành cho các trang khác (Teams, Projects...)
    return location.pathname.includes(path);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-transparent">
          <div className="text-[#5b61f4] font-bold text-xl flex items-center gap-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z"/>
            </svg>
            ProManage
          </div>
        </div>

        {/* Nút New Project */}
        <div className="px-4 mt-6 mb-4">
          <button className="w-full bg-[#5b61f4] hover:bg-indigo-600 text-white rounded-lg py-2.5 flex items-center justify-center gap-2 font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </button>
        </div>

        {/* Menu Navigation */}
        <nav className="flex-1 px-3 space-y-1 mt-4">
          
          {/* Menu Dashboard */}
          <Link 
            to="/" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
              checkIsActive('/') 
                ? 'bg-indigo-50 text-[#5b61f4]' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </Link>

          {/* Menu Teams */}
          <Link 
            to="/teams" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
              checkIsActive('/teams') 
                ? 'bg-indigo-50 text-[#5b61f4]' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            Teams
          </Link>

          {/* Menu Projects */}
          <Link 
            to="/projects" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
              checkIsActive('/projects') 
                ? 'bg-indigo-50 text-[#5b61f4]' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
            Projects
          </Link>

          {/* Menu AI Analytics */}
          <Link 
            to="/analytics" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
              checkIsActive('/analytics') 
                ? 'bg-indigo-50 text-[#5b61f4]' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
            AI Analytics
          </Link>

        </nav>

        {/* Footer Sidebar */}
        <div className="p-4 border-t border-slate-200 space-y-1">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full text-left text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Settings
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white flex items-center justify-between px-8">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search projects, tasks..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5b61f4] focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-slate-400 hover:text-slate-600 relative">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="https://i.pravatar.cc/150?img=11" alt="User avatar" className="w-8 h-8 rounded-full" />
              <span className="font-medium text-sm">Leader John</span>
              <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </header>

        {/* Nội dung trang thay đổi ở đây */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#fcfcfd]">
          <Outlet /> 
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;