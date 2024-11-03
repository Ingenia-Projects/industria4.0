// src/theme.js

import { createTheme } from '@mui/material/styles';
import { grey, blueGrey, deepPurple, cyan, orange, green, red, yellow, blue } from '@mui/material/colors';

// Definir gradientes estandarizados
const gradients = {
  sidebar: 'linear-gradient(45deg, #424242 30%, #1a237e 90%)',
  header: 'linear-gradient(45deg, #3B4A59 30%, #5C738D 90%)',
  main: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
};

// Definir sombras estandarizadas
const shadows = {
  appBar: '0 4px 6px rgba(0, 0, 0, 0.3)',
  drawer: '2px 0 8px rgba(0,0,0,0.3)',
  main: 'inset 0 0 10px rgba(0,0,0,0.05)',
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D47A1', // Azul Marino Profundo (Mantener colores del sidebar)
      light: '#5472D3',
      dark: '#002171',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00ACC1', // Cyan Vibrante
      light: '#33A9C9',
      dark: '#007C91',
      contrastText: '#FFFFFF',
    },
    accent: {
      main: '#FF7043', // Naranja Suave
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5', // Gris Claro
      paper: '#FFFFFF', // Blanco Puro
    },
    text: {
      primary: '#212121', // Gris Oscuro
      secondary: '#757575', // Gris Medio
    },
    success: {
      main: green[600], // Verde Teal
      contrastText: '#FFFFFF',
    },
    error: {
      main: red[600], // Rojo Vibrante
      contrastText: '#FFFFFF',
    },
    warning: {
      main: orange[700], // Amarillo Mostaza
      contrastText: '#FFFFFF',
    },
    info: {
      main: blue[600], // Azul Claro
      contrastText: '#FFFFFF',
    },
    divider: grey[300], // Gris Claro para divisores
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    button: {
      textTransform: 'none', // Evitar mayúsculas automáticas en botones
      fontWeight: 600,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          background: gradients.header, // Usar gradiente estandarizado
          boxShadow: shadows.appBar, // Usar sombra estandarizada
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: gradients.sidebar, // Usar gradiente estandarizado
          color: '#FFFFFF',
          position: 'fixed',
          height: '100vh',
          transition: 'width 0.3s ease-in-out',
          overflowX: 'hidden',
          boxShadow: shadows.drawer, // Usar sombra estandarizada
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
    MuiListSubheader: {
      styleOverrides: {
        root: {
          color: '#FFFFFF', // Color blanco para subencabezados
          fontWeight: 'bold',
          textTransform: 'uppercase', // Texto en mayúsculas para subencabezados
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: '#FFFFFF', // Texto blanco para items de lista
          fontWeight: 500,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.3)', // Dividers translúcidos
          height: '1px',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: grey[800], // Fondo oscuro para los tooltips
          color: '#FFFFFF', // Texto blanco en los tooltips
          fontSize: '0.875rem',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: grey[50], // Fondo claro para el menú desplegable
          color: grey[900], // Texto oscuro en el menú
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Sombra para tridimensionalidad
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: blueGrey[500], // Azul grisáceo medio al pasar el cursor
            color: '#FFFFFF', // Texto blanco al pasar el cursor
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: blueGrey[500], // Fondo azul grisáceo medio para los avatares
          color: '#FFFFFF', // Texto blanco en los avatares
        },
      },
    },
  },
  // Añadir gradientes y sombras como variables del tema si es necesario
  gradients,
  shadows,
});

export default theme;
