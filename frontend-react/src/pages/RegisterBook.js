import React, { useState, useEffect } from 'react';
import api from '../services/api'; 
import { Container, Form, Button, Alert } from 'react-bootstrap';

const RegisterBook = () => {
  const [book, setBook] = useState({
    titulo: '',   
    autor: '',    
    isbn: '',     
    categoria: '',
  });
  const [categories, setCategories] = useState([]); 
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
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const libroData = {
        titulo: book.titulo,   
        autor: book.autor,     
        isbn: book.isbn,       
        estado: "Disponible",   
        categoria: {
          idCategoria: book.categoria 
        }
      };
      console.log('Datos del libro:', libroData);
      await api.post('/libros', libroData);
      setMessage({ type: 'success', text: 'Libro registrado con éxito' });
      setBook({
        titulo: '',    
        autor: '',     
        isbn: '',      
        categoria: '', 
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
            name="titulo"  
            value={book.titulo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            type="text"
            name="autor"  
            value={book.autor}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            name="isbn"   
            value={book.isbn}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            as="select"
            name="categoria"
            value={book.categoria}
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
          Registrar
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterBook;
