import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterBook from './pages/RegisterBook';
import CheckAvailability from './pages/CheckAvailability';
import LoanManagement from './pages/LoanManagement';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RegistrarDevolucion from './pages/RegistrarDevolucion'; 
import ProtectedLayout from './components/ProtectedLayout';
import AuthenticatedLayout from './components/AuthenticatedLayout';
import UserManagement from './pages/UserManagement';
import AdminRoute from './components/AdminRoute'; 

const App = () => {
  return (
    <Routes>
      {/* RUTA DE LOGIN (pública) */}
      <Route path="/login" element={<Login />} />

      {/* RUTAS PROTEGIDAS */}
      <Route element={<ProtectedLayout />}>
        <Route element={<AuthenticatedLayout />}>
          <Route path="/" element={<Dashboard />} /> {/* Página por defecto */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<RegisterBook />} />
          <Route path="/check-availability" element={<CheckAvailability />} />
          <Route path="/loan-management" element={<LoanManagement />} />
          <Route path="/devoluciones" element={<RegistrarDevolucion />} />
          <Route element={<AdminRoute />}>
            <Route path="/usuarios" element={<UserManagement />} />
          </Route>
        </Route>
      </Route>

      {/* REDIRECCIÓN POR SI LA RUTA NO EXISTE */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default App;
