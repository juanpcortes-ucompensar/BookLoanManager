// src/pages/RegisterBook.js
import React, { useState } from 'react';
import api from '../services/api';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const RegisterBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    category: '',
    available: true,
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/books', book); // Asegúrate de que la URL sea correcta
      setMessage({ type: 'success', text: 'Libro registrado con éxito' });
      setBook({
        title: '',
        author: '',
        category: '',
        available: true,
      });
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error al registrar el libro' });
    }
  };

  return (
    <Container className="mt-5">
      <h2>Registrar nuevo libro</h2>
      {message && (
        <Alert variant={message.type}>
          {message.text}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={book.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Disponible"
            name="available"
            checked={book.available}
            onChange={(e) =>
              setBook({ ...book, available: e.target.checked })
            }
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterBook;
