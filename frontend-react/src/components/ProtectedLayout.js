import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * ProtectedLayout verifica si el usuario tiene un token en localStorage.
 * Si no está autenticado, lo redirige al login.
 */
const ProtectedLayout = () => {
  const token = localStorage.getItem('token');

  // Si no hay token, redirige a /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, renderiza las rutas hijas
  return <Outlet />;
};

export default ProtectedLayout;
