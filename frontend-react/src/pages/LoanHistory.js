import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Snackbar, Alert
} from '@mui/material';
import api from '../services/api';
import dayjs from 'dayjs';

const LoanHistory = () => {
  const [eventos, setEventos] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        const res = await api.get('/historico'); // Ajusta si tu ruta base es distinta
        setEventos(res.data);
      } catch (err) {
        setMessage({ type: 'error', text: '❌ Error al cargar el historial' });
      }
    };

    fetchHistorico();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>📖 Historial de Préstamos y Devoluciones</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>Tipo</strong></TableCell>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell><strong>Usuario</strong></TableCell>
              <TableCell><strong>Libro</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eventos.length > 0 ? (
              eventos.map((evento, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f9f9f9',
                    '&:hover': { backgroundColor: '#e3f2fd' }
                  }}
                >
                  <TableCell>
                    {evento.tipo === 'Préstamo' ? '📕 Préstamo' : '📗 Devolución'}
                  </TableCell>
                  <TableCell>{dayjs(evento.fecha).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>{evento.usuario}</TableCell>
                  <TableCell>{evento.libro}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No hay eventos registrados</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
    </Box>
  );
};

export default LoanHistory;
