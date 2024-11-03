// src/pages/EvaluacionPage.js

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Chip,
  Divider,
  Snackbar,
  Alert,
  Button,
  Paper,
} from '@mui/material';
import {
  getEvaluationsByProject,
  getEvaluationById,
  getQuestionsBySubarea,
  saveAnswer,
} from '../api/evaluations';
import QuestionnaireModal from '../components/QuestionnaireModal';
import { styled } from '@mui/material/styles';

// Crear un contenedor con degradado para el encabezado
const HeaderBox = styled(Box)(({ theme }) => ({
  background: theme.gradients.header, // Usar gradiente del tema
  padding: theme.spacing(2), // Reducir padding para hacerlo más pequeño
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows.appBar, // Usar sombra estandarizada
  color: theme.palette.common.white,
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

// Estilizar los botones de evaluación
const EvaluationButton = styled(Button)(({ theme, selected }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: theme.spacing(2),
  textTransform: 'none',
  borderRadius: theme.shape.borderRadius,
  boxShadow: selected ? theme.shadows[6] : theme.shadows[1],
  transition: 'box-shadow 0.3s ease, background-color 0.3s ease',
  backgroundColor: selected ? theme.palette.primary.dark : 'inherit',
  color: selected ? theme.palette.common.white : 'inherit',
  '&:hover': {
    boxShadow: theme.shadows[8],
    backgroundColor: selected
      ? theme.palette.primary.main
      : theme.palette.action.hover,
  },
}));

const EvaluacionPage = () => {
  const [projectName, setProjectName] = useState('');
  const [projectId, setProjectId] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [selectedSubarea, setSelectedSubarea] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [loadingEvaluations, setLoadingEvaluations] = useState(true);
  const [loadingEvaluationDetails, setLoadingEvaluationDetails] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [error, setError] = useState(null);
  const [responses, setResponses] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [openQuestionnaire, setOpenQuestionnaire] = useState(false);

  // Leer proyecto activo desde localStorage al montar el componente
  useEffect(() => {
    const storedProjectId = localStorage.getItem('activeProjectId');
    const storedProjectName = localStorage.getItem('activeProjectName');
    if (storedProjectId && storedProjectName) {
      setProjectId(storedProjectId);
      setProjectName(storedProjectName);
    } else {
      setError(
        'No hay un proyecto activo seleccionado. Por favor, selecciona un proyecto en la página de inicio.'
      );
      setLoadingEvaluations(false);
    }
  }, []);

  // Cargar evaluaciones del proyecto activo
  useEffect(() => {
    const fetchEvaluations = async () => {
      if (projectId) {
        try {
          const evaluationsData = await getEvaluationsByProject(projectId);
          setEvaluations(evaluationsData);
          setLoadingEvaluations(false);
        } catch (err) {
          console.error('Error al cargar las evaluaciones:', err);
          setError('Ocurrió un error al cargar las evaluaciones.');
          setLoadingEvaluations(false);
        }
      }
    };
    fetchEvaluations();
  }, [projectId]);

  // Manejar el clic en un botón de evaluación
  const handleSelectEvaluation = async (evaluation) => {
    setLoadingEvaluationDetails(true);
    try {
      const evaluationDetails = await getEvaluationById(evaluation.id);
      console.log('Detalles de la Evaluación:', evaluationDetails); // Para depuración
      setSelectedEvaluation(evaluationDetails);
      setSelectedSubarea(null); // Resetear subárea seleccionada
    } catch (err) {
      console.error('Error al obtener detalles de la evaluación:', err);
      setError('Ocurrió un error al obtener los detalles de la evaluación.');
    } finally {
      setLoadingEvaluationDetails(false);
    }
  };

  // Manejar el clic en un botón de subárea para abrir el cuestionario
  const handleOpenQuestionnaire = async (subarea) => {
    setLoadingQuestions(true);
    try {
      const questionsData = await getQuestionsBySubarea(
        projectId,
        selectedEvaluation.id,
        subarea.subarea_id
      );
      setQuestions(questionsData);
      setSelectedSubarea(subarea);
      setActiveStep(0); // Resetear al inicio del cuestionario
      setOpenQuestionnaire(true); // Abrir el modal
    } catch (err) {
      console.error('Error al obtener las preguntas:', err);
      setError('Ocurrió un error al obtener las preguntas del cuestionario.');
    } finally {
      setLoadingQuestions(false);
    }
  };

  // Manejar el cambio de respuesta
  const handleResponseChange = (questionIndex, answerId) => {
    setResponses({
      ...responses,
      [questionIndex]: answerId,
    });
  };

  // Enviar respuestas
  const handleSubmitResponses = async () => {
    // Validar que todas las preguntas hayan sido respondidas
    if (Object.keys(responses).length < questions.length) {
      setSnackbar({
        open: true,
        message: 'Por favor, responde todas las preguntas antes de enviar.',
        severity: 'warning',
      });
      return;
    }

    // Preparar los datos de las respuestas
    const answerData = Object.keys(responses).map((questionIndex) => ({
      question_id: questions[questionIndex].id,
      answer_id: responses[questionIndex],
    }));

    try {
      for (let answer of answerData) {
        await saveAnswer(projectId, selectedEvaluation.id, answer);
      }
      setSnackbar({
        open: true,
        message: 'Respuestas enviadas exitosamente.',
        severity: 'success',
      });
      setSelectedSubarea(null);
      setQuestions([]);
      setResponses({});
      setOpenQuestionnaire(false); // Cerrar el modal
    } catch (err) {
      console.error('Error al guardar las respuestas:', err);
      setSnackbar({
        open: true,
        message: 'Error al enviar las respuestas.',
        severity: 'error',
      });
    }
  };

  // Manejar cierre del Snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loadingEvaluations) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10, px: 2 }}>
        <Typography variant="h6" color="error" textAlign="center">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        background: theme => theme.gradients.main, // Usar gradiente principal del tema
        minHeight: '100vh',
      }}
    >
      {/* Encabezado con degradado mostrando el nombre del proyecto */}
      <HeaderBox>
        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
          {projectName}
        </Typography>
      </HeaderBox>

      <Grid container spacing={4}>
        {/* Panel de Evaluaciones */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2, borderRadius: 2, backgroundColor: 'background.paper' }}>
            <Divider sx={{ mb: 2 }} />
            {evaluations.map((evaluation) => (
              <Box key={evaluation.id} sx={{ mb: 2 }}>
                <EvaluationButton
                  variant={selectedEvaluation?.id === evaluation.id ? 'contained' : 'outlined'}
                  color="primary"
                  fullWidth
                  onClick={() => handleSelectEvaluation(evaluation)}
                  selected={selectedEvaluation?.id === evaluation.id}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {evaluation.Area?.name || 'Evaluación sin nombre'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <CircularProgress
                      variant="determinate"
                      value={evaluation.progress || 0}
                      size={20}
                      sx={{ color: 'secondary.main' }}
                    />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {evaluation.progress || 0}%
                    </Typography>
                  </Box>
                </EvaluationButton>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Panel de Detalles de Evaluación */}
        <Grid item xs={12} md={8}>
          {loadingEvaluationDetails ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
              <CircularProgress />
            </Box>
          ) : selectedEvaluation ? (
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: 'background.paper' }}>
              <Divider sx={{ mb: 2 }} />

              {/* Lista de Subevaluaciones */}
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
                Subevaluaciones
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {selectedEvaluation.SubareaEvaluations.map((subeval) => (
                <Box key={subeval.id} sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {subeval.Subarea?.name || 'Subárea Desconocida'}
                    </Typography>
                    {subeval.completion_status ? (
                      <Chip
                        label={`Completado (${subeval.score || 0})`}
                        color="success"
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    ) : (
                      <Chip
                        label="En Progreso"
                        color="warning"
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    )}
                  </Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {subeval.description || 'No hay descripción disponible.'}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpenQuestionnaire(subeval)}
                    disabled={loadingQuestions && selectedSubarea?.subarea_id === subeval.subarea_id}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 500,
                      boxShadow: 1,
                      transition: 'box-shadow 0.3s ease',
                      '&:hover': {
                        boxShadow: 3,
                      },
                    }}
                  >
                    {loadingQuestions && selectedSubarea?.subarea_id === subeval.subarea_id ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      'Acceder al Cuestionario'
                    )}
                  </Button>
                </Box>
              ))}
            </Paper>
          ) : (
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: 'background.paper' }}>
              <Typography variant="h6" color="text.secondary" textAlign="center">
                Selecciona una evaluación para ver sus detalles.
              </Typography>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Modal del Cuestionario */}
      <QuestionnaireModal
        open={openQuestionnaire}
        handleClose={() => setOpenQuestionnaire(false)}
        areaName={selectedEvaluation?.Area?.name || ''}
        subareaName={selectedSubarea?.Subarea?.name || ''}
        questions={questions}
        activeStep={activeStep}
        handleNext={() => setActiveStep((prev) => prev + 1)}
        handleBack={() => setActiveStep((prev) => prev - 1)}
        handleResponseChange={handleResponseChange}
        responses={responses}
        handleSubmitResponses={handleSubmitResponses}
      />

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EvaluacionPage;
