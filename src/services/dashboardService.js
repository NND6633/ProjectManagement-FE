// src/services/dashboardService.js
import api from './api'; 

// Hàm mới: Chỉ dùng để lấy Profile cho Layout
export const getUserProfile = async () => {
  try {
    const res = await api.get('/api/v1/users/profile');
    // Trả về dữ liệu an toàn, phòng trường hợp BE bọc data trong response.data.data
    return res.data.data || res.data; 
  } catch (error) {
    console.error("Lỗi khi gọi API getUserProfile:", error);
    throw new Error("Không thể tải thông tin User", { cause: error });
  }
};

// Hàm cũ của bạn (giữ nguyên không sửa gì cả)
export const getDashboardData = async () => {
  try {
    const [profileRes, projectsRes, tasksRes] = await Promise.all([
      api.get('/api/v1/users/profile'),
      api.get('/api/v1/projects'),
      api.get('/api/v1/main-tasks')
    ]);

    const userProfile = profileRes.data.data || profileRes.data; 
    const projects = projectsRes.data.data || projectsRes.data || [];
    const tasks = tasksRes.data.data || tasksRes.data || [];

    const stats = {
      totalProjects: projects.length,
      activeProjects: projects.filter(p => p.status === 'IN_PROGRESS').length,
      completedProjects: projects.filter(p => p.status === 'COMPLETED').length,
      overdueTasks: tasks.filter(t => t.status !== 'DONE' && new Date(t.deadline) < new Date()).length
    };

    return { userProfile, stats };
    
  } catch (error) {
    console.error("Lỗi trong dashboardService:", error);
    throw new Error("Không thể tải dữ liệu Dashboard", { cause: error }); 
  }
};