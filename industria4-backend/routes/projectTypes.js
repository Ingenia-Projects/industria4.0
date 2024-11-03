// routes/projectTypes.js

const express = require('express');
const { getProjectTypes } = require('../controllers/projectTypesController');
const authMiddleware = require('../middleware/auth'); // Opcional: Si deseas proteger este endpoint
const router = express.Router();

// Obtener todos los tipos de proyectos
router.get('/', authMiddleware, getProjectTypes); // Asegúrate de que getProjectTypes está definido

module.exports = router;
