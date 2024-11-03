// src/api/axiosInstance.js

import axios from 'axios';

// Define la URL base del backend
const backendBaseUrl = 'http://localhost:4000'; // Cambia el puerto si tu backend usa otro

const axiosInstance = axios.create({
  baseURL: backendBaseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

export default axiosInstance;
