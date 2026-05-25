import  { useState } from 'react';

const CreateProjectModal = ({ isOpen, onClose, onSuccess }) => {
  // State lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    name: '',
    teamId: '',
    startDate: '',
    deadline: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Nếu isOpen = false thì không render gì cả
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Tích hợp gọi API C# của bạn ở đây
      // Thay đổi 'YOUR_TOKEN' và URL cho phù hợp với dự án
      /*
      const response = await fetch('http://localhost:xxxx/api/v1/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_TOKEN` 
        },
        body: JSON.stringify({
          name: formData.name,
          teamId: formData.teamId 
          // Cập nhật thêm startDate và deadline nếu Backend CreateProjectDto có hỗ trợ
        })
      });

      if (!response.ok) throw new Error('Lỗi khi tạo dự án');
      */

      // Giả lập delay API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log("Dữ liệu gửi đi:", formData);
      onSuccess(); // Gọi callback để load lại danh sách data
      onClose();   // Đóng modal
    } catch (error) {
      console.error(error);
      alert("Đã có lỗi xảy ra!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Lớp phủ (Overlay) làm tối nền phía sau
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity">
      
      {/* Khung Modal */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Create New Project</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Project Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Project Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Q4 Marketing Campaign" 
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b61f4]/50 focus:border-[#5b61f4] transition-all text-slate-800 placeholder-slate-400"
              required
            />
          </div>

          {/* Select Team */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Team</label>
            <div className="relative">
              <select 
                name="teamId"
                value={formData.teamId}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b61f4]/50 focus:border-[#5b61f4] transition-all bg-white text-slate-800 appearance-none cursor-pointer"
                required
              >
                <option value="" disabled>Select a team...</option>
                {/* Ở đây bạn sẽ map danh sách Team lấy từ API. Dưới đây là data mẫu */}
                <option value="team-1">Frontend Development Team</option>
                <option value="team-2">Backend Development Team</option>
                <option value="team-3">Marketing Team</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Start Date & Deadline */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Date</label>
              <input 
                type="date" 
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b61f4]/50 focus:border-[#5b61f4] transition-all text-slate-800"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Deadline</label>
              <input 
                type="date" 
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#5b61f4]/50 focus:border-[#5b61f4] transition-all text-slate-800"
                required
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 mt-2 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-transparent rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#5b61f4] hover:bg-indigo-600 rounded-lg transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
            >
              {isLoading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;