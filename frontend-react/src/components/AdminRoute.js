import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const rol = localStorage.getItem('rol');

  if (rol !== 'ADMIN') {
    return <Navigate to="/" replace />; // Redirige si no es admin
  }

  return <Outlet />;
};

export default AdminRoute;
