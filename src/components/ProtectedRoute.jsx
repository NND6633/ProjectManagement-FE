import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Kiểm tra xem trong túi (localStorage) có chìa khóa (token) không
  const token = localStorage.getItem('token');

  if (!token) {
    // Nếu không có token, đá người dùng về trang Login ngay lập tức
    return <Navigate to="/login" replace />;
  }

  // Nếu có token, cho phép đi tiếp vào trang con (children)
  return children;
};

export default ProtectedRoute;