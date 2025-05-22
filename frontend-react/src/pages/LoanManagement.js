import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Paper, FormControl, InputLabel, Select,
  MenuItem, TextField, Button, Collapse, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Snackbar, Alert, Dialog,
  DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import api from '../services/api';
import dayjs from 'dayjs';

const LoanManagement = () => {
  // Estados de filtros
  const [titulo, setTitulo] = useState('');
  const [usuarioPrestante, setUsuarioPrestante] = useState('');
  const [autor, setAutor] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [estado, setEstado] = useState('');
  const [fechaPrestamoInicio, setFechaPrestamoInicio] = useState('');
  const [fechaPrestamoFin, setFechaPrestamoFin] = useState('');
  const [idLibro, setIdLibro] = useState('');
  const [open, setOpen] = useState(false);

  // Datos de libros y categorías
  const [libros, setLibros] = useState([]);
  const [categorias, setCategorias] = useState([]);

  // Carga y feedback
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ idLibro: '', idUsuario: '' });
  const [librosDisponibles, setLibrosDisponibles] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await api.get('/categorias');
        setCategorias(res.data);
      } catch (err) {
        setMessage({ type: 'error', text: 'Error al cargar categorías' });
      }
    };

    fetchCategorias();

    if (modalOpen) {
      api.get('/libros')
        .then(res => setLibrosDisponibles(res.data))
        .catch(() => setMessage({ type: 'error', text: 'Error al cargar libros' }));

      api.get('/usuarios')
        .then(res => setUsuarios(res.data))
        .catch(() => setMessage({ type: 'error', text: 'Error al cargar usuarios' }));
    }
  }, [modalOpen]);

  const formatDate = (date) => (date ? dayjs(date).format('YYYY-MM-DD') : null);

  const handleSearch = async (e) => {
    
    if (e?.preventDefault) e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await api.get('/libros/search', {
        params: {
          titulo: titulo || null,
          usuarioPrestante: usuarioPrestante || null,
          autor: autor || null,
          categoriaId: categoriaId || null,
          estado: estado || null,
          fechaPrestamoInicio: formatDate(fechaPrestamoInicio),
          fechaPrestamoFin: formatDate(fechaPrestamoFin),
          idLibro: idLibro || null,
        }
      });
      setLibros(res.data);
    } catch (err) {
      setMessage({ type: 'error', text: '❌ Error al buscar los libros' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLoan = async () => {
    const hoy = new Date();
    const devolucion = new Date(hoy.getTime() + 7 * 24 * 60 * 60 * 1000);

    const payload = {
      fechaPrestamo: hoy.toISOString().slice(0, 10),
      fechaDevolucion: devolucion.toISOString().slice(0, 10),
      estado: 'Activo',
      libro: { idLibro: formData.idLibro },
      usuario: { idUsuario: formData.idUsuario }
    };

    if (!formData.idLibro || !formData.idUsuario) {
      setMessage({ type: 'error', text: 'Debe seleccionar un libro y un usuario.' });
      return;
    }

    try {
      await api.post('/prestamos', payload);
      setModalOpen(false);
      setFormData({ idLibro: '', idUsuario: '' });
      setMessage({ type: 'success', text: '✅ Préstamo creado correctamente' });
      handleSearch(); // Refrescar la tabla
    } catch (err) {
      const msg = err.response?.data || '❌ Error al crear el préstamo';
      setMessage({ type: 'error', text: msg });
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>📚 Consulta de Préstamos</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Usuario Prestante"
                value={usuarioPrestante}
                onChange={(e) => setUsuarioPrestante(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Button onClick={() => setOpen(!open)}>
                {open ? 'Ocultar filtros avanzados' : 'Mostrar filtros avanzados'}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Collapse in={open}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel>Categoría</InputLabel>
                      <Select
                        value={categoriaId}
                        onChange={(e) => setCategoriaId(e.target.value)}
                        label="Categoría"
                      >
                        <MenuItem value="">Todas</MenuItem>
                        {categorias.map((cat) => (
                          <MenuItem key={cat.idCategoria} value={cat.idCategoria}>
                            {cat.nombre}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6} sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="estado-label">Estado</InputLabel>
                      <Select
                        labelId="estado-label"
                        id="estado-select"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        label="Estado"
                      >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="Disponible">Disponible</MenuItem>
                        <MenuItem value="Prestado">Prestado</MenuItem>
                        <MenuItem value="Reservado">Reservado</MenuItem>
                      </Select>
                    </FormControl>

                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Autor"
                      value={autor}
                      onChange={(e) => setAutor(e.target.value)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="ID Libro"
                      value={idLibro}
                      onChange={(e) => setIdLibro(e.target.value)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Fecha Desde"
                      type="date"
                      value={fechaPrestamoInicio}
                      onChange={(e) => setFechaPrestamoInicio(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Fecha Hasta"
                      type="date"
                      value={fechaPrestamoFin}
                      onChange={(e) => setFechaPrestamoFin(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Collapse>
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button variant="contained" type="submit">
                Buscar
              </Button>
              <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
                Nuevo Préstamo
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Tabla de resultados */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>Título</strong></TableCell>
              <TableCell><strong>Autor</strong></TableCell>
              <TableCell><strong>Categoría</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
              <TableCell><strong>Usuario Estado</strong></TableCell>
              <TableCell><strong>Fecha Estado</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {libros.map((libro, idx) => (
              <TableRow
                key={idx}
                sx={{
                  backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9f9f9',
                  '&:hover': {
                    backgroundColor: '#e3f2fd', // un azul claro al hacer hover
                  }
                }}
              >
                <TableCell>{libro.titulo}</TableCell>
                <TableCell>{libro.autor}</TableCell>
                <TableCell>{libro.categoria}</TableCell>
                <TableCell>{libro.estado}</TableCell>
                <TableCell>{libro.nombreUsuario}</TableCell>
                <TableCell>{libro.fechaPrestamo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      <Snackbar
        open={!!message}
        autoHideDuration={4000}
        onClose={() => setMessage(null)}
      >
        <Alert severity={message?.type} onClose={() => setMessage(null)}>
          {message?.text}
        </Alert>
      </Snackbar>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>📘 Crear nuevo préstamo</DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth margin="normal">
            <InputLabel id="libro-select-label">Libro</InputLabel>
            <Select
              labelId="libro-select-label"
              value={formData.idLibro}
              onChange={(e) => setFormData({ ...formData, idLibro: e.target.value })}
              label="Libro"
              required
            >
              {librosDisponibles.map((libro) => (
                <MenuItem key={libro.idLibro} value={libro.idLibro}>
                  {libro.titulo || `Libro #${libro.idLibro}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="usuario-select-label">Usuario</InputLabel>
            <Select
              labelId="usuario-select-label"
              value={formData.idUsuario}
              onChange={(e) => setFormData({ ...formData, idUsuario: e.target.value })}
              label="Usuario"
              required
            >
              {usuarios.map((usuario) => (
                <MenuItem key={usuario.idUsuario} value={usuario.idUsuario}>
                  {usuario.nombre || `Usuario #${usuario.idUsuario}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleCreateLoan} variant="contained" color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default LoanManagement;
