import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Paper, TextField, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Snackbar, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, FormControl,
  InputLabel, Select, MenuItem
} from '@mui/material';
import api from '../services/api';

const BookManagement = () => {
  const [tituloFiltro, setTituloFiltro] = useState('');
  const [isbnFiltro, setIsbnFiltro] = useState('');
  const [libros, setLibros] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [message, setMessage] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [libroAEliminar, setLibroAEliminar] = useState(null);

  const [formData, setFormData] = useState({
    idLibro: null,
    titulo: '',
    autor: '',
    isbn: '',
    categoria: '',
  });

  const cargarLibros = async () => {
    try {
      const res = await api.get('/libros', {
        params: {
          titulo: tituloFiltro || null,
          isbn: isbnFiltro || null
        }
      });
      setLibros(res.data);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al cargar libros' });
    }
  };

  const cargarCategorias = async () => {
    try {
      const res = await api.get('/categorias');
      setCategorias(res.data);
    } catch {
      setMessage({ type: 'error', text: 'Error al cargar categorías' });
    }
  };

  useEffect(() => {
    cargarLibros();
    cargarCategorias();
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    cargarLibros();
  };

  const handleNuevoLibro = () => {
    setModoEdicion(false);
    setFormData({ idLibro: null, titulo: '', autor: '', isbn: '', categoria: '' });
    setModalOpen(true);
  };

  const handleEditarLibro = (libro) => {
    setModoEdicion(true);
    setFormData({
      idLibro: libro.idLibro,
      titulo: libro.titulo,
      autor: libro.autor,
      isbn: libro.isbn,
      categoria: libro.categoria?.idCategoria || '',
    });
    setModalOpen(true);
  };

  const handleGuardarLibro = async () => {
    const isbnRegex = /^(?:\d{9}[\dXx]|\d{13})$/;

    if (!formData.titulo || !formData.autor || !formData.isbn || !formData.categoria) {
      setMessage({ type: 'error', text: 'Completa todos los campos obligatorios.' });
      return;
    }

    if (!isbnRegex.test(formData.isbn.replace(/[- ]/g, ''))) {
      setMessage({ type: 'error', text: 'El ISBN ingresado no es válido. Debe ser ISBN-10 o ISBN-13.' });
      return;
    }

    const payload = {
      titulo: formData.titulo,
      autor: formData.autor,
      isbn: formData.isbn,
      estado: 'Disponible',
      categoria: { idCategoria: formData.categoria }
    };

    try {
      if (modoEdicion) {
        await api.put(`/libros/${formData.idLibro}`, payload);
        setMessage({ type: 'success', text: 'Libro actualizado correctamente' });
      } else {
        await api.post('/libros', payload);
        setMessage({ type: 'success', text: 'Libro creado correctamente' });
      }
      setModalOpen(false);
      cargarLibros();
    } catch {
      setMessage({ type: 'error', text: 'Error al guardar el libro' });
    }
  };

  const confirmarEliminacion = async () => {
    try {
      await api.delete(`/libros/${libroAEliminar.idLibro}`);
      setMessage({ type: 'success', text: 'Libro eliminado correctamente' });
      cargarLibros();
    } catch {
      setMessage({ type: 'error', text: 'Error al eliminar el libro' });
    } finally {
      setConfirmOpen(false);
      setLibroAEliminar(null);
    }
  };

  const handleEliminarLibro = (libro) => {
    setLibroAEliminar(libro);
    setConfirmOpen(true);
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>📚 Gestión de Libros</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleBuscar}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                label="Título"
                value={tituloFiltro}
                onChange={e => setTituloFiltro(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="ISBN"
                value={isbnFiltro}
                onChange={e => setIsbnFiltro(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button variant="contained" type="submit">
                Buscar
              </Button>
              <Button variant="contained" color="primary" onClick={handleNuevoLibro}>
                Nuevo Libro
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>Título</strong></TableCell>
              <TableCell><strong>Autor</strong></TableCell>
              <TableCell><strong>ISBN</strong></TableCell>
              <TableCell><strong>Categoría</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {libros.map((libro, idx) => (
              <TableRow
                key={libro.idLibro}
                sx={{
                  backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9f9f9',
                  '&:hover': { backgroundColor: '#e3f2fd' }
                }}
              >
                <TableCell>{libro.titulo}</TableCell>
                <TableCell>{libro.autor}</TableCell>
                <TableCell>{libro.isbn}</TableCell>
                <TableCell>{libro.categoria?.nombre}</TableCell>
                <TableCell>{libro.estado}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" sx={{ mr: 1 }} onClick={() => handleEditarLibro(libro)}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="error" size="small" onClick={() => handleEliminarLibro(libro)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {libros.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">No se encontraron libros</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Crear/Editar Libro */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{modoEdicion ? '✏️ Editar Libro' : '➕ Nuevo Libro'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Título"
                value={formData.titulo}
                onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Autor"
                value={formData.autor}
                onChange={e => setFormData({ ...formData, autor: e.target.value })}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="ISBN"
                value={formData.isbn}
                onChange={e => setFormData({ ...formData, isbn: e.target.value })}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}  sx={{ minWidth: 220 }}>
              <FormControl fullWidth required>
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={formData.categoria}
                  onChange={e => setFormData({ ...formData, categoria: e.target.value })}
                  label="Categoría"
                >
                  {categorias.map(cat => (
                    <MenuItem key={cat.idCategoria} value={cat.idCategoria}>
                      {cat.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleGuardarLibro} variant="contained" color="primary">
            {modoEdicion ? 'Guardar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={!!message}
        autoHideDuration={4000}
        onClose={() => setMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={message?.type} onClose={() => setMessage(null)}>
          {message?.text}
        </Alert>
      </Snackbar>

      {/* Confirmación eliminación */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Eliminar Libro</DialogTitle>
        <DialogContent>
          ¿Estás seguro que deseas eliminar el libro{' '}
          <strong>{libroAEliminar?.titulo}</strong>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancelar</Button>
          <Button onClick={confirmarEliminacion} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookManagement;
