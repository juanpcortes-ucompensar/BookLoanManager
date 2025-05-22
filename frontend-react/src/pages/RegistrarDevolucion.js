import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Typography, Button, Box
} from '@mui/material';
import api from '../services/api';
import dayjs from 'dayjs';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const RegistrarDevolucion = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });


  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const res = await api.get('/prestamos/activos');
        setPrestamos(res.data);
      } catch (error) {
        console.error('Error al cargar préstamos activos', error);
      }
    };

    fetchPrestamos();
  }, []);

  const registrarDevolucion = async (idPrestamo) => {
  try {
    await api.post(`/devoluciones/${idPrestamo}`);
    setPrestamos(prev => prev.filter(p => p.idPrestamo !== idPrestamo));
    setSnackbar({
      open: true,
      message: '✅ Devolución registrada correctamente',
      severity: 'success'
    });
  } catch (error) {
    setSnackbar({
      open: true,
      message: '❌ Error al registrar devolución',
      severity: 'error'
    });
  }
};


  const calcularDiasRestantes = (fechaDevolucion) => {
    const hoy = dayjs();
    const devolucion = dayjs(fechaDevolucion);
    return devolucion.diff(hoy, 'day');
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>📋 Préstamos Activos</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Libro</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Fecha Préstamo</TableCell>
              <TableCell>Fecha Devolución</TableCell>
              <TableCell>Días Restantes</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prestamos.map((p) => {
              const dias = calcularDiasRestantes(p.fechaDevolucion);
              return (
                <TableRow key={p.idPrestamo}>
                  <TableCell>{p.libro?.titulo}</TableCell>
                  <TableCell>{p.usuario?.nombre}</TableCell>
                  <TableCell>{p.fechaPrestamo?.substring(0, 10)}</TableCell>
                  <TableCell>{p.fechaDevolucion?.substring(0, 10)}</TableCell>
                  <TableCell sx={{ color: dias < 0 ? 'red' : 'green', fontWeight: 'bold' }}>
                    {dias >= 0 ? `${dias} días` : `-${Math.abs(dias)} días`}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => registrarDevolucion(p.idPrestamo)}
                    >
                      📥 Devolver
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
    open={snackbar.open}
    autoHideDuration={3000}
    onClose={() => setSnackbar({ ...snackbar, open: false })}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
    <Alert
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
        variant="filled"
        sx={{ width: '100%' }}
    >
        {snackbar.message}
    </Alert>
    </Snackbar>

    </Box>
  );
};

export default RegistrarDevolucion;
