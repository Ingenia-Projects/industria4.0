// src/components/QuestionnaireStepper.js

import React from 'react';
import {
  Box,
  Typography,
  Button,
  MobileStepper,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const QuestionnaireStepper = ({
  questions,
  activeStep,
  handleNext,
  handleBack,
  handleResponseChange,
  responses,
  handleSubmitResponses,
}) => {
  const maxSteps = questions.length;

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Cuestionario de {questions[activeStep].Subarea?.name || 'Subárea Desconocida'}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Pregunta {activeStep + 1} de {maxSteps}
      </Typography>
      <Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {questions[activeStep].question_text}
        </Typography>
        <RadioGroup
          value={responses[activeStep] || ''}
          onChange={(e) => handleResponseChange(activeStep, e.target.value)}
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
      <MobileStepper
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ mt: 2 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Siguiente
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Anterior
          </Button>
        }
      />
      {activeStep === maxSteps - 1 && (
        <Box sx={{ textAlign: 'right', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitResponses}
            disabled={Object.keys(responses).length < maxSteps}
          >
            Enviar Respuestas
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default QuestionnaireStepper;
