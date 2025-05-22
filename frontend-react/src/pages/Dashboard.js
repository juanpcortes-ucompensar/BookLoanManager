import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de importar Axios
import { Grid, Paper, Typography, Button, Box, List, ListItem, ListItemText, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Link } from 'react-router-dom'; // Asegúrate de importar esto
import api from '../services/api'; // Axios configurado

const Dashboard = () => {
  // Estado para almacenar los datos obtenidos
  const [resumen, setResumen] = useState([]);
  const [vencimientos, setVencimientos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(''); // Para manejar errores

  // Realizamos las consultas a las APIs al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el resumen (puedes reemplazar la URL con la que tengas configurada en tu backend)
        const resumenResponse = await api.get('/dashboard/resumen');
        setResumen(resumenResponse.data);

        // Obtener los vencimientos
        const vencimientosResponse = await api.get('/dashboard/vencimientos');
        setVencimientos(vencimientosResponse.data);

        setLoading(false); // Cambiar el estado de carga
      } catch (err) {
        console.error(err);
        setError('Error al obtener los datos');
        setLoading(false); // Cambiar el estado de carga en caso de error
      }
    };

    fetchData(); // Ejecutar la función para obtener los datos
  }, []); // Se ejecuta solo al montar el componente

  // Mostrar "Loading..." mientras los datos se cargan
  if (loading) {
    return <div>Loading...</div>;
  }

  // Mostrar el error si hubo un problema
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Dashboard del Bibliotecario
      </Typography>

      {/* Resumen */}
      <Grid container spacing={2}>
        {resumen.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
              <Typography variant="h6">{item.label}</Typography>
              <Typography variant="h4" color="primary">{item.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Acciones rápidas */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Acciones rápidas
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/nuevo-prestamo"
            >
                ➕ Nuevo préstamo
            </Button>
          </Grid>
          <Grid item>
            <Button
                component={Link}
                to="/devoluciones"
                variant="contained"
                color="secondary"
            >
                📥 Devolución
            </Button>
          </Grid>
          <Grid item>
            <Button
                component={Link}
                to="/check-availability"
                variant="outlined"
                color="primary"
            >
                🔍 Disponibilidad
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Próximos vencimientos */}
      <Box mt={5}>
        <Typography variant="h6" gutterBottom>
          Préstamos próximos a vencer
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Libro</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Días restantes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vencimientos.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.libro}</TableCell>
                <TableCell>{item.usuario}</TableCell>
                <TableCell>{item.diasRestantes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Dashboard;
