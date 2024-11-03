// src/components/QuestionnaireDialog.js

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  MobileStepper,
  CircularProgress,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const QuestionnaireDialog = ({
  open,
  handleClose,
  questions,
  activeStep,
  handleNext,
  handleBack,
  handleResponseChange,
  responses,
  handleSubmitResponses,
  loadingQuestions,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogContent dividers>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Cuestionario de {questions[activeStep]?.Subareas?.name || 'Subárea Desconocida'}
        </Typography>
        {loadingQuestions ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : questions.length > 0 ? (
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Pregunta {activeStep + 1}: {questions[activeStep].question_text}
            </Typography>
            <RadioGroup
              value={responses[activeStep] || ''}
              onChange={handleResponseChange}
            >
              {questions[activeStep].Answers.map((answer) => (
                <FormControlLabel
                  key={answer.id}
                  value={answer.id}
                  control={<Radio />}
                  label={answer.answer_text}
                />
              ))}
            </RadioGroup>
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No hay preguntas disponibles para este cuestionario.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <MobileStepper
          variant="dots"
          steps={questions.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === questions.length - 1}
            >
              Siguiente
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Anterior
            </Button>
          }
        />
        <Box sx={{ flexGrow: 1 }} />
        <Button
          onClick={handleSubmitResponses}
          variant="contained"
          color="primary"
          disabled={questions.length === 0 || Object.keys(responses).length < questions.length}
        >
          Enviar Respuestas
        </Button>
        <Button onClick={handleClose} color="secondary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionnaireDialog;
