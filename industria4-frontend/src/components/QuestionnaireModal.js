// src/components/QuestionnaireModal.js

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  MobileStepper,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Fade,
  IconButton,
  Paper,
  Divider,
} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

// Estilizar el título del modal para incluir un botón de cierre
const StyledDialogTitle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: theme.gradients.header || theme.palette.primary.main,
  padding: theme.spacing(2),
  borderTopLeftRadius: theme.shape.borderRadius,
  borderTopRightRadius: theme.shape.borderRadius,
  color: theme.palette.common.white,
  flexWrap: 'wrap', // Permite que los elementos se envuelvan en pantallas pequeñas
}));

// Estilizar la pregunta para que destaque más
const StyledQuestion = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.75rem',
  },
}));

// Estilizar las opciones de respuesta utilizando ownerState
const StyledFormControlLabel = styled(FormControlLabel)(({ theme, ownerState }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  backgroundColor: ownerState.isSelected
    ? theme.palette.primary.light
    : theme.palette.action.hover,
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  boxShadow: ownerState.isSelected ? `0 0 10px ${theme.palette.primary.main}` : 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
  },
  '.MuiRadio-root': {
    color: ownerState.isSelected
      ? theme.palette.primary.dark
      : theme.palette.text.secondary,
    '&.Mui-checked': {
      color: theme.palette.primary.dark,
    },
  },
  '.MuiFormControlLabel-label': {
    color: ownerState.isSelected
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
    fontWeight: ownerState.isSelected ? 600 : 400,
  },
  display: 'flex',
  flexWrap: 'wrap',
}));

const QuestionnaireModal = ({
  open,
  handleClose,
  areaName,
  subareaName,
  questions,
  activeStep,
  handleNext,
  handleBack,
  handleResponseChange,
  responses,
  handleSubmitResponses,
}) => {
  const maxSteps = questions.length;

  // Función para verificar si la pregunta actual ha sido respondida
  const isCurrentQuestionAnswered = () => {
    return responses.hasOwnProperty(activeStep) && responses[activeStep] !== '';
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md" // Ajustado a 'md' para mayor flexibilidad
      fullWidth
      PaperComponent={({ children }) => (
        <Paper
          elevation={6}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '90vh', // Altura fija para controlar el layout
          }}
        >
          {children}
        </Paper>
      )}
      scroll="paper"
      sx={{
        '& .MuiDialog-paper': {
          maxHeight: '90vh',
          width: {
            xs: '90%',
            sm: '80%',
            md: '60%',
            lg: '50%',
          },
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <StyledDialogTitle>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {areaName}
          </Typography>
          {/* Puedes añadir más contenido aquí si es necesario */}
        </Box>
        <IconButton aria-label="close" onClick={handleClose} sx={{ color: 'inherit' }}>
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>
      <Fade in={open} timeout={500}>
        <DialogContent
          dividers
          sx={{
            background: 'background.paper',
            p: { xs: 2, sm: 3 },
            flexGrow: 1, // Permite que el contenido crezca y ocupe el espacio disponible
            overflowY: 'auto', // Habilita el scroll vertical si el contenido es muy largo
          }}
        >
          {questions.length > 0 && (
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  flexWrap: 'wrap', // Permite que los elementos se envuelvan en pantallas pequeñas
                }}
              >
                <StyledQuestion>
                  Pregunta {activeStep + 1} de {maxSteps}
                </StyledQuestion>
                <MobileStepper
                  variant="dots"
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  sx={{
                    flexGrow: 1,
                    ml: { xs: 0, sm: 2 },
                    mt: { xs: 1, sm: 0 },
                  }}
                />
              </Box>
              <Divider sx={{ mb: 2 }} />
              <StyledQuestion>
                {questions[activeStep].question_text}
              </StyledQuestion>
              <RadioGroup
                value={responses[activeStep] || ''}
                onChange={(e) => handleResponseChange(activeStep, e.target.value)}
              >
                {questions[activeStep].Answers.map((answer) => (
                  <StyledFormControlLabel
                    key={answer.id}
                    value={answer.id}
                    control={<Radio />}
                    label={answer.answer_text}
                    ownerState={{ isSelected: responses[activeStep] === answer.id }}
                    sx={{
                      padding: { xs: 1, sm: 1.5 },
                      marginBottom: { xs: 1, sm: 1.5 },
                    }}
                  />
                ))}
              </RadioGroup>
            </Box>
          )}
        </DialogContent>
      </Fade>
      <Divider />
      <DialogActions
        sx={{
          justifyContent: { xs: 'center', sm: 'space-between' },
          flexDirection: { xs: 'column', sm: 'row' },
          padding: 2,
          background: 'background.paper',
        }}
      >
        <Box sx={{ mb: { xs: 2, sm: 0 } }}>
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={<KeyboardArrowLeft />}
            sx={{
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              boxShadow: 1,
              '&:hover': {
                boxShadow: 3,
              },
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Anterior
          </Button>
          <Button
            size="small"
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered()}
            endIcon={<KeyboardArrowRight />}
            sx={{
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              boxShadow: 1,
              '&:hover': {
                boxShadow: 3,
              },
              ml: { xs: 0, sm: 1 },
              mt: { xs: 1, sm: 0 },
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Siguiente
          </Button>
        </Box>
        {activeStep === maxSteps - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitResponses}
            disabled={Object.keys(responses).length < maxSteps}
            sx={{
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: 2,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4,
              },
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            Enviar Respuestas
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default QuestionnaireModal;
