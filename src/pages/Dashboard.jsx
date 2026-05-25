import { useState, useEffect } from 'react';
import { getDashboardData } from '../services/dashboardService';

const Dashboard = () => {
  const [data, setData] = useState({
    userProfile: null,
    stats: {
      totalProjects: 0,
      activeProjects: 0,
      completedProjects: 0,
      overdueTasks: 0
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const dashboardData = await getDashboardData();
        setData(dashboardData);
      } catch (err) {
        setError(err.message || 'Không thể lấy dữ liệu Dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-slate-500 animate-pulse">Đang tải dữ liệu Dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
        Lỗi: {error}
      </div>
    );
  }

  const profile = data.userProfile || {};
  const displayName = profile.fullName || profile.name || profile.email?.split('@')[0] || 'User';

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Good morning, {displayName}</h1>
      <p className="text-slate-500 mb-8">Here's what's happening with your projects today.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-500 font-medium">Total Projects</span>
            <div className="p-2 bg-indigo-50 rounded-lg text-[#5b61f4]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-900">{data.stats.totalProjects}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-500 font-medium">Active</span>
            <div className="p-2 bg-green-50 rounded-lg text-green-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-900">{data.stats.activeProjects}</div>
          <div className="text-sm text-slate-400 mt-2">In progress right now</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-500 font-medium">Completed</span>
            <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
          </div>
          <div className="text-4xl font-bold text-slate-900">{data.stats.completedProjects}</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <span className="text-slate-500 font-medium">Overdue</span>
            <div className="p-2 bg-red-50 rounded-lg text-red-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
          <div className="text-4xl font-bold text-red-600">{data.stats.overdueTasks}</div>
          <div className="text-sm text-red-500 mt-2 flex items-center gap-1">
             <span>→ Needs attention</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed Mock */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">Activity Feed</h2>
            <button className="text-[#5b61f4] text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
            <div className="flex gap-4">
              <img src="https://i.pravatar.cc/150?img=5" alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-slate-900 text-sm">
                  <span className="font-medium">Sarah Jenkins</span> completed task <span className="text-[#5b61f4] font-medium cursor-pointer">UI Component Library</span>
                </p>
                <span className="text-slate-400 text-xs">10 minutes ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Risk Analysis Mock */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-purple-500">✨</span>
            <h2 className="text-xl font-bold text-slate-900">AI Risk Analysis</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center justify-center">
            <div className="relative w-32 h-32 mb-6">
              <svg viewBox="0 0 36 36" className="w-full h-full text-red-500 transform -rotate-90">
                <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                <path strokeDasharray="82, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-slate-500 text-xs font-medium uppercase">Health</span>
                <span className="text-2xl font-bold text-[#5b61f4]">82%</span>
              </div>
            </div>
            <div className="w-full">
              <h3 className="font-bold text-slate-900 mb-3">High Risk Tasks</h3>
              <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <div>
                  <div className="text-red-700 font-medium text-sm">Database Migration</div>
                  <div className="text-red-500 text-xs mt-1">Resource constraints identified.</div>
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