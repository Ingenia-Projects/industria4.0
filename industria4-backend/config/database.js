const { Sequelize } = require('sequelize');
require('dotenv').config();  // Cargar variables de entorno

// Configurar la conexión a la base de datos con Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    max: 3,
  },
});

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err.message);
    process.exit(1);  // Cierra la aplicación si no puede conectar a la base de datos
  }
};

module.exports = sequelize;  // Exporta sequelize por separado
module.exports.connectDB = connectDB;  // Exporta connectDB por separado
