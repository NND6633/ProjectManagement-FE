import { useState, useEffect } from 'react';
import { getAllProjectsApi } from '../services/projectService'; // Import service gọi API
import { useNavigate } from 'react-router-dom';

const Projects = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  
  // Các state để quản lý dữ liệu từ API
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API lấy dữ liệu ngay khi component được render lần đầu
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true); // Bật trạng thái loading
        const data = await getAllProjectsApi(); // Gọi API (hiện đang dùng mock)
        setProjects(data); // Lưu dữ liệu vào state
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Tắt trạng thái loading
      }
    };

    fetchProjects();
  }, []); // Mảng rỗng [] giúp useEffect chỉ chạy 1 lần duy nhất

  // Lọc dữ liệu theo tab
  const filteredProjects = projects.filter(project => {
    if (activeTab === 'All') return true;
    return project.status === activeTab;
  });

  // Hàm hỗ trợ: Render màu và icon tự động cho đẹp mắt (vì API không trả về màu)
  const getProjectStyle = (index) => {
    const styles = [
      {
        bg: 'bg-indigo-50',
        text: 'text-[#5b61f4]',
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4 10h16M10 20V10" /></svg>
      },
      {
        bg: 'bg-emerald-50',
        text: 'text-emerald-500',
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
      },
      {
        bg: 'bg-orange-50',
        text: 'text-orange-500',
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
      },
      {
        bg: 'bg-purple-50',
        text: 'text-purple-500',
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
      }
    ];
    return styles[index % styles.length]; // Lặp lại style nếu có quá nhiều dự án
  };

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* --- PHẦN HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projects</h1>
          <p className="text-slate-500 mt-1">Manage and track all your team's initiatives.</p>
        </div>
        <button className="bg-[#5b61f4] hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </button>
      </div>

      {/* --- PHẦN TABS --- */}
      <div className="flex gap-6 border-b border-slate-200 mb-6">
        {['All', 'Active', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 font-medium text-sm transition-colors relative ${
              activeTab === tab ? 'text-[#5b61f4]' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5b61f4] rounded-t-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* --- PHẦN NỘI DUNG (TABLE) --- */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden min-h-[300px]">
        {isLoading ? (
          // Khung Loading
          <div className="flex items-center justify-center h-64 text-slate-500">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#5b61f4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading projects...
          </div>
        ) : error ? (
          // Khung Báo Lỗi
          <div className="flex items-center justify-center h-64 text-red-500 font-medium">
            {error}
          </div>
        ) : filteredProjects.length === 0 ? (
          // Khung Trống (Không có dự án nào)
          <div className="flex items-center justify-center h-64 text-slate-500">
            No projects found.
          </div>
        ) : (
          // Bảng Danh Sách Dự Án
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Name</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned Team</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Progress</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Deadline</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProjects.map((project, index) => {
                    // Lấy màu sắc và icon cho project này
                    const style = getProjectStyle(index);

                    return (
                      <tr key={project.id} 
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style.bg} ${style.text}`}>
                              {style.icon}
                            </div>
                            <span className="font-semibold text-slate-900">{project.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600">{project.team}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${
                            project.status === 'Active' 
                              ? 'bg-indigo-50 text-[#5b61f4]' 
                              : 'bg-emerald-50 text-emerald-600'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${project.status === 'Completed' ? 'bg-emerald-500' : 'bg-[#5b61f4]'}`}
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs font-medium text-slate-600">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600">{project.deadline}</td>
                        <td className="py-4 px-6 text-right">
                          <button className="text-slate-400 hover:text-[#5b61f4] transition-colors p-1 rounded-md hover:bg-indigo-50">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* --- PHÂN TRANG --- */}
            <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-900">1</span> to <span className="font-medium text-slate-900">{filteredProjects.length}</span> of <span className="font-medium text-slate-900">{projects.length}</span> entries
              </p>
              <div className="flex gap-1">
                <button className="px-3 py-1.5 text-sm font-medium text-slate-400 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
                <button className="px-3 py-1.5 text-sm font-medium text-white bg-[#5b61f4] rounded-lg">1</button>
                <button className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Projects;