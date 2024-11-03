// controllers/questionsController.js

const {
  Projects,
  Evaluations,
  SubareaEvaluations,
  Questions,
  Answer,
  Subareas,
  sequelize,
} = require('../models');

exports.getQuestionsByEvaluation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { projectId, evaluationId } = req.params;

    // Verificar que el proyecto pertenece al usuario
    const project = await Projects.findOne({
      where: { project_id: projectId, user_id: userId },
    });

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado o no tienes acceso.' });
    }

    // Verificar que la evaluación pertenece al proyecto
    const evaluation = await Evaluations.findOne({
      where: { id: evaluationId, project_id: projectId },
    });

    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluación no encontrada o no pertenece al proyecto.' });
    }

    // Obtener las preguntas y respuestas asociadas a la evaluación
    const questions = await Questions.findAll({
      include: [
        {
          model: Subareas,
          attributes: ['id', 'name'], // Asegúrate de que el campo es 'name'
          include: [
            {
              model: SubareaEvaluations,
              where: { evaluation_id: evaluationId },
              attributes: [],
            },
          ],
        },
        {
          model: Answer,
          attributes: ['id', 'answer_text', 'level'],
        },
      ],
      attributes: ['id', 'question_text', 'subarea_id'],
      order: [['subarea_id', 'ASC'], ['id', 'ASC']],
    });

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No se encontraron preguntas para esta evaluación.' });
    }

    return res.status(200).json({ questions });
  } catch (error) {
    console.error('Error al obtener las preguntas:', error.message);
    return res.status(500).json({ message: 'Error al obtener las preguntas', error: error.message });
  }
};

exports.getQuestionsBySubarea = async (req, res) => {
  try {
    const userId = req.user.id;
    const { projectId, evaluationId, subareaId } = req.params;

    // Verificar que el proyecto pertenece al usuario
    const project = await Projects.findOne({
      where: { project_id: projectId, user_id: userId },
    });

    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado o no tienes acceso.' });
    }

    // Verificar que la evaluación pertenece al proyecto
    const evaluation = await Evaluations.findOne({
      where: { id: evaluationId, project_id: projectId },
    });

    if (!evaluation) {
      return res.status(404).json({ message: 'Evaluación no encontrada o no pertenece al proyecto.' });
    }

    // Verificar que la subárea pertenece a la evaluación
    const subareaEvaluation = await SubareaEvaluations.findOne({
      where: { evaluation_id: evaluationId, subarea_id: subareaId },
    });

    if (!subareaEvaluation) {
      return res.status(404).json({ message: 'Subárea no encontrada o no pertenece a la evaluación.' });
    }

    // Obtener las preguntas y respuestas de la subárea
    const questions = await Questions.findAll({
      where: { subarea_id: subareaId },
      include: [
        {
          model: Answer,
          attributes: ['id', 'answer_text', 'level'],
        },
      ],
      attributes: ['id', 'question_text', 'subarea_id'],
      order: [['id', 'ASC']],
    });

    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No se encontraron preguntas para esta subárea.' });
    }

    return res.status(200).json({ questions });
  } catch (error) {
    console.error('Error al obtener las preguntas:', error.message);
    return res.status(500).json({ message: 'Error al obtener las preguntas', error: error.message });
  }
};
