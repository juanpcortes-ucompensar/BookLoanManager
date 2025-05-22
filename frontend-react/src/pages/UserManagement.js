import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Paper, TextField, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Snackbar, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, FormControl,
  InputLabel, Select, MenuItem, Collapse
} from '@mui/material';
import api from '../services/api';

const UserManagement = () => {
  
  const [nombreFiltro, setNombreFiltro] = useState('');
  const [emailFiltro, setEmailFiltro] = useState('');

  
  const [usuarios, setUsuarios] = useState([]);
  const [message, setMessage] = useState(null);

  
  const [modalOpen, setModalOpen] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false); 
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    idUsuario: null,
    nombre: '',
    email: '',
    contrasena: '',
    rol: '',
  });

  
  const cargarUsuarios = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const params = {
        nombre: nombreFiltro || null,
        email: emailFiltro || null
      };
      const res = await api.get('/usuarios', { params });
      setUsuarios(res.data);
    } catch (err) {
      setMessage({ type: 'error', text: 'Error al cargar usuarios' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    cargarUsuarios();
  };

  
  const handleNuevoUsuario = () => {
    setModoEdicion(false);
    setFormData({ idUsuario: null, nombre: '', email: '', contrasena: '', rol: '' });
    setModalOpen(true);
  };

  
  const handleEditarUsuario = (usuario) => {
    setModoEdicion(true);
    setFormData({
      idUsuario: usuario.idUsuario,
      nombre: usuario.nombre,
      email: usuario.email,
      contrasena: '', 
      rol: usuario.rol,
    });
    setModalOpen(true);
  };

  
  const handleGuardarUsuario = async () => {
    if (!formData.nombre || !formData.email || !formData.rol || (!modoEdicion && !formData.contrasena)) {
      setMessage({ type: 'error', text: 'Completa todos los campos obligatorios.' });
      return;
    }

    try {
      if (modoEdicion) {
        await api.put(`/usuarios/${formData.idUsuario}`, formData);
        setMessage({ type: 'success', text: 'Usuario actualizado correctamente' });
      } else {
        await api.post('/usuarios', formData);
        setMessage({ type: 'success', text: 'Usuario creado correctamente' });
      }
      setModalOpen(false);
      cargarUsuarios();
    } catch (err) {
      const msg = err.response?.data || 'Error al guardar usuario';
      setMessage({ type: 'error', text: msg });
    }
  };

  const confirmarEliminacion = async () => {
    try {
      await api.delete(`/usuarios/${usuarioAEliminar.idUsuario}`);
      setMessage({ type: 'success', text: 'Usuario eliminado correctamente' });
      cargarUsuarios();
    } catch (err) {
      const msg = err.response?.data || 'Error al eliminar usuario';
      setMessage({ type: 'error', text: msg });
    } finally {
      setConfirmOpen(false);
      setUsuarioAEliminar(null);
    }
  };



  
  const handleEliminarUsuario = (usuario) => {
    setUsuarioAEliminar(usuario);
    setConfirmOpen(true);
  };


  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>👥 Gestión de Usuarios</Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <form onSubmit={handleBuscar}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                value={nombreFiltro}
                onChange={e => setNombreFiltro(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                value={emailFiltro}
                onChange={e => setEmailFiltro(e.target.value)}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button variant="contained" type="submit">
                Buscar
              </Button>
              <Button variant="contained" color="primary" onClick={handleNuevoUsuario}>
                Nuevo Usuario
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>


      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Rol</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {usuarios.map((u, idx) => (
                <TableRow
                  key={u.idUsuario}
                  sx={{
                    backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9f9f9',
                    '&:hover': {
                      backgroundColor: '#e3f2fd', 
                    },
                  }}
                >
                <TableCell>{u.nombre}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.rol}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleEditarUsuario(u)}
                    sx={{ mr: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleEliminarUsuario(u)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {usuarios.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">No se encontraron usuarios</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Crear/Editar Usuario */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{modoEdicion ? '✏️ Editar Usuario' : '➕ Nuevo Usuario'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                value={formData.nombre}
                onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                fullWidth
                required
              />
            </Grid>

            {!modoEdicion && (
              <Grid item xs={12}>
                <TextField
                  label="Contraseña"
                  type="password"
                  value={formData.contrasena}
                  onChange={e => setFormData({ ...formData, contrasena: e.target.value })}
                  fullWidth
                  required
                />
              </Grid>
            )}

            <Grid item xs={12} sx={{ minWidth: 120 }}>
              <FormControl fullWidth required>
                <InputLabel id="rol-label">Rol</InputLabel>
                <Select
                  labelId="rol-label"
                  value={formData.rol}
                  onChange={e => setFormData({ ...formData, rol: e.target.value })}
                  label="Rol"
                >
                  <MenuItem value="ADMIN">Admin</MenuItem>
                  <MenuItem value="BIBLIOTECARIO">Bibliotecario</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button onClick={handleGuardarUsuario} variant="contained" color="primary">
            {modoEdicion ? 'Guardar' : 'Crear'}
          </Button>
        </DialogActions>
      </Dialog>

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

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Eliminar Usuario</DialogTitle>
        <DialogContent>
          ¿Estás seguro que deseas eliminar al usuario{' '}
          <strong>{usuarioAEliminar?.nombre}</strong>?
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

export default UserManagement;
