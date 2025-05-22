import React from 'react';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaBook, FaSearch, FaHandsHelping, FaSignOutAlt, FaPlusCircle } from 'react-icons/fa';  // Puedes usar iconos con react-icons

const AuthenticatedLayout = () => {
  return (
    <>
      {/* Navbar superior */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Biblioteca</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/login" onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}>
              <FaSignOutAlt /> Cerrar sesión
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Layout principal con Sidebar y contenido */}
      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col xs={2} className="bg-dark text-white p-4" style={{ minHeight: '100vh' }}>
            <h5>Panel de control</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="text-white">
                <FaHome /> Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-white">
                <FaBook /> Registrar Libro
              </Nav.Link>
              <Nav.Link as={Link} to="/check-availability" className="text-white">
                <FaSearch /> Consultar Disponibilidad
              </Nav.Link>
              <Nav.Link as={Link} to="/loan-management" className="text-white">
                <FaHandsHelping /> Consulta de Préstamos
              </Nav.Link>
              <Nav.Link as={Link} to="/devoluciones" className="text-white">
                <FaBook /> Registrar Devolución
              </Nav.Link>

            </Nav>
          </Col>

          {/* Contenido principal */}
          <Col xs={10} className="p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AuthenticatedLayout;
