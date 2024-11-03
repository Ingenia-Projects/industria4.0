// routes/answers.js

const express = require('express');
const { saveAnswer } = require('../controllers/answersController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

/**
 * @route   POST /api/answers/projects/:projectId/evaluations/:evaluationId/answers
 * @desc    Guarda la respuesta seleccionada por el usuario y actualiza los scores y progreso en tiempo real
 * @access  Privado
 */
router.post('/projects/:projectId/evaluations/:evaluationId/answers', authMiddleware, saveAnswer);

module.exports = router;
