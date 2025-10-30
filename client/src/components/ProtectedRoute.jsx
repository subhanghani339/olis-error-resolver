import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageRoutes } from '../utils/page-routes';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to={PageRoutes.LOGIN} />;

  return children;
};

export default ProtectedRoute;
