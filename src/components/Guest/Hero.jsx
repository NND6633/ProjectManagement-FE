import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center text-center pt-20 pb-10 px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
        Smart Project Management <br />
        <span className="text-[#5b61f4]">Powered by AI</span>
      </h1>
      
      <p className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
        Reduce cognitive load and bring organized tranquility to your complex
        workflows. ProManage anticipates your needs, so you can focus on what matters.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <button className="flex items-center justify-center gap-2 bg-[#5b61f4] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Download Mobile App
        </button>
        
        {/* Nút Try Web App: Chuyển hướng sang Login */}
        <button 
          onClick={() => navigate('/login')} 
          className="flex items-center justify-center gap-2 bg-slate-100 text-slate-800 border border-slate-200 px-8 py-3.5 rounded-xl font-bold hover:bg-slate-200 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Try Web App
        </button>
      </div>

      {/* Ảnh Dashboard Demo */}
      <div className="mt-20 w-full max-w-6xl mx-auto px-4">
        {/* Bạn có thể thay src bằng đường dẫn ảnh thực tế của bạn */}
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
          alt="ProManage Dashboard" 
          className="w-full h-auto rounded-2xl shadow-2xl border border-slate-200"
        />
      </div>
    </section>
  );
};

export default Hero;