import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectTasksApi } from '../services/projectService';
import CreateTaskModal from './CreateTaskModal';
// ==========================================
// COMPONENT CHÍNH: KANBAN BOARD
// =========================================
const KanbanBoard = () => {
  const { id: projectId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState({ pending: [], inProgress: [], completed: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const rawTasks = await getProjectTasksApi(projectId);

        const groupedTasks = {
          pending: rawTasks.filter(task => task.status === 'Pending' || task.status === 0),
          inProgress: rawTasks.filter(task => task.status === 'In Progress' || task.status === 1),
          completed: rawTasks.filter(task => task.status === 'Completed' || task.status === 2),
        };

        setTasks(groupedTasks);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (projectId) fetchTasks();
  }, [projectId]);

  if (isLoading) return <div className="p-8 text-center text-slate-500">Đang tải Kanban...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Lỗi: {error}</div>;

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* KHU VỰC TOOLBAR (Search, Filter, Create Task) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Filter tasks..." 
              className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#5b61f4] focus:ring-1 focus:ring-[#5b61f4] w-64"
            />
          </div>
          {/* Buttons */}
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
            Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
            Sort
          </button>
        </div>
        
        <button 
            onClick={() => setIsModalOpen(true)} // Mở modal khi click
            className="bg-[#5b61f4] hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium"
        >
            + Create Main Task
        </button>

        {/* Gọi Component Modal ra và truyền props */}
        <CreateTaskModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
        />
      </div>

      {/* KHU VỰC 3 CỘT KANBAN */}
      <div className="flex gap-6 items-start h-full pb-8">
        
        {/* CỘT 1: PENDING */}
        <div className="flex-1 bg-slate-50/50 rounded-2xl p-4 border border-slate-100 min-h-[500px]">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              <h3 className="font-semibold text-slate-700 text-lg">Pending</h3>
              <span className="bg-slate-200 text-slate-600 text-xs font-semibold px-2 py-0.5 rounded-full">{tasks.pending.length}</span>
            </div>
            <button className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg></button>
          </div>
          <div className="flex flex-col gap-3">
            {tasks.pending.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>

        {/* CỘT 2: IN PROGRESS */}
        <div className="flex-1 bg-slate-50/50 rounded-2xl p-4 border border-slate-100 min-h-[500px]">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5b61f4]"></span>
              <h3 className="font-semibold text-slate-700 text-lg">In Progress</h3>
              <span className="bg-[#5b61f4] text-white text-xs font-semibold px-2 py-0.5 rounded-full">{tasks.inProgress.length}</span>
            </div>
            <button className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg></button>
          </div>
          <div className="flex flex-col gap-3">
            {tasks.inProgress.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>

        {/* CỘT 3: COMPLETED */}
        <div className="flex-1 bg-slate-50/50 rounded-2xl p-4 border border-slate-100 min-h-[500px]">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h3 className="font-semibold text-slate-700 text-lg">Completed</h3>
              <span className="bg-emerald-100 text-emerald-600 text-xs font-semibold px-2 py-0.5 rounded-full">{tasks.completed.length}</span>
            </div>
            <button className="text-slate-400 hover:text-slate-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg></button>
          </div>
          <div className="flex flex-col gap-3">
            {tasks.completed.map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        </div>

      </div>
    </div>
  );
};

// ==========================================
// COMPONENT PHỤ: THẺ TASK CARD 
// ==========================================
const TaskCard = ({ task }) => {
  // Hàm tạo màu tag động dựa vào chữ
  const getTagStyle = (tag) => {
    const t = (tag || '').toUpperCase();
    if (t.includes('DESIGN')) return 'bg-blue-50 text-blue-600';
    if (t.includes('DEVELOPMENT') || t.includes('DEV')) return 'bg-purple-50 text-purple-600';
    if (t.includes('RESEARCH')) return 'bg-emerald-50 text-emerald-600';
    return 'bg-slate-100 text-slate-600';
  };

  const isCompleted = task.status === 'Completed' || task.status === 2;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-3">
      {/* Header Card (Tag & ID) */}
      <div className="flex justify-between items-center">
        <span className={`text-[10px] font-bold px-2 py-1 rounded md uppercase tracking-wide ${getTagStyle(task.tag)}`}>
          {task.tag || 'TASK'}
        </span>
        <span className="text-xs font-medium text-slate-400">{task.id}</span>
      </div>

      {/* Tên Task */}
      <h4 className={`text-[15px] font-semibold leading-snug ${isCompleted ? 'text-slate-400' : 'text-slate-800'}`}>
        {task.title}
      </h4>

      {/* Progress Bar (Chỉ hiện khi chưa Done) */}
      {!isCompleted && task.progress !== undefined && (
        <div className="mt-1">
          <div className="flex justify-between text-xs font-medium text-slate-500 mb-1.5">
            <span>Progress</span>
            <span>{task.progressText || `${task.progress}%`}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div 
              className={`h-1.5 rounded-full ${task.progress > 0 ? 'bg-[#5b61f4]' : 'bg-slate-300'}`} 
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Subtasks / Checklist (Hiển thị giống Figma nếu Backend trả về subtasks) */}
      {!isCompleted && task.subtasks && task.subtasks.length > 0 && (
        <div className="mt-2 flex flex-col gap-2 rounded-lg border border-slate-100 p-2.5">
          {task.subtasks.map((sub, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {sub.done ? (
                  <svg className="w-4 h-4 text-[#5b61f4]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300"></div>
                )}
                <span className={`text-[13px] ${sub.done ? 'text-slate-400' : 'text-slate-600'}`}>{sub.text}</span>
              </div>
              {sub.isRisk && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded border border-orange-100">HIGH RISK</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer (Date & Assignee hoặc Nút Done) */}
      <div className="flex items-center justify-between mt-1">
        {isCompleted ? (
           <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-semibold bg-emerald-50 px-2 py-1 rounded-md">
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
             Done
           </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <svg className={`w-4 h-4 ${task.dueDate?.includes('Tomorrow') ? 'text-red-400' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className={task.dueDate?.includes('Tomorrow') ? 'text-red-500' : 'text-slate-500'}>{task.dueDate || 'No date'}</span>
          </div>
        )}
        
        {/* Mock Avatar */}
        <div className="flex -space-x-1">
           <img src={`https://ui-avatars.com/api/?name=${task.id}&background=random`} alt="avatar" className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;