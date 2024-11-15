import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Asegúrate de que 'api' esté configurado para usar Axios
import { Container, Form, Button, Alert } from 'react-bootstrap';

const RegisterBook = () => {
  const [book, setBook] = useState({
    titulo: '',   // Cambiado de 'title' a 'titulo'
    autor: '',    // Cambiado de 'author' a 'autor'
    isbn: '',     // Este campo ya está bien
    categoria: '',// Cambiado de 'category' a 'categoria'
  });
  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
  const [message, setMessage] = useState(null);

  // Efecto para obtener las categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categorias'); // Llama a la API para obtener categorías
        setCategories(response.data); // Actualiza el estado con las categorías obtenidas
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
        setMessage({ type: 'danger', text: 'Error al cargar las categorías' });
      }
    };
    
    fetchCategories();
  }, []); // Dependencias vacías para que se ejecute solo al montar el componente

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const libroData = {
        titulo: book.titulo,   // Asegúrate de que el nombre coincida con 'titulo' en el backend
        autor: book.autor,     // Asegúrate de que el nombre coincida con 'autor' en el backend
        isbn: book.isbn,       // Ya está correcto
        estado: "Disponible",   // Siempre asignamos "Disponible"
        categoria: {
          idCategoria: book.categoria // Enviar el ID de la categoría seleccionada
        }
      };
      console.log('Datos del libro:', libroData);
      await api.post('/api/libros', libroData);
      setMessage({ type: 'success', text: 'Libro registrado con éxito' });
      setBook({
        titulo: '',    // Reiniciar 'titulo'
        autor: '',     // Reiniciar 'autor'
        isbn: '',      // Reiniciar 'isbn'
        categoria: '', // Reiniciar 'categoria'
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
            name="titulo"  // Cambiado de 'title' a 'titulo'
            value={book.titulo}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            type="text"
            name="autor"  // Cambiado de 'author' a 'autor'
            value={book.autor}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            name="isbn"   // Este campo ya está bien
            value={book.isbn}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            as="select"
            name="categoria"  // Cambiado de 'category' a 'categoria'
            value={book.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {Array.isArray(categories) && categories.map((categoria) => (
              <option key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.nombre} {/* Asegúrate de que el nombre de la propiedad coincida */}
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
