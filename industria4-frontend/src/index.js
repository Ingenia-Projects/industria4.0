// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';
import { AuthProvider } from './features/Auth/context/AuthContext';
import { ActiveProjectProvider } from './context/ActiveProjectContext'; // Importar el proveedor

import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme'; // Importar el tema personalizado

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
