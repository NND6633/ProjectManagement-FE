const Dashboard = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Dashboard */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Good morning, John</h1>
        <p className="text-slate-500 mt-1">Here's what's happening with your projects today.</p>
      </div>

      {/* 4 Thẻ Thống Kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card 1: Total Projects */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 font-medium text-sm">Total Projects</span>
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-[#5b61f4]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-900">24</h3>
            <p className="text-[#5b61f4] text-xs font-medium mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              +2 this week
            </p>
          </div>
        </div>

        {/* Card 2: Active */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 font-medium text-sm">Active</span>
            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-900">12</h3>
            <p className="text-slate-400 text-xs mt-1">In progress right now</p>
          </div>
        </div>

        {/* Card 3: Completed */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <span className="text-slate-500 font-medium text-sm">Completed</span>
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-900">8</h3>
            <p className="text-slate-400 text-xs mt-1">Past 30 days</p>
          </div>
        </div>

        {/* Card 4: Overdue */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 flex flex-col justify-between h-36 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-full -mr-10 -mt-10 blur-xl"></div>
          <div className="flex justify-between items-start relative z-10">
            <span className="text-slate-500 font-medium text-sm">Overdue</span>
            <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold text-red-600">4</h3>
            <p className="text-red-500 text-xs font-medium mt-1 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              Needs attention
            </p>
          </div>
        </div>
      </div>

      {/* Khối Grid Dưới: Activity Feed & AI Risk Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Activity Feed */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-900">Activity Feed</h2>
            <button className="text-[#5b61f4] text-sm font-medium hover:underline">View All</button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
            {/* Item 1 */}
            <div className="flex gap-4">
              <img src="https://i.pravatar.cc/150?img=5" alt="Sarah" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-slate-800 text-sm">
                  <span className="font-semibold">Sarah Jenkins</span> completed task <span className="font-medium text-[#5b61f4]">UI Component Library</span> in project <span className="font-medium">Design System V2</span>
                </p>
                <p className="text-slate-400 text-xs mt-1">10 minutes ago</p>
              </div>
            </div>
            <hr className="border-slate-100" />
            
            {/* Item 2 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-[#5b61f4] shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <div className="w-full">
                <p className="text-slate-800 text-sm mb-2">
                  <span className="font-semibold">Mike Ross</span> commented on <span className="font-medium text-[#5b61f4]">Backend API Integration</span>
                </p>
                <div className="bg-slate-50 rounded-lg p-3 text-slate-600 text-sm italic">
                  "I've pushed the latest endpoints to staging. Can we get a quick review on the auth flow?"
                </div>
                <p className="text-slate-400 text-xs mt-2">1 hour ago</p>
              </div>
            </div>
            <hr className="border-slate-100" />

            {/* Item 3 */}
            <div className="flex gap-4">
              <img src="https://i.pravatar.cc/150?img=12" alt="David" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-slate-800 text-sm">
                  <span className="font-semibold">David Chen</span> uploaded a new document <span className="font-medium text-[#5b61f4]">Q3 Strategy.pdf</span>
                </p>
                <p className="text-slate-400 text-xs mt-1">3 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Risk Analysis */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-6 h-6 text-[#5b61f4]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3l-1.5 4.5L13 9l4.5 1.5L19 15l1.5-4.5L25 9l-4.5-1.5zM8 5L5.5 12 0 14.5 5.5 17 8 24l2.5-7L16 14.5 10.5 12z"/></svg>
            <h2 className="text-xl font-bold text-slate-900">AI Risk Analysis</h2>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            
            {/* Health Circle Mockup (Tạm dùng CSS, sẽ đẹp hơn nếu dùng Chart.js) */}
            <div className="flex justify-center mb-6">
              <div className="relative w-40 h-40 flex items-center justify-center rounded-full border-[12px] border-red-600 border-r-slate-100 border-b-slate-100">
                <div className="text-center">
                  <p className="text-slate-500 font-medium text-sm">Health</p>
                  <p className="text-3xl font-bold text-[#5b61f4]">82%</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 text-xs font-medium text-slate-500 mb-8">
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div> On Track</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div> At Risk</span>
              <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-600"></div> High Risk</span>
            </div>

            <h3 className="font-bold text-slate-900 mb-3 text-lg">High Risk Tasks</h3>
            
            <div className="space-y-3">
              <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 flex gap-3">
                <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Database Migration</h4>
                  <p className="text-slate-500 text-xs mt-1">Resource constraints identified. Probability of delay: 85%.</p>
                </div>
              </div>

              <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 flex gap-3">
                <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Client Feedback Loop</h4>
                  <p className="text-slate-500 text-xs mt-1">Awaiting input for 4 days. Bottleneck forming.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;