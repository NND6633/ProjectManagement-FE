// import api from './api';

// ==========================================
// 0. HÀM LẤY DANH SÁCH TEAM (GET ALL TEAMS) - BACKEND CHƯA CÓ
// ==========================================
export const getAllTeamsApi = async () => {
  // ---------------------------------------------------------
  // [PHẦN 1: CODE THẬT] (Bỏ comment phần này khi nối Backend C#)
  // ---------------------------------------------------------
  /*
  try {
    const response = await api.get('/api/v1/teams');
    return response.data.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Lỗi khi tải danh sách nhóm!";
    throw new Error(errorMessage, { cause: error });
  }
  */

  // ---------------------------------------------------------
  // [PHẦN 2: CODE GIẢ LẬP] (Xóa toàn bộ phần này khi nối Backend)
  // ---------------------------------------------------------
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "team-1", name: "Alpha Team", leaderId: "user-1", memberCount: 5 },
        { id: "team-2", name: "Beta Team", leaderId: "user-2", memberCount: 8 }
      ]);
    }, 800);
  });
};

// ==========================================
// 1. TẠO TEAM MỚI (CREATE TEAM)
// ==========================================
export const createTeamApi = async (name) => {
  /*
  try {
    const response = await api.post('/api/v1/teams', { name: name });
    return { message: response.data.message, teamData: response.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Lỗi khi tạo nhóm!";
    throw new Error(errorMessage, { cause: error });
  }
  */
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name === "Exist Team") {
        reject(new Error("Team name already exists"));
      } else {
        resolve({
          message: "Team created successfully",
          teamData: { id: "new-team-id", name: name, leaderId: "my-id", createdAt: new Date() }
        });
      }
    }, 1000);
  });
};

// ==========================================
// 2. MỜI THÀNH VIÊN (INVITE MEMBER)
// ==========================================
export const inviteMemberApi = async (teamId, email) => {
  /*
  try {
    const response = await api.post(`/api/v1/teams/${teamId}/invite`, { email: email });
    return { message: response.data.message, data: response.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Lỗi khi mời thành viên!";
    throw new Error(errorMessage, { cause: error });
  }
  */
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "notfound@gmail.com") {
        reject(new Error("User does not exist"));
      } else {
        resolve({
          message: "Invitation sent successfully",
          data: { invitationId: "inv-123", teamId: teamId, invitedUser: email, status: 0 }
        });
      }
    }, 1000);
  });
};

// ==========================================
// 3. ĐỒNG Ý / TỪ CHỐI LỜI MỜI (ACCEPT / REJECT INVITATION)
// ==========================================
export const processInvitationApi = async (invitationId, isAccepted) => {
  /*
  try {
    const action = isAccepted ? 'accept' : 'reject';
    const response = await api.post(`/api/v1/teams/invitations/${invitationId}/${action}`);
    return { message: response.data.message, data: response.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Lỗi khi xử lý lời mời!";
    throw new Error(errorMessage, { cause: error });
  }
  */
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: isAccepted ? "Invitation accepted successfully" : "Invitation rejected successfully",
        data: { invitationId, status: isAccepted ? 'Accepted' : 'Rejected' }
      });
    }, 800);
  });
};

// ==========================================
// 4. CHỈ ĐỊNH PM (ASSIGN PM)
// ==========================================
export const assignPMApi = async (teamId, userId) => {
  /*
  try {
    const response = await api.put(`/api/v1/teams/${teamId}/assign-pm`, { userId: userId });
    return { message: response.data.message, data: response.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Lỗi khi cấp quyền PM!";
    throw new Error(errorMessage, { cause: error });
  }
  */
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        message: "Project Manager assigned successfully",
        data: { teamId, userId, role: "PM" }
      });
    }, 800);
  });
};

// ==========================================
// 5. XÓA THÀNH VIÊN (REMOVE MEMBER)
// ==========================================
export const removeMemberApi = async (teamId, userId) => {
  /*
  try {
    const response = await api.delete(`/api/v1/teams/${teamId}/members/${userId}`);
    return { message: response.data.message, data: response.data.data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Lỗi khi xóa thành viên!";
    throw new Error(errorMessage, { cause: error });
  }
  */
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Mock API - Xóa user ${userId} khỏi team ${teamId}`);
      resolve({
        message: "Member removed successfully and related tasks unassigned",
        data: { teamId, removedUserId: userId, affectedSubtasks: 2 }
      });
    }, 800);
  });
};