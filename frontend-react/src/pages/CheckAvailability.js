// src/pages/CheckAvailability.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Container, Form, Button, ListGroup, Alert } from 'react-bootstrap';

const CheckAvailability = () => {
  const [category, setCategory] = useState('');
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/books/category/${category}`);
      setBooks(response.data); // Suponiendo que tu backend devuelve una lista de libros
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
            type="text"
            value={category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Consultar
        </Button>
      </Form>

      {books.length > 0 && (
        <ListGroup className="mt-4">
          {books.map((book) => (
            <ListGroup.Item key={book.id}>
              {book.title} - {book.available ? 'Disponible' : 'No Disponible'}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default CheckAvailability;
