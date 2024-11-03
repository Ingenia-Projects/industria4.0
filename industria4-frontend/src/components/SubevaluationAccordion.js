// src/components/SubevaluationAccordion.js

import React from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  Box,
  Button,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SubevaluationAccordion = ({ subeval, handleOpenQuestionnaire, loadingQuestionnaire }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`subeval-${subeval.id}-content`}
        id={`subeval-${subeval.id}-header`}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="subtitle1">
            {subeval.Subarea?.name || 'Subárea Desconocida'}
          </Typography>
          {subeval.completion_status ? (
            <Chip label={`Completado (${subeval.score || 0})`} color="success" size="small" />
          ) : (
            <Chip label="En Progreso" color="warning" size="small" />
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">
            {subeval.description || 'No hay descripción disponible.'}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleOpenQuestionnaire(subeval)}
            disabled={loadingQuestionnaire && loadingQuestionnaire.id === subeval.id}
          >
            {loadingQuestionnaire && loadingQuestionnaire.id === subeval.id ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Acceder al Cuestionario'
            )}
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default SubevaluationAccordion;
