// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 4000;

sequelize
  .authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos exitosa');
  })
  .catch((err) => {
    console.error('❌ Error al conectar a la base de datos:', err.message);
  });

app.use(cors({
  origin: 'http://localhost:3000', // Ajusta esto según tu configuración
  credentials: true,
}));
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('Industria 4.0 Backend is running');
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
