// src/App.js
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';  // Usamos Routes y Route para definir las rutas
import { Navbar, Nav, Container } from 'react-bootstrap';
import RegisterBook from './pages/RegisterBook';
import CheckAvailability from './pages/CheckAvailability';
import LoanManagement from './pages/LoanManagement';

const App = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Biblioteca</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/register">Registrar Libro</Nav.Link>
            <Nav.Link as={Link} to="/check-availability">Consultar Disponibilidad</Nav.Link>
            <Nav.Link as={Link} to="/loan-management">Gestión de Préstamos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/register" element={<RegisterBook />} />
          <Route path="/check-availability" element={<CheckAvailability />} />
          <Route path="/loan-management" element={<LoanManagement />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
