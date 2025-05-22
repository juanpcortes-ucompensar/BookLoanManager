import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const theme = createTheme();

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        BookLoanManager
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', contrasena: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/usuarios/login', {
        email: form.email,
        contrasena: form.contrasena,
      });

      const data = response.data;

      if (data && data.email) {
        localStorage.setItem('token', 'fake-token');
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userName', data.nombre);
        localStorage.setItem('rol', data.rol);
        navigate('/dashboard');
      } else {
        setError('Correo o contraseña inválidos');
      }
    } catch (err) {
      console.error(err);
      setError('Error al iniciar sesión');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: { xs: 'none', md: 'block' },
            minWidth: '50vw',
            backgroundImage: `url(${require('./../assets/login.jpg')})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
          }}
        />

        <Grid
          item
          xs={12}
          sm={8}
          md={6}
          component={Paper}
          elevation={6}
          square
          sx={{ minWidth: '50vw' }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: '100%' }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Usuario"
                name="email"
                autoComplete="email"
                autoFocus
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contrasena"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={form.contrasena}
                onChange={handleChange}
              />

              <Typography
                color="error"
                variant="body2"
                sx={{
                  minHeight: '1.5em',
                  visibility: error ? 'visible' : 'hidden',
                  mb: 1,
                  width: '100%',
                  boxSizing: 'border-box',
                }}
              >
                {error || ' '}
              </Typography>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Ingresar
              </Button>

              <Box mt={5}>
                <Copyright />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
