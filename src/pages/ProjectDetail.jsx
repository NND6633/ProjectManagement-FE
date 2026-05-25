import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProjectStatsApi } from '../services/projectService';
import KanbanBoard from './KanbanBoard'; 
// Bước 1: Import component AI Analytics (đảm bảo đường dẫn chính xác)
import AIAnalytics from './AIAnalytics'; 

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await getProjectStatsApi(id); 
        
        setStats(response.statsData); 
        setError(null);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchStats();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-[#5b61f4]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="font-medium text-slate-500">Loading project data...</span>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-red-500 p-6 text-center border border-red-100 bg-red-50 rounded-2xl max-w-md mx-auto mt-10">
        <p className="font-semibold">Error Loading Project</p>
        <p className="text-sm opacity-80 mt-1">{error}</p>
        <button onClick={() => navigate('/projects')} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium">
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-10">
      {/* Nút Quay Lại */}
      <button 
        onClick={() => navigate('/projects')} 
        className="mb-6 flex items-center text-slate-500 hover:text-[#5b61f4] transition-colors font-medium text-sm gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Projects
      </button>

      {/* Tên Dự Án */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">{stats.projectName}</h1>
      </div>

      {/* Bước 2: Thêm 'AI Analytics' vào danh sách hệ thống Tabs điều hướng */}
      <div className="flex gap-6 border-b border-slate-200 mb-8">
        {['Overview', 'Kanban Board', 'Documents', 'AI Analytics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-medium text-sm transition-colors relative flex items-center gap-2 ${
              activeTab === tab ? 'text-[#5b61f4]' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {/* Tùy chọn: Thêm icon sấm sét cho tab AI Analytics để nổi bật */}
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5b61f4] rounded-t-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Nội dung Tab Overview */}
      {activeTab === 'Overview' && (
        <>
          {/* Giữ nguyên toàn bộ nội dung Overview cũ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1: Completed Tasks */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
              <h3 className="text-slate-400 font-medium text-sm">Completed Tasks</h3>
              <div className="flex items-end justify-between mt-4">
                <span className="text-4xl font-bold text-slate-900">{stats.completedTasks}</span>
                <span className="bg-emerald-50 text-emerald-600 text-xs font-semibold px-2 py-1 rounded-md mb-1">
                  ↑ {Math.round(stats.progress)}%
                </span>
              </div>
            </div>

            {/* Card 2: Total Tasks */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
              <h3 className="text-slate-400 font-medium text-sm">Total Tasks</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold text-slate-900">{stats.totalSubtasks}</span>
                <p className="text-slate-400 text-xs mt-2">{stats.inProgressTasks} tasks are currently in progress</p>
              </div>
            </div>

            {/* Card 3: Overdue Tasks */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
              <h3 className="text-slate-400 font-medium text-sm">Overdue Tasks</h3>
              <div className="mt-4">
                <span className={`text-4xl font-bold ${stats.overdueTasks > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                  {stats.overdueTasks}
                </span>
                <p className="text-slate-400 text-xs mt-2">
                  {stats.overdueTasks > 0 ? "Requires immediate team attention" : "All deadlines are on track"}
                </p>
              </div>
            </div>
          </div>

          {/* Biểu đồ Xu Hướng Tiến Độ Dự Án */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-8">
               <div>
                 <h3 className="text-lg font-bold text-slate-900">Task Completion Trend</h3>
                 <p className="text-xs text-slate-400 mt-0.5">Visualizing the flow of completed subtasks this week</p>
               </div>
               <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-50">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                 </svg>
               </button>
             </div>
             
             {/* Khung vẽ biểu đồ giả lập bằng SVG */}
             <div className="h-64 w-full relative border-l border-b border-slate-100 flex items-end px-2">
                <div className="absolute left-[-35px] top-0 h-full flex flex-col justify-between text-[11px] text-slate-400 py-1 select-none">
                   <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
                </div>
                <div className="absolute bottom-[-25px] w-full flex justify-between text-[11px] text-slate-400 px-4 select-none">
                   <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>

                <svg className="absolute bottom-0 left-0 w-full h-4/5" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M 0 90 Q 15 75 30 50 T 60 40 T 85 20 T 100 15" fill="none" stroke="#5b61f4" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 0 90 Q 15 75 30 50 T 60 40 T 85 20 T 100 15 L 100 100 L 0 100 Z" fill="url(#chart-gradient)" />
                  <defs>
                    <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#5b61f4" stopOpacity="0.25"/>
                      <stop offset="100%" stopColor="#5b61f4" stopOpacity="0.0"/>
                    </linearGradient>
                  </defs>
                </svg>
             </div>
          </div>
        </>
      )}

      {/* Tab Kanban Board */}
      {activeTab === 'Kanban Board' && (
        <div className="mt-8">
          <KanbanBoard />
        </div>
      )}

      {/* Tab Documents */}
      {activeTab === 'Documents' && (
        <div className="bg-slate-50 border border-dashed border-slate-200 p-16 rounded-2xl flex flex-col items-center justify-center text-center mt-8">
          <h4 className="text-slate-800 font-semibold mb-1">Documents tab is under construction</h4>
        </div>
      )}

      {/* Bước 3: Tab AI Analytics mới */}
      {activeTab === 'AI Analytics' && (
        <div className="mt-8">
          <AIAnalytics />
        </div>
      )}

    </div>
  );
};

export default ProjectDetail;