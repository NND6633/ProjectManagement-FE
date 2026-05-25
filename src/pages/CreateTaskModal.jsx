import { useState } from 'react';

const CreateTaskModal = ({ isOpen, onClose }) => {
  // 1. Khởi tạo state để lưu dữ liệu form
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');

  // 2. Khởi tạo state để báo lỗi (validate)
  const [error, setError] = useState('');

  // Nếu modal không mở thì không render gì cả
  if (!isOpen) return null;

  // 3. Hàm xử lý khi bấm nút "Save Task"
  const handleSave = () => {
    // Validate: Kiểm tra xem Title có trống không (dùng trim() để loại bỏ dấu cách thừa)
    if (!title.trim()) {
      setError('Vui lòng nhập Task Title!'); // Set thông báo lỗi
      return; // Cắt ngang hàm, không thực hiện lưu
    }

    // Nếu hợp lệ, xóa lỗi cũ (nếu có)
    setError('');

    // Gom dữ liệu lại (Tại đây bạn có thể gọi API hoặc truyền dữ liệu lên component cha)
    const newTaskData = {
      title,
      deadline,
      description
    };
    
    // Tạm thời log ra console để bạn thấy dữ liệu hoạt động
    console.log("Đã lưu Task mới:", newTaskData);

    // Xóa form cho lần mở sau
    resetForm();

    // Đóng Modal
    onClose();
  };

  // 4. Hàm hỗ trợ đóng modal kèm theo việc xóa sạch dữ liệu/lỗi cũ
  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setDeadline('');
    setDescription('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden transform transition-all">
        
        {/* --- HEADER --- */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Create Main Task</h2>
          <button 
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* --- BODY (FORM FIELDS) --- */}
        <div className="p-6 space-y-5">
          
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Q3 Marketing Campaign Setup" 
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-colors placeholder:text-slate-400 ${
                error 
                  ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' // Đổi màu viền đỏ nếu có lỗi
                  : 'border-slate-200 focus:ring-indigo-500/20 focus:border-[#5b61f4]'
              }`} 
            />
            {/* Hiển thị dòng chữ báo lỗi */}
            {error && <p className="mt-1.5 text-sm text-red-500 font-medium">{error}</p>}
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Deadline</label>
            <div className="relative">
              <input 
                type="date" 
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#5b61f4] transition-colors bg-white" 
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">Description</label>
            <div className="border border-slate-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-[#5b61f4] transition-colors">
              
              {/* Rich Text Toolbar (Chỉ UI) */}
              <div className="flex items-center gap-1 p-2 border-b border-slate-200 bg-slate-50/50 text-slate-600">
                <button type="button" className="p-1.5 hover:bg-slate-200 rounded font-bold text-sm w-8 h-8 flex items-center justify-center">B</button>
                <button type="button" className="p-1.5 hover:bg-slate-200 rounded italic font-serif text-sm w-8 h-8 flex items-center justify-center">I</button>
                <div className="w-px h-4 bg-slate-300 mx-1"></div>
                <button type="button" className="p-1.5 hover:bg-slate-200 rounded w-8 h-8 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <button type="button" className="p-1.5 hover:bg-slate-200 rounded w-8 h-8 flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </button>
              </div>
              
              {/* Textarea */}
              <textarea 
                rows="4" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide detailed notes, objectives, and acceptance criteria here..." 
                className="w-full p-4 focus:outline-none resize-none text-sm placeholder:text-slate-400"
              ></textarea>
            </div>
          </div>

        </div>

        {/* --- FOOTER (BUTTONS) --- */}
        <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50/50 border-t border-slate-100">
          <button 
            onClick={handleClose} 
            className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          
          {/* Nút Save Task đã được gắn sự kiện onClick={handleSave} */}
          <button 
            onClick={handleSave}
            className="px-5 py-2.5 text-sm font-medium text-white bg-[#5b61f4] rounded-lg hover:bg-indigo-600 transition-colors shadow-sm"
          >
            Save Task
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateTaskModal;