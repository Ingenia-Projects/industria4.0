// controllers/answersController.js

const {
  ValuationAnswers,
  SubareaEvaluations,
  Evaluations,
  Questions,
  Projects,
  Answer,
  sequelize,
} = require('../models');
const { Op } = require('sequelize');

/**
 * Función para calcular el score basado en la opción seleccionada.
 * Retorna el nivel asociado a la respuesta seleccionada.
 */
function getScoreFromAnswer(answer) {
  return answer.level;
}

/**
 * Función para calcular el progreso de la evaluación.
 * Calcula el porcentaje de preguntas respondidas sobre el total.
 */
async function calculateEvaluationProgress(evaluationId, transaction) {
  // Total de preguntas asociadas a la evaluación
  const totalQuestions = await Questions.count({
    where: {
      subarea_id: {
        [Op.in]: sequelize.literal(
          `(SELECT subarea_id FROM subarea_evaluations WHERE evaluation_id = ${evaluationId})`
        ),
      },
    },
    transaction,
  });

  // Preguntas respondidas en la evaluación
  const answeredQuestions = await ValuationAnswers.count({
    where: { evaluation_id: evaluationId },
    transaction,
  });

  const progress = totalQuestions === 0 ? 0 : (answeredQuestions / totalQuestions) * 100;

  return progress;
}

/**
 * Función para guardar la respuesta y actualizar los scores y progreso.
 */
exports.saveAnswer = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.user.id;
    const { projectId, evaluationId } = req.params;
    const { question_id, answer_id } = req.body;

    // Validar entrada
    if (!question_id || !answer_id) {
      await t.rollback();
      return res.status(400).json({ message: 'Pregunta y respuesta seleccionada son requeridas.' });
    }

    // Verificar que el proyecto pertenece al usuario
    const project = await Projects.findOne({
      where: { project_id: projectId, user_id: userId },
      transaction: t,
    });

    if (!project) {
      await t.rollback();
      return res.status(404).json({ message: 'Proyecto no encontrado o no tienes acceso.' });
    }

    // Verificar que la evaluación pertenece al proyecto
    const evaluation = await Evaluations.findOne({
      where: { id: evaluationId, project_id: projectId },
      transaction: t,
    });

    if (!evaluation) {
      await t.rollback();
      return res.status(404).json({ message: 'Evaluación no encontrada o no pertenece al proyecto.' });
    }

    // Verificar que la pregunta pertenece a una subárea de la evaluación
    const question = await Questions.findOne({
      where: { id: question_id },
      attributes: ['id', 'subarea_id'],
      transaction: t,
    });

    if (!question) {
      await t.rollback();
      return res.status(404).json({ message: 'Pregunta no encontrada.' });
    }

    // Verificar que la respuesta pertenece a la pregunta
    const answer = await Answer.findOne({
      where: { id: answer_id, question_id: question_id },
      attributes: ['id', 'level'],
      transaction: t,
    });

    if (!answer) {
      await t.rollback();
      return res.status(400).json({ message: 'Respuesta no válida para la pregunta especificada.' });
    }

    // Guardar o actualizar la respuesta en ValuationAnswers
    await ValuationAnswers.upsert(
      {
        question_id: question.id,
        project_id: projectId,
        evaluation_id: evaluationId,
        answer_id: answer.id,
      },
      { transaction: t }
    );

    // Obtener todas las respuestas de la subárea
    const subareaAnswers = await ValuationAnswers.findAll({
      where: {
        evaluation_id: evaluationId,
        question_id: {
          [Op.in]: sequelize.literal(`SELECT id FROM questions WHERE subarea_id = ${question.subarea_id}`),
        },
      },
      include: [
        {
          model: Answer,
          attributes: ['level'],
        },
      ],
      attributes: ['answer_id'],
      transaction: t,
    });

    // Calcular el promedio de las respuestas de la subárea
    const totalSubareaAnswers = subareaAnswers.length;
    const sumSubareaScores = subareaAnswers.reduce((acc, va) => acc + va.Answer.level, 0);
    const subareaScore = totalSubareaAnswers === 0 ? 0 : sumSubareaScores / totalSubareaAnswers;

    // Actualizar el score en SubareaEvaluations
    await SubareaEvaluations.update(
      { score: subareaScore },
      {
        where: {
          evaluation_id: evaluationId,
          subarea_id: question.subarea_id,
        },
        transaction: t,
      }
    );

    // Obtener todas las subáreas de la evaluación
    const subareas = await SubareaEvaluations.findAll({
      where: { evaluation_id: evaluationId },
      attributes: ['score'],
      transaction: t,
    });

    // Calcular el promedio de los scores de todas las subáreas
    const totalSubareas = subareas.length;
    const sumScores = subareas.reduce((acc, sub) => acc + sub.score, 0);
    const overallScore = totalSubareas === 0 ? 0 : sumScores / totalSubareas;

    // Calcular el progreso de la evaluación
    const progress = await calculateEvaluationProgress(evaluationId, t);

    // Actualizar la evaluación con el nuevo overall_score y progress
    await Evaluations.update(
      {
        overall_score: overallScore,
        progress: progress,
      },
      {
        where: { id: evaluationId },
        transaction: t,
      }
    );

    await t.commit();

    return res.status(200).json({ message: 'Respuesta guardada y progreso actualizado.', overallScore, progress });
  } catch (error) {
    await t.rollback();
    console.error('Error al guardar la respuesta:', error.message);
    return res.status(500).json({ message: 'Error al guardar la respuesta', error: error.message });
  }
};
