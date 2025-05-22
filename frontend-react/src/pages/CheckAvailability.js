import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Container, Form, Button, Table, Alert } from 'react-bootstrap';

const CheckAvailability = () => {
  const [categories, setCategories] = useState([]); 
  const [category, setCategory] = useState(''); 
  const [books, setBooks] = useState([]); 
  const [message, setMessage] = useState(null); 

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categorias'); 
        setCategories(response.data); 
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
        setMessage({ type: 'danger', text: 'Error al cargar las categorías' });
      }
    };
    
    fetchCategories(); 
  }, []); 

  const handleChange = (e) => {
    setCategory(e.target.value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get('/libros/categoria', {
        params: category ? { idCategoria: category } : {}
      });
      setBooks(response.data);
      if (response.data.length === 0) {
        setMessage({ type: 'warning', text: 'No se encontraron libros en esta categoría.' });
      }
    } catch (error) {
      console.error('Error al cargar libros', error);
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
          >
            <option value="">Todas</option>
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
