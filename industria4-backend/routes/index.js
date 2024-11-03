// routes/index.js

const express = require('express');
const authRoutes = require('./auth');
const projectRoutes = require('./projects');
const projectTypesRoutes = require('./projectTypes');
const evaluationsRoutes = require('./evaluations');
const answersRoutes = require('./answers');
const questionsRoutes = require('./questions');
// Asegúrate de importar cualquier otra ruta adicional que tengas

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/projects', projectRoutes);
router.use('/projecttypes', projectTypesRoutes);
router.use('/evaluations', evaluationsRoutes);
router.use('/answers', answersRoutes);
router.use('/questions', questionsRoutes);
// Asegúrate de incluir las rutas adicionales aquí

module.exports = router;
