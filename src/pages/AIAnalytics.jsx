
const AIAnalytics = () => {
  // Dữ liệu mẫu (có thể thay bằng API thật sau này)
  const aiRiskTasks = [
    { id: 1, name: 'API Integration', assignee: 'Sarah Chen', avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=random', deadline: 'Oct 24, 2023', delay: '+5 days', confidence: '92%', risk: 'high' },
    { id: 2, name: 'Frontend Refactor', assignee: 'Michael Torres', avatar: 'https://ui-avatars.com/api/?name=Michael+Torres&background=random', deadline: 'Oct 26, 2023', delay: '+2 days', confidence: '88%', risk: 'medium' },
    { id: 3, name: 'Database Migration', assignee: 'Emily Davis', avatar: 'https://ui-avatars.com/api/?name=Emily+Davis&background=random', deadline: 'Oct 28, 2023', delay: '+4 days', confidence: '85%', risk: 'high' },
  ];

  return (
    <div className="space-y-6 animation-fade-in">
      {/* 1. Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">AI Deadline Risk Prediction</h2>
          <p className="text-slate-500 mt-1">Predictive analysis of task completion probabilities.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-lg font-medium transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export Report
        </button>
      </div>

      {/* 2. Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">High Risk</span>
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
          </div>
          <span className="text-4xl font-bold text-red-500">3</span>
          <p className="text-sm text-slate-500 mt-2">Tasks require immediate attention</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Medium Risk</span>
            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <span className="text-4xl font-bold text-amber-500">12</span>
          <p className="text-sm text-slate-500 mt-2">Tasks showing potential delays</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Low Risk</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <span className="text-4xl font-bold text-emerald-500">45</span>
          <p className="text-sm text-slate-500 mt-2">Tasks tracking to completion</p>
        </div>
      </div>

      {/* 3. Bảng dữ liệu */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h3 className="text-lg font-bold text-slate-900">At-Risk Tasks</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Task Name</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assignee</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Original Deadline</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Predicted Delay</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Confidence Score</th>
                <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {aiRiskTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900">{task.name}</td>
                  <td className="py-4 px-6 flex items-center gap-3">
                    <img src={task.avatar} alt={task.assignee} className="w-8 h-8 rounded-full bg-slate-200" />
                    <span className="text-sm text-slate-700">{task.assignee}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{task.deadline}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-medium ${
                      task.risk === 'high' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {task.delay}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{task.confidence}</td>
                  <td className="py-4 px-6">
                    <button className="text-[#5b61f4] hover:text-indigo-700 font-medium text-sm transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AIAnalytics;