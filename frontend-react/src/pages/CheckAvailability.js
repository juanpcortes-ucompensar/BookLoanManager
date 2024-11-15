// src/pages/CheckAvailability.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Container, Form, Button, Table, Alert } from 'react-bootstrap';

const CheckAvailability = () => {
  const [categories, setCategories] = useState([]); // Estado para las categorías
  const [category, setCategory] = useState(''); // Estado para la categoría seleccionada
  const [books, setBooks] = useState([]); // Estado para los libros obtenidos
  const [message, setMessage] = useState(null); // Estado para los mensajes de error o éxito

  // Efecto para obtener las categorías desde la base de datos
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categorias'); // Llamada a la API para obtener las categorías
        setCategories(response.data); // Actualizamos el estado de categorías
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
        setMessage({ type: 'danger', text: 'Error al cargar las categorías' });
      }
    };
    
    fetchCategories(); // Llamar a la función para cargar las categorías al montar el componente
  }, []); // El efecto solo se ejecuta una vez al montar el componente

  const handleChange = (e) => {
    setCategory(e.target.value); // Actualizamos la categoría seleccionada
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/api/libros/categoria/${category}`); // Llamada a la API para obtener libros por categoría
      setBooks(response.data); // Guardamos los libros obtenidos en el estado
      if (response.data.length === 0) {
        setMessage({ type: 'warning', text: 'No se encontraron libros en esta categoría.' });
      }
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al obtener los libros' });
    }
  };

  return (
    <Container className="mt-5">
      <h2>Consultar disponibilidad de libros</h2>
      {message && (
        <Alert variant={message.type}>
          {message.text}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            as="select"
            value={category}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {Array.isArray(categories) && categories.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.nombre}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Consultar
        </Button>
      </Form>

      {books.length > 0 && (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Título</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.idLibro}>
                <td>{book.titulo}</td>
                <td>{book.estado}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default CheckAvailability;
