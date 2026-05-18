// import api from './api'; // Bỏ comment dòng này khi dùng chung file cấu hình axios với authService

// ==========================================
// 1. HÀM LẤY DANH SÁCH DỰ ÁN (GET ALL PROJECTS)
// ==========================================
export const getAllProjectsApi = async () => {
  // ---------------------------------------------------------
  // [PHẦN 1: CODE THẬT] (Bỏ comment phần này khi nối Backend C#)
  // ---------------------------------------------------------
  /*
  try {
    // Lưu ý: Endpoint này Backend chưa có, bảo họ làm thêm nhé!
    const response = await api.get('/api/v1/projects'); 
    
    // Giả sử Backend trả về: { message: "...", data: [ ...danh sách... ] }
    return response.data.data; 

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Lỗi khi tải danh sách dự án!";
    throw new Error(errorMessage, { cause: error });
  }
  */

  // ---------------------------------------------------------
  // [PHẦN 2: CODE GIẢ LẬP] (Xóa toàn bộ phần này khi nối Backend)
  // ---------------------------------------------------------
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API - Đang tải danh sách dự án...");
      resolve([
        { id: 1, name: 'Website Redesign 2024', team: 'Design Team', status: 'Active', progress: 65, deadline: 'Oct 15, 2024' },
        { id: 2, name: 'Mobile App Q3 Launch', team: 'Engineering', status: 'Completed', progress: 100, deadline: 'Sep 01, 2024' },
        { id: 3, name: 'Marketing Campaign H2', team: 'Marketing', status: 'Active', progress: 25, deadline: 'Nov 30, 2024' },
        { id: 4, name: 'Database Migration', team: 'IT Infrastructure', status: 'Active', progress: 80, deadline: 'Oct 05, 2024' }
      ]);
    }, 800); // Giả lập mạng load 0.8s
  });
};

// ==========================================
// 2. HÀM TẠO DỰ ÁN MỚI (CREATE PROJECT)
// ==========================================
export const createProjectApi = async (teamId, name) => {
  // ---------------------------------------------------------
  // [PHẦN 1: CODE THẬT] (Bỏ comment phần này khi nối Backend C#)
  // ---------------------------------------------------------
  /*
  try {
    const response = await api.post('/api/v1/projects', {
      teamId: teamId,
      name: name
    });

    const message = response.data.message;
    const projectData = response.data.data; // C# trả về thông tin dự án vừa tạo

    return { message, projectData };

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Lỗi khi tạo dự án!";
    throw new Error(errorMessage, { cause: error });
  }
  */

  // ---------------------------------------------------------
  // [PHẦN 2: CODE GIẢ LẬP] (Xóa toàn bộ phần này khi nối Backend)
  // ---------------------------------------------------------
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Mock API - Đang tạo dự án "${name}" cho Team ID: ${teamId}`);
      
      // Giả lập check trùng tên
      if (name === "Error Project") {
        reject(new Error("Project name already exists in this team"));
      } else {
        resolve({
          message: "Project created successfully",
          projectData: {
            id: "fake-guid-12345",
            teamId: teamId,
            name: name,
            status: 0, // 0 = Active
            createdAt: new Date().toISOString()
          }
        });
      }
    }, 1000);
  });
};

// ==========================================
// 3. HÀM LẤY THỐNG KÊ DỰ ÁN (GET PROJECT STATS)
// ==========================================
export const getProjectStatsApi = async (projectId) => {
  // ---------------------------------------------------------
  // [PHẦN 1: CODE THẬT] (Bỏ comment phần này khi nối Backend C#)
  // ---------------------------------------------------------
  /*
  try {
    const response = await api.get(`/api/v1/projects/${projectId}/stats`);

    const message = response.data.message;
    const statsData = response.data.data; // C# trả về: totalMainTasks, progress, overdueTasks...

    return { message, statsData };

  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Lỗi khi lấy thống kê dự án!";
    throw new Error(errorMessage, { cause: error });
  }
  */

  // ---------------------------------------------------------
  // [PHẦN 2: CODE GIẢ LẬP] (Xóa toàn bộ phần này khi nối Backend)
  // ---------------------------------------------------------
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Mock API - Đang lấy thống kê cho Project ID:", projectId);
      
      resolve({
        message: "Project stats retrieved successfully",
        statsData: {
          projectId: projectId,
          projectName: "Sample Mock Project",
          totalMainTasks: 5,
          totalSubtasks: 20,
          completedTasks: 13,
          inProgressTasks: 5,
          overdueTasks: 2,
          progress: 65.0 // % hoàn thành
        }
      });
    }, 800);
  });
};