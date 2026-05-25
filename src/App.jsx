import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'; // Import người gác cổng
import Guest from './pages/Guest';
import Login from './pages/Auth/Login'; 
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Teams from './pages/Teams';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/guest" element={<Guest />} />
        {/* ========================================== */}
        {/* 1. CÁC ĐƯỜNG DẪN CÔNG CỘNG (PUBLIC ROUTES)  */}
        {/* ========================================== */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ========================================== */}
        {/* 2. CÁC ĐƯỜNG DẪN BẢO MẬT (PROTECTED ROUTES) */}
        {/* ========================================== */}
        {/* Áp dụng ProtectedRoute để bảo vệ toàn bộ Layout và các trang con bên trong */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} /> {/* Mặc định vào là thấy Dashboard */}
          {/* Các trang khác sẽ thêm sau: */}
          {<Route path="teams" element={<Teams />} />}
          {<Route path="projects" element={<Projects />} />}
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Route>
        
        {/* ========================================== */}
        {/* 3. XỬ LÝ LỖI 404                           */}
        {/* ========================================== */}
        <Route path="*" element={<Navigate to="/guest" replace />} />
        
      </Routes>
    </Router>
  );
}

export default App;