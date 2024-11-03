// src/api/evaluations.js

import axiosInstance from './axiosInstance';

// Obtener evaluaciones de un proyecto específico
export const getEvaluationsByProject = async (projectId) => {
  const url = `/api/evaluations/projects/${projectId}/evaluations`; // URL relativa
  console.log('Solicitando URL:', `${axiosInstance.defaults.baseURL}${url}`);
  const response = await axiosInstance.get(url);
  return response.data.evaluations;
};

// Obtener detalles de una evaluación específica
export const getEvaluationById = async (evaluationId) => {
  const url = `/api/evaluations/${evaluationId}`; // URL relativa
  console.log('Solicitando detalles de evaluación en URL:', `${axiosInstance.defaults.baseURL}${url}`);
  const response = await axiosInstance.get(url);
  return response.data.evaluation;
};

// Obtener preguntas de una subárea específica dentro de una evaluación
export const getQuestionsBySubarea = async (projectId, evaluationId, subareaId) => {
  const url = `/api/questions/projects/${projectId}/evaluations/${evaluationId}/subareas/${subareaId}/questions`; // URL relativa
  console.log('Solicitando preguntas de subárea en URL:', `${axiosInstance.defaults.baseURL}${url}`);
  const response = await axiosInstance.get(url);
  return response.data.questions;
};

// Guardar una respuesta a una pregunta
export const saveAnswer = async (projectId, evaluationId, answerData) => {
  // answerData debe contener: question_id, answer_id
  const url = `/api/answers/projects/${projectId}/evaluations/${evaluationId}/answers`; // URL relativa
  console.log('Enviando respuestas a URL:', `${axiosInstance.defaults.baseURL}${url}`);
  const response = await axiosInstance.post(url, answerData);
  return response.data;
};
