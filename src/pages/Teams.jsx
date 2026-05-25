import { useState, useEffect } from 'react';
import { getAllTeamsApi } from '../services/teamService'; // Import service gọi API nhóm

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gọi API lấy dữ liệu ngay khi component render
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const data = await getAllTeamsApi();
        setTeams(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Hàm hỗ trợ render đúng màu sắc và SVG Icon góc phải card theo bản thiết kế Figma
  const getTeamBadgeStyle = (type) => {
    const styles = {
      design: {
        bg: 'bg-purple-50', text: 'text-purple-500',
        icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
      },
      engineering: {
        bg: 'bg-indigo-50', text: 'text-[#5b61f4]',
        icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
      },
      marketing: {
        bg: 'bg-blue-50', text: 'text-blue-500',
        icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
      },
      success: {
        bg: 'bg-indigo-50', text: 'text-[#5b61f4]',
        icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
      },
      data: {
        bg: 'bg-blue-50', text: 'text-blue-500',
        icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
      },
      sales: {
        bg: 'bg-indigo-50', text: 'text-[#5b61f4]',
        icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
      }
    };
    return styles[type] || styles.engineering;
  };

  return (
    <div className="max-w-6xl mx-auto">
      
      {/* --- PHẦN HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Teams</h1>
          <p className="text-slate-500 mt-1">Manage and organize your organization's groups.</p>
        </div>
        <button className="bg-[#5b61f4] hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create Team
        </button>
      </div>

      {/* --- HIỂN THỊ CÁC TRẠNG THÁI (LOADING / ERROR / GRID DATA) --- */}
      {isLoading ? (
        // Khung trạng thái loading (Đồng bộ style với file Projects của bạn)
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center h-64 text-slate-500">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#5b61f4]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading teams...
        </div>
      ) : error ? (
        // Khung hiển thị lỗi
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center h-64 text-red-500 font-medium">
          {error}
        </div>
      ) : teams.length === 0 ? (
        // Trạng thái mảng rỗng không có dữ liệu
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center h-64 text-slate-500">
          No teams found.
        </div>
      ) : (
        // ĐỔ DỮ LIỆU RA LƯỚI CARD GRID (Chuẩn Figma)
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => {
            const badgeStyle = getTeamBadgeStyle(team.type);

            return (
              <div 
                key={team.id} 
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  {/* Dòng tiêu đề card + Icon góc phải */}
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{team.name}</h3>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${badgeStyle.bg} ${badgeStyle.text}`}>
                      {badgeStyle.icon}
                    </div>
                  </div>

                  {/* Thông tin Leader */}
                  <div className="flex items-center gap-3 mb-6">
                    <img 
                      src={team.leaderAvatar} 
                      alt={team.leaderName} 
                      className="w-10 h-10 rounded-full object-cover bg-slate-100"
                    />
                    <div>
                      <p className="text-sm font-semibold text-slate-800 leading-tight">{team.leaderName}</p>
                      <p className="text-xs text-slate-400 mt-0.5">Team Lead</p>
                    </div>
                  </div>

                  {/* Khu vực thông số Members & Active Projects */}
                  <div className="flex gap-10 mb-6">
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-slate-900">{team.memberCount}</span>
                      <span className="text-xs font-medium text-slate-400 mt-0.5">Members</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-slate-900">{team.activeProjects}</span>
                      <span className="text-xs font-medium text-slate-400 mt-0.5">Active Projects</span>
                    </div>
                  </div>
                </div>

                {/* Nút View Details ở đáy Card */}
                <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium py-2.5 rounded-xl text-sm transition-colors mt-auto">
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Teams;