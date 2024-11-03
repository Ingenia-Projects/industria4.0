// routes/areas.js

const express = require('express');
const { getAreasWithSubareas } = require('../controllers/areasController');
const authMiddleware = require('../middleware/auth'); // Si deseas proteger el endpoint
const router = express.Router();

// Obtener todas las áreas y sus subáreas
router.get('/', authMiddleware, getAreasWithSubareas);

module.exports = router;
