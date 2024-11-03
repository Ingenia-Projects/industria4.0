// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';
import { AuthProvider } from './features/Auth/context/AuthContext';
import { ActiveProjectProvider } from './context/ActiveProjectContext'; // Importar el proveedor

import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Chart,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

// Definir una paleta de colores tecnológica
const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1',       // Azul Marino Profundo
      light: '#5472D3',      // Variante más clara
      dark: '#002171',       // Variante más oscura
      contrastText: '#FFFFFF', // Texto sobre primario
    },
    secondary: {
      main: '#00ACC1',       // Cyan Vibrante
      light: '#33A9C9',
      dark: '#007C91',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#FF7043',       // Naranja Suave
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5',    // Gris Claro
      paper: '#FFFFFF',      // Blanco Puro
    },
    text: {
      primary: '#212121',    // Gris Oscuro
      secondary: '#757575',  // Gris Medio
    },
    success: {
      main: '#388E3C',       // Verde Teal
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D32F2F',       // Rojo Vibrante
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFA000',       // Amarillo Mostaza
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#0288D1',       // Azul Claro
      contrastText: '#FFFFFF',
    },
    divider: '#E0E0E0',      // Gris Claro para divisores
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 4,
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FFFFFF', // Blanco para Drawer
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Evita que el texto de los botones esté en mayúsculas
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ActiveProjectProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ActiveProjectProvider>
    </AuthProvider>
  </React.StrictMode>
);
