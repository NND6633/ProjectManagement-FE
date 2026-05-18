const FeatureDetail = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
      
      {/* Cột Nội dung (Bên trái) */}
      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
          AI Task Optimization
        </h2>
        <p className="text-slate-500 text-lg mb-8 leading-relaxed">
          Stop guessing who is available. Our AI analyzes current workloads, past
          completion times, and individual skill sets to suggest the perfect
          assignee for every task, keeping your team balanced and productive.
        </p>
        
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-slate-700 font-semibold">
            <svg className="w-6 h-6 text-[#5b61f4] bg-indigo-50 rounded-full p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
            Smart assignment suggestions
          </li>
          <li className="flex items-center gap-3 text-slate-700 font-semibold">
            <svg className="w-6 h-6 text-[#5b61f4] bg-indigo-50 rounded-full p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
            Workload balancing
          </li>
        </ul>
      </div>

      {/* Cột Hình ảnh (Bên phải) */}
      <div className="flex-1 w-full">
        <img 
          src="https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop" 
          alt="AI Task Optimization" 
          className="w-full rounded-3xl shadow-xl border border-slate-100"
        />
      </div>

    </section>
  );
};

export default FeatureDetail;