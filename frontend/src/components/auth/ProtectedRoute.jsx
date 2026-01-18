import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ adminOnly = false }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && userInfo.role !== 'admin') {
    // Redirect to home or a "not authorized" page if they aren't an admin
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;