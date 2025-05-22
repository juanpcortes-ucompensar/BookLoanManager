import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button, Box, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Link } from 'react-router-dom'; 
import api from '../services/api'; 
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  
  const [resumen, setResumen] = useState([]);
  const [vencimientos, setVencimientos] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const resumenResponse = await api.get('/dashboard/resumen');
        setResumen(resumenResponse.data);

        
        const vencimientosResponse = await api.get('/dashboard/vencimientos');
        setVencimientos(vencimientosResponse.data);

        setLoading(false); 
      } catch (err) {
        console.error(err);
        setError('Error al obtener los datos');
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []); 

  const handleClick = () => {
    navigate('/loan-management', { state: { openModal: true } });
  };

  
  if (loading) {
    return <div>Loading...</div>;
  }

  
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
              onClick={handleClick}
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
