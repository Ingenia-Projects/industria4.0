// src/features/Auth/pages/LoginPage.js

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Link,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim'; // Importación correcta
import logoImage from '../../../assets/images/logo.png'; // Asegúrate de que la ruta sea correcta

const schema = yup.object().shape({
  email: yup.string().email('Ingrese un email válido').required('El email es requerido'),
  password: yup.string().required('La contraseña es requerida'),
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (err) {
      toast.error('Email o contraseña incorrectos');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  // Configuración de partículas
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    background: {
      color: {
        value: '#0d47a1',
      },
    },
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: '#ffffff',
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.7,
      },
      size: {
        value: 3,
      },
      move: {
        enable: true,
        speed: 1.5,
        direction: 'none',
        outModes: {
          default: 'out',
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: 'repulse',
        },
        onClick: {
          enable: true,
          mode: 'push',
        },
      },
      modes: {
        repulse: {
          distance: 100,
        },
        push: {
          quantity: 4,
        },
      },
    },
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <ToastContainer />
      {/* Sección Izquierda */}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          position: 'relative',
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          backgroundColor: '#0d47a1',
          overflow: 'hidden',
        }}
      >
        {/* Partículas */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', px: 3 }}>
          <Typography component="h1" variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
            Industria 4.0
          </Typography>
          <Typography component="h2" variant="h5" sx={{ maxWidth: '400px', mx: 'auto' }}>
            Impulsando la transformación digital con soluciones innovadoras y tecnología de punta.
          </Typography>
        </Box>
      </Grid>

      {/* Sección Derecha */}
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '2px',
            backgroundColor: (theme) => theme.palette.grey[300],
          },
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            my: 4,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          {/* Logo más grande */}
          <Box sx={{ mb: 2 }}>
            <img src={logoImage} alt="Logo" style={{ width: '180px' }} />
          </Box>
          <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
            Bienvenido de nuevo
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Ingresa tus credenciales para acceder a tu cuenta.
          </Typography>
          <Divider sx={{ width: '100%', mb: 3 }} />
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo electrónico"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  autoComplete="email"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type={showPassword ? 'text' : 'password'}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Link href="#" variant="body2">
                ¿Olvidaste tu contraseña?
              </Link>
              <Link href="#" variant="body2">
                {'¿No tienes cuenta? Regístrate'}
              </Link>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </Box>
        </Box>
        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 2,
            px: 4,
            backgroundColor: (theme) => theme.palette.grey[200],
          }}
        >
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
