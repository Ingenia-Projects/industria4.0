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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import logoImage from '../../../assets/images/logo.png'; // Asegúrate de que la ruta sea correcta

// Esquema de validación con Yup
const schema = yup.object().shape({
  email: yup.string().email('Ingrese un email válido').required('El email es requerido'),
  password: yup.string().required('La contraseña es requerida'),
});

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
        value: 'transparent', // Fondo transparente para las partículas
      },
    },
    particles: {
      number: {
        value: isSmallScreen ? 30 : 50,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: '#ffffff', // Blanco para mayor visibilidad
      },
      shape: {
        type: 'circle',
      },
      opacity: {
        value: 0.5, // Aumentar opacidad para mejor visibilidad
      },
      size: {
        value: isSmallScreen ? 2 : 3,
      },
      move: {
        enable: true,
        speed: isSmallScreen ? 1 : 1.5,
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
    detectRetina: true,
  };

  return (
    <Grid container component="main" sx={{ height: '100vh', position: 'relative' }}>
      <ToastContainer />

      {/* Sección Izquierda con Degradado Azul a Gris Metálico y Partículas */}
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
          background: `linear-gradient(135deg, #1976d2 30%, #A9A9A9 90%)`, // Azul a Gris Metálico
          overflow: 'hidden',
          boxShadow: 3, // Añadir sombra general a la sección
        }}
      >
        {/* Partículas */}
        <Particles
          id="tsparticles-left"
          init={particlesInit}
          options={particlesOptions}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0, // Asegurar que las partículas estén detrás del contenido
          }}
        />
        {/* Contenido Sobre las Partículas */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            px: 3,
            maxWidth: '500px',
            width: '100%',
          }}
        >
          {/* Líneas Decorativas */}
          <Box
            sx={{
              position: 'absolute',
              top: '10%',
              left: '10%',
              width: '80%',
              height: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              transform: 'rotate(45deg)',
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '10%',
              right: '10%',
              width: '80%',
              height: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              transform: 'rotate(-45deg)',
              pointerEvents: 'none',
            }}
          />
          <Typography
            component="h1"
            variant="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: theme.palette.background.paper,
              fontSize: { xs: '2.5rem', md: '4rem' }, // Tamaño más grande
              textShadow: `3px 3px 6px rgba(0,0,0,0.4)`,
              position: 'relative',
              zIndex: 2,
            }}
          >
            Industria 4.0
          </Typography>
          <Typography
            component="h2"
            variant="h6"
            sx={{
              maxWidth: '400px',
              mx: 'auto',
              color: theme.palette.background.paper,
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              textShadow: `1px 1px 3px rgba(0,0,0,0.3)`,
              position: 'relative',
              zIndex: 2,
            }}
          >
            Impulsando la transformación digital con soluciones innovadoras y tecnología de punta.
          </Typography>
        </Box>
      </Grid>

      {/* Sección Derecha con Fondo Blanco y Formulario de Login */}
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
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing(4),
          backgroundColor: '#ffffff', // Fondo blanco puro
          position: 'relative',
        }}
      >
        {/* Logo Grande y Animado (sin Avatar) */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ mb: 2, textAlign: 'center' }}
        >
          <Box
            component="img"
            src={logoImage}
            alt="Logo de joonx"
            sx={{
              width: 150,
              height: 'auto',
              mb: 2,
              filter: 'none', // Eliminamos la sombra alrededor del logo
            }}
          />
        </Box>

        {/* Título y Subtítulo */}
        <Typography component="h1" variant="h4" sx={{ mb: 1, color: theme.palette.text.primary, textAlign: 'center' }}>
          joonx
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, color: theme.palette.text.secondary, textAlign: 'center' }}>
          Ecosystem of Digital Manufacturing Technologies
        </Typography>

        <Divider sx={{ width: '100%', mb: 3, bgcolor: theme.palette.divider }} />

        {/* Formulario de Login */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ width: '100%' }}>
          {/* Campo de Email */}
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
                InputLabelProps={{
                  style: { color: theme.palette.text.primary },
                }}
                InputProps={{
                  style: { color: theme.palette.text.primary },
                }}
              />
            )}
          />
          {/* Campo de Contraseña */}
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
                InputLabelProps={{
                  style: { color: theme.palette.text.primary },
                }}
                InputProps={{
                  style: { color: theme.palette.text.primary },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        sx={{ color: theme.palette.text.primary }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          {/* Enlaces de Recuperación y Registro */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1,
            }}
          >
            <Link href="#" variant="body2" sx={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
              ¿Olvidaste tu contraseña?
            </Link>
            <Link href="#" variant="body2" sx={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
              {'¿No tienes cuenta? Regístrate'}
            </Link>
          </Box>
          {/* Botón de Ingreso */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              boxShadow: 3,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
              '&:hover': {
                boxShadow: 6,
                background: `linear-gradient(135deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
              },
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            mt: 4,
            width: '100%',
            textAlign: 'center',
            color: theme.palette.text.secondary,
          }}
        >
          <Typography variant="body2">
            © {new Date().getFullYear()} joonx. Todos los derechos reservados.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
