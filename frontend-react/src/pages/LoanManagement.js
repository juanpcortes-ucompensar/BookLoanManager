import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Container, Form, Button, Alert, Table, Row, Col, Collapse } from 'react-bootstrap';

const LoanManagement = () => {
  // Estado de los filtros
  const [titulo, setTitulo] = useState('');
  const [usuarioPrestante, setUsuarioPrestante] = useState('');
  const [autor, setAutor] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [estado, setEstado] = useState('');
  const [fechaPrestamoInicio, setFechaPrestamoInicio] = useState('');
  const [fechaPrestamoFin, setFechaPrestamoFin] = useState('');
  const [idLibro, setIdLibro] = useState('');

  // Estado para los resultados de la búsqueda
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Estado para controlar la visibilidad de los filtros avanzados
  const [open, setOpen] = useState(false);

  // Estado para las categorías
  const [categorias, setCategorias] = useState([]);

  // Cargar las categorías desde la API
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await api.get('/api/categorias'); // Asegúrate de que la API para obtener las categorías esté configurada correctamente
        setCategorias(response.data); // Actualizamos el estado con las categorías obtenidas
      } catch (error) {
        setMessage({ type: 'danger', text: 'Error al cargar las categorías.' });
      }
    };

    fetchCategorias();
  }, []);

  // Función para manejar la búsqueda de libros
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
// Convert dates to 'YYYY-MM-DD' if they're not null
const formatDate = (date) => (date ? new Date(date).toISOString().split('T')[0] : null);

try {
  // Make the request with the current filters
  const response = await api.get('/api/libros/search', {
    params: {
      titulo: titulo || null,
      usuarioPrestante: usuarioPrestante || null,
      autor: autor || null,
      categoriaId: categoriaId || null,
      estado: estado || null,
      fechaPrestamoInicio: formatDate(fechaPrestamoInicio),
      fechaPrestamoFin: formatDate(fechaPrestamoFin),
      idLibro: idLibro || null,
    },
  });
  console.log(response.data);

  // Update the state with the received data
    setLibros(response.data);
  } catch (error) {
    setMessage({ type: 'danger', text: 'Error al buscar los libros. Intente de nuevo.' });
  } finally {
    setLoading(false);
  }
  };

  return (
    <Container className="mt-5">
      <h2>Gestión de Préstamos</h2>

      {/* Mostrar mensaje de error o éxito */}
      {message && (
        <Alert variant={message.type}>
          {message.text}
        </Alert>
      )}

      {/* Filtros de búsqueda */}
      <Form onSubmit={handleSearch}>
        {/* Filtros Básicos */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Buscar por título"
            />
          </Col>

          <Col md={6}>
            <Form.Label>Usuario Prestante</Form.Label>
            <Form.Control
              type="text"
              name="usuarioPrestante"
              value={usuarioPrestante}
              onChange={(e) => setUsuarioPrestante(e.target.value)}
              placeholder="Buscar por usuario"
            />
          </Col>
        </Row>

        {/* Filtro avanzado (Categoría, Estado, Autor, Fecha de préstamo, Id Libro) */}
        <Button
          variant="link"
          onClick={() => setOpen(!open)}
          aria-controls="advanced-filters"
          aria-expanded={open}
        >
          {open ? 'Ocultar filtros avanzados' : 'Mostrar filtros avanzados'}
        </Button>

        <Collapse in={open}>
          <div id="advanced-filters">
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  as="select"
                  name="categoriaId"
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(e.target.value)}
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.idCategoria} value={categoria.idCategoria}>
                      {categoria.nombre}
                    </option>
                  ))}
                </Form.Control>
              </Col>

              <Col md={6}>
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  as="select"
                  name="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="">Seleccionar estado</option>
                  <option value="Disponible">Disponible</option>
                  <option value="Prestado">Prestado</option>
                  <option value="Reservado">Reservado</option>
                </Form.Control>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Autor</Form.Label>
                <Form.Control
                  type="text"
                  name="autor"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  placeholder="Buscar por autor"
                />
              </Col>

              <Col md={6}>
                <Form.Label>Id Libro</Form.Label>
                <Form.Control
                  type="text"
                  name="idLibro"
                  value={idLibro}
                  onChange={(e) => setIdLibro(e.target.value)}
                  placeholder="Buscar por ID del libro"
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>Fecha de Préstamo</Form.Label>
                <Row>
                  <Col md={6}>
                    <Form.Control
                      type="date"
                      name="fechaPrestamoInicio"
                      value={fechaPrestamoInicio}
                      onChange={(e) => setFechaPrestamoInicio(e.target.value)}
                      placeholder="Desde"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Control
                      type="date"
                      name="fechaPrestamoFin"
                      value={fechaPrestamoFin}
                      onChange={(e) => setFechaPrestamoFin(e.target.value)}
                      placeholder="Hasta"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Collapse>

        {/* Botón para ejecutar la búsqueda */}
        <Button type="submit" variant="primary">
          Buscar
        </Button>
      </Form>

      {/* Mostrar los resultados */}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Usuario Prestante</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Fecha Préstamo</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro, index) => (
              <tr key={index}>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.nombreUsuario}</td>
                <td>{libro.categoria}</td>
                <td>{libro.estado}</td>
                <td>{libro.fechaPrestamo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default LoanManagement;
