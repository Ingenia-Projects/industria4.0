// src/pages/CursoPage.js

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Modal,
  IconButton,
  Button,
  useTheme,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

// Definición de los Módulos del Curso según Acatech
const courseModules = [
  {
    id: 1,
    title: 'Introducción a la Industria 4.0',
    description:
      'Comprende los fundamentos y la evolución hacia la cuarta revolución industrial.',
    image: 'https://via.placeholder.com/600x340.png?text=Introducción+Industria+4.0',
    slides: [
      {
        title: '¿Qué es la Industria 4.0?',
        content:
          'La Industria 4.0 es la cuarta revolución industrial que integra tecnologías digitales en los procesos de manufactura.',
      },
      {
        title: 'Historia de la Industria 4.0',
        content:
          'Evolución desde la mecanización hasta la digitalización de los procesos industriales.',
      },
      // Añadir más diapositivas según sea necesario
    ],
  },
  {
    id: 2,
    title: 'Ciberfísicos y Sistemas Inteligentes',
    description:
      'Explora la integración de sistemas ciberfísicos en la industria moderna.',
    image: 'https://via.placeholder.com/600x340.png?text=Ciberfísicos+Sistemas+Inteligentes',
    slides: [
      {
        title: 'Sistemas Ciberfísicos',
        content:
          'Integración de componentes físicos y digitales para crear sistemas inteligentes.',
      },
      {
        title: 'Aplicaciones de Sistemas Inteligentes',
        content:
          'Automatización avanzada y optimización de procesos industriales mediante inteligencia artificial.',
      },
      // Añadir más diapositivas según sea necesario
    ],
  },
  {
    id: 3,
    title: 'Internet de las Cosas (IoT) en la Manufactura',
    description:
      'Analiza cómo el IoT transforma la manufactura y mejora la eficiencia operativa.',
    image: 'https://via.placeholder.com/600x340.png?text=IoT+en+Manufactura',
    slides: [
      {
        title: 'Fundamentos del IoT',
        content:
          'Conexión de dispositivos y sistemas para recopilar y analizar datos en tiempo real.',
      },
      {
        title: 'Beneficios del IoT en la Manufactura',
        content:
          'Mejora de la eficiencia, reducción de costos y mantenimiento predictivo.',
      },
      // Añadir más diapositivas según sea necesario
    ],
  },
  // Añadir más módulos según el estándar de Acatech
  {
    id: 4,
    title: 'Big Data y Analítica Avanzada',
    description:
      'Utiliza Big Data para tomar decisiones informadas y optimizar procesos industriales.',
    image: 'https://via.placeholder.com/600x340.png?text=Big+Data+Analítica+Avanzada',
    slides: [
      {
        title: 'Introducción a Big Data',
        content:
          'Gestión y análisis de grandes volúmenes de datos para obtener insights valiosos.',
      },
      {
        title: 'Herramientas de Analítica Avanzada',
        content:
          'Uso de herramientas como machine learning y inteligencia artificial en la analítica de datos.',
      },
      // Añadir más diapositivas según sea necesario
    ],
  },
  {
    id: 5,
    title: 'Robótica Autónoma',
    description:
      'Implementa robots autónomos para mejorar la productividad y la seguridad en el entorno industrial.',
    image: 'https://via.placeholder.com/600x340.png?text=Robótica+Autónoma',
    slides: [
      {
        title: 'Tipos de Robots en la Industria',
        content:
          'Descripción de robots colaborativos, industriales y autónomos.',
      },
      {
        title: 'Integración de Robots Autónomos',
        content:
          'Cómo integrar robots en la línea de producción para automatizar tareas repetitivas.',
      },
      // Añadir más diapositivas según sea necesario
    ],
  },
  {
    id: 6,
    title: 'Manufactura Aditiva (Impresión 3D)',
    description:
      'Explora las aplicaciones de la impresión 3D en la manufactura y su impacto en la producción.',
    image: 'https://via.placeholder.com/600x340.png?text=Manufactura+Aditiva',
    slides: [
      {
        title: 'Fundamentos de la Manufactura Aditiva',
        content:
          'Proceso de creación de objetos tridimensionales mediante capas sucesivas de material.',
      },
      {
        title: 'Aplicaciones de la Impresión 3D',
        content:
          'Desde prototipos rápidos hasta producción final en diversas industrias.',
      },
      // Añadir más diapositivas según sea necesario
    ],
  },
  {
    id: 7,
    title: 'Simulación y Virtualización de Procesos',
    description:
      'Utiliza simulaciones para optimizar y virtualizar procesos industriales complejos.',
    image: 'https://via.placeholder.com/600x340.png?text=Simulación+Virtualización',
    slides: [
      {
        title: 'Importancia de la Simulación',
        content:
          'Permite probar y optimizar procesos sin interrupciones en la producción real.',
      },
      {
        title: 'Herramientas de Simulación',
        content:
          'Software y plataformas utilizadas para simular procesos industriales.',
      },
      // Añadir más diapositivas según sea necesario
    ],
  },
  {
    id: 8,
    title: 'Integración de Sistemas y Plataformas Digitales',
    description:
      'Conecta diversos sistemas y plataformas digitales para una manufactura inteligente.',
    image: 'https://via.placeholder.com/600x340.png?text=Integración+Sistemas',
    slides: [
      {
        title: 'Integración de Sistemas',
        content:
          'Conexión de sistemas ERP, MES y otros para una operación cohesiva.',
      },
      {
        title: 'Plataformas Digitales',
        content:
          'Uso de plataformas digitales para la gestión y monitoreo en tiempo real.',
      },
      // Añadir más diapositivas según sea necesario
    ],
  },
];

