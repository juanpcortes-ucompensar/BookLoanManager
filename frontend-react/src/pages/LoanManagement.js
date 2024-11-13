// src/pages/LoanManagement.js
import React, { useState } from 'react';
import api from '../services/api';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const LoanManagement = () => {
  const [bookId, setBookId] = useState('');
  const [borrower, setBorrower] = useState('');
  const [action, setAction] = useState('borrow'); // 'borrow' or 'return'
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'bookId') {
      setBookId(value);
    } else if (name === 'borrower') {
      setBorrower(value);
    } else if (name === 'action') {
      setAction(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (action === 'borrow') {
        await api.post(`/loans/borrow`, { bookId, borrower });
        setMessage({ type: 'success', text: 'Libro prestado con éxito' });
      } else {
        await api.post(`/loans/return`, { bookId });
        setMessage({ type: 'success', text: 'Libro devuelto con éxito' });
      }
    } catch (error) {
      setMessage({ type: 'danger', text: 'Error en la operación' });
    }
  };

  return (
    <Container className="mt-5">
      <h2>Gestión de Préstamos</h2>
      {message && (
        <Alert variant={message.type}>
          {message.text}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Libro ID</Form.Label>
          <Form.Control
            type="text"
            name="bookId"
            value={bookId}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nombre del prestatario</Form.Label>
          <Form.Control
            type="text"
            name="borrower"
            value={borrower}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Acción</Form.Label>
          <Form.Select name="action" value={action} onChange={handleChange}>
            <option value="borrow">Prestar</option>
            <option value="return">Devolver</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Procesar
        </Button>
      </Form>
    </Container>
  );
};

export default LoanManagement;
