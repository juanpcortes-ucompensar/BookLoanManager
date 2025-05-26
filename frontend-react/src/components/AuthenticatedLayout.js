import React from 'react';
import { Navbar, Nav, Container, Row, Col, Button } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { FaHome, FaBook, FaSearch, FaHandsHelping, FaSignOutAlt, FaPlusCircle, FaHistory } from 'react-icons/fa';

const AuthenticatedLayout = () => {
  const userRole = localStorage.getItem('rol');
  const userName = localStorage.getItem('userName');

  return (
    <>
      <Navbar style={{ background: 'linear-gradient(to right, #2c3e50, #4ca1af)' }} variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            BookLoanManager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Navbar.Text className="text-white me-3">
              👤 {userName}
            </Navbar.Text>
            <Nav>
              <Nav.Link as={Link} to="/login" onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('rol');
                localStorage.removeItem('user');
                window.location.href = '/login';
              }}>
                <FaSignOutAlt /> Cerrar sesión
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid>
        <Row>
          <Col xs={2} className="bg-dark text-white p-4" style={{ minHeight: '100vh' }}>
            <h5>Panel de control</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="text-white">
                <FaHome /> Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="text-white">
                <FaBook /> Gestion de Libros
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
              <Nav.Link as={Link} to="/historico" className="text-white">
                <FaHistory /> Historial de Préstamos
              </Nav.Link>

              {/* SOLO PARA ADMIN */}
              {userRole === 'ADMIN' && (
                <Nav.Link as={Link} to="/usuarios" className="text-white">
                  <FaPlusCircle /> Gestión de Usuarios
                </Nav.Link>
              )}
            </Nav>
          </Col>

          <Col xs={10} className="p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AuthenticatedLayout;