// Componente Principal de la Página del Curso
const CursoPage = () => {
  const theme = useTheme();
  const [selectedModule, setSelectedModule] = useState(null); // Módulo seleccionado
  const [currentSlide, setCurrentSlide] = useState(0); // Índice de la diapositiva actual
  const [openModal, setOpenModal] = useState(false); // Estado del modal de diapositivas
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado del snackbar de confirmación

  // Handler para abrir el modal con el módulo seleccionado
  const handleOpenModule = (module) => {
    setSelectedModule(module);
    setCurrentSlide(0);
    setOpenModal(true);
  };

  // Handler para cerrar el modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedModule(null);
    setCurrentSlide(0);
  };

  // Handlers para navegar entre diapositivas
  const handleNextSlide = () => {
    if (currentSlide < selectedModule.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Finalizar el curso al completar el último módulo
      setOpenSnackbar(true);
      handleCloseModal();
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Handler para cerrar el snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Grid container component="main" sx={{ minHeight: '100vh', background: theme.gradients.main }}>
      {/* Sección Principal */}
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: theme.spacing(4),
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
          }}
        >
          {/* Título del Curso */}
          <Typography component="h1" variant="h3" align="center" gutterBottom sx={{ color: '#fff', fontWeight: 'bold' }}>
            Curso de Industria 4.0
          </Typography>

          <Divider sx={{ mb: 4, bgcolor: '#fff' }} />

          {/* Lista de Módulos */}
          <Grid container spacing={4}>
            {courseModules.map((module) => (
              <Grid item xs={12} sm={6} md={4} key={module.id}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 6,
                    },
                  }}
                  onClick={() => handleOpenModule(module)}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={module.image}
                    alt={module.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {module.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {module.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button variant="contained" color="primary" fullWidth endIcon={<PlayCircleOutlineIcon />}>
                      Iniciar Módulo
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>

      {/* Modal de Diapositivas */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: '60%' },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: theme.shape.borderRadius,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          {selectedModule && (
            <>
              {/* Título del Módulo */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography id="modal-slide-title" variant="h5" component="h2">
                  {selectedModule.title}
                </Typography>
                <IconButton onClick={handleCloseModal}>
                  <CloseIcon />
                </IconButton>
              </Box>

              <Divider sx={{ mb: 4 }} />

              {/* Contenido de la Diapositiva con Animaciones */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography variant="h6" gutterBottom>
                    {selectedModule.slides[currentSlide].title}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedModule.slides[currentSlide].content}
                  </Typography>
                </motion.div>
              </AnimatePresence>

              {/* Navegación entre Diapositivas */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<KeyboardArrowLeft />}
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                >
                  Anterior
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<KeyboardArrowRight />}
                  onClick={handleNextSlide}
                >
                  {currentSlide < selectedModule.slides.length - 1 ? 'Siguiente' : 'Finalizar'}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      {/* Snackbar para Notificaciones */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          ¡Has completado todos los módulos del curso!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default CursoPage;
