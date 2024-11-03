// src/pages/HomePage.js

import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  InputLabel,
  FormControl,
  Divider,
  Tooltip,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip, // Agregado Chip
  Collapse, // Agregado Collapse
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess'; // Agregado ExpandLessIcon
import { MoreVert, CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../features/Auth/context/AuthContext';
import DialogContentText from '@mui/material/DialogContentText'; // Agregado DialogContentText

// Importar las funciones de la API
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../api/projects';
import { getProjectTypes } from '../api/projectTypes';
import { getEvaluationsByProject } from '../api/evaluations';

// Importar el contexto del proyecto activo
import { ActiveProjectContext } from '../context/ActiveProjectContext';

// Subcomponente para mostrar cada Subárea de Evaluación
const SubareaEvaluation = ({ subEval }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Typography variant="body2" sx={{ flexGrow: 1 }}>
        {subEval.Subarea?.name || 'Subárea Desconocida'}
      </Typography>
      <Typography variant="body2" sx={{ mr: 2 }}>
        Puntuación: {subEval.score}
      </Typography>
      {subEval.completion_status && (
        <Tooltip title="Completado">
          <CheckCircle color="success" />
        </Tooltip>
      )}
    </Box>
  );
};

// Subcomponente para mostrar cada Área de Evaluación
const EvaluationArea = ({ evaluation }) => {
  const progressColor = evaluation.progress === 100 ? 'success' : 'primary';
  const progressLabel =
    evaluation.progress === 100 ? 'Completado' : 'En Progreso';

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${evaluation.id}-content`}
        id={`panel-${evaluation.id}-header`}
      >
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              {evaluation.Area?.name || 'Área Desconocida'}
            </Typography>
            <Chip
              label={progressLabel}
              color={evaluation.progress === 100 ? 'success' : 'primary'}
              size="small"
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
            <LinearProgress
              variant="determinate"
              value={evaluation.progress}
              color={progressColor}
              sx={{ flexGrow: 1, mr: 2, height: 10, borderRadius: 5 }}
            />
            <Typography variant="body2" color="text.secondary">
              {evaluation.progress}%
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ pl: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Subáreas:
          </Typography>
          {evaluation.SubareaEvaluations && evaluation.SubareaEvaluations.length > 0 ? (
            evaluation.SubareaEvaluations.map((subEval) => (
              <SubareaEvaluation key={subEval.id} subEval={subEval} />
            ))
          ) : (
            <Typography variant="body2" color="text.secondary">
              No hay subáreas disponibles.
            </Typography>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

// Subcomponente para la Tarjeta del Proyecto
const ProjectCard = ({
  project,
  isActive,
  onEdit,
  onDelete,
  onSetActive,
  navigate,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    event.stopPropagation(); // Evita que se active el onSetActive al abrir el menú
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Extraer evaluaciones (por áreas)
  const evaluations = project.evaluations || [];

  // Determinar si la evaluación está completada
  const isEvaluationCompleted =
    evaluations.length > 0 && evaluations.every((e) => e.progress === 100);

  return (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid',
        borderColor: isActive ? 'primary.main' : 'grey.300',
        boxShadow: isActive ? 6 : 1,
        backgroundColor: isActive ? 'background.default' : 'background.paper',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 6,
        },
      }}
    >
      {isActive && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '5px',
            width: '100%',
            backgroundColor: 'primary.main',
          }}
        />
      )}
      <CardContent
        sx={{
          flexGrow: 1,
          cursor: 'pointer',
          paddingBottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start', // Alinear hacia arriba
          alignItems: 'stretch', // Ocupa todo el ancho
          textAlign: 'left', // Alineación del texto
        }}
        onClick={() => onSetActive(project.project_id, project.project_name)}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Nombre del Proyecto en negrita y destacado */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {project.project_name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
              Tipo de Proyecto: {project.ProjectType?.name || 'No especificado'}
            </Typography>
          </Box>
          {/* Botón de menú (editar/eliminar) alineado a la derecha */}
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
        </Box>
        {isActive && (
          <Chip label="Activo" color="primary" size="small" sx={{ mt: 1 }} />
        )}

        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
        >
          <MenuItem onClick={onEdit}>Editar</MenuItem>
          <MenuItem onClick={onDelete}>Eliminar</MenuItem>
        </Menu>

        <Divider sx={{ my: 2 }} />
        {/* Descripción del Proyecto */}
        <Typography variant="body2" color="text.secondary">
          {project.description || 'No hay descripción disponible.'}
        </Typography>

        {/* Mostrar evaluaciones por área */}
        {evaluations.length > 0 ? (
          <Box sx={{ mt: 2 }}>
            {evaluations.map((evaluation) => (
              <EvaluationArea key={evaluation.id} evaluation={evaluation} />
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            No hay evaluaciones disponibles.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

// Componente Principal de la Página de Inicio
const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { activeProjectId, setActiveProjectById } = useContext(ActiveProjectContext);

  const [projects, setProjects] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el modal de Crear/Editar Proyecto
  const [openProjectModal, setOpenProjectModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState({
    project_id: null,
    project_name: '',
    description: '',
    project_type_id: '',
  });

  // Estado para el diálogo de confirmación al eliminar
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  // Estado para controlar la carga al guardar (crear/editar)
  const [isSaving, setIsSaving] = useState(false);

  // Estado para controlar la visibilidad de la guía de uso
  const [showGuide, setShowGuide] = useState(false);

  // Función para cargar los proyectos y sus evaluaciones
  const fetchProjectsAndEvaluations = async () => {
    setLoading(true);
    setError(null);
    try {
      const projectsData = await getProjects();

      // Verificar si no hay proyectos
      if (projectsData.length === 0) {
        setProjects([]);
        setActiveProjectById(null); // Evitar llamadas a /api/projects/undefined
        setLoading(false);
        return;
      }

      // Obtener evaluaciones y detalles de cada proyecto
      const projectsWithEvaluations = await Promise.all(
        projectsData.map(async (project) => {
          try {
            console.log('Obteniendo evaluaciones para el proyecto:', project.project_id);
            const evaluations = await getEvaluationsByProject(project.project_id);

            return {
              ...project,
              evaluations: evaluations,
            };
          } catch (evalError) {
            console.error(
              `Error al obtener las evaluaciones del proyecto ${project.project_id}:`,
              evalError
            );
            return {
              ...project,
              evaluations: [],
            };
          }
        })
      );

      setProjects(projectsWithEvaluations);
      setLoading(false);
    } catch (error) {
      // Manejar específicamente el error 404
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.message === 'No se encontraron proyectos para este usuario.'
      ) {
        setProjects([]);
        setActiveProjectById(null);
      } else {
        console.error('Error al cargar los proyectos:', error);
        setError('Ocurrió un error al cargar los proyectos.');
      }
      setLoading(false);
    }
  };

  // Función para cargar los tipos de proyectos
  const fetchProjectTypes = async () => {
    try {
      const data = await getProjectTypes();
      setProjectTypes(data);
    } catch (error) {
      console.error('Error al cargar los tipos de proyectos:', error);
    }
  };

  useEffect(() => {
    fetchProjectsAndEvaluations();
    fetchProjectTypes();
  }, []);

  useEffect(() => {
    // Si hay solo un proyecto, establecerlo como activo automáticamente
    if (projects.length === 1 && projects[0].project_id !== activeProjectId) {
      const project = projects[0];
      handleSetActiveProject(project.project_id, project.project_name);
    }
  }, [projects, activeProjectId]);

  // Función para establecer el proyecto activo y guardarlo en localStorage
  const handleSetActiveProject = (projectId, projectName) => {
    setActiveProjectById(projectId);

    // Guardar el proyecto activo en localStorage
    localStorage.setItem('activeProjectId', projectId);
    localStorage.setItem('activeProjectName', projectName);
  };

  const handleOpenProjectModal = (project = null) => {
    if (project) {
      // Editar proyecto existente
      setIsEditing(true);
      setCurrentProject({
        project_id: project.project_id,
        project_name: project.project_name,
        description: project.description,
        project_type_id: project.project_type_id || '',
      });
    } else {
      // Crear nuevo proyecto
      setIsEditing(false);
      setCurrentProject({
        project_id: null,
        project_name: '',
        description: '',
        project_type_id: '',
      });
    }
    setOpenProjectModal(true);
  };

  const handleCloseProjectModal = () => {
    if (!isSaving) { // Permitir cerrar solo si no está guardando
      setOpenProjectModal(false);
      setCurrentProject({
        project_id: null,
        project_name: '',
        description: '',
        project_type_id: '',
      });
    }
  };

  const handleSaveProject = async () => {
    setIsSaving(true); // Iniciar estado de carga
    try {
      if (isEditing) {
        // Actualizar proyecto existente
        const updatedProject = await updateProject(
          currentProject.project_id,
          currentProject
        );

        // Asignar ProjectType al proyecto actualizado
        const projectType = projectTypes.find(
          (type) => type.id === updatedProject.project_type_id
        );
        if (projectType) {
          updatedProject.ProjectType = projectType;
        }

        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.project_id === updatedProject.project_id
              ? { ...project, ...updatedProject }
              : project
          )
        );

        // Si el proyecto actualizado es el activo, actualizar localStorage
        if (updatedProject.project_id === activeProjectId) {
          localStorage.setItem('activeProjectName', updatedProject.project_name);
        }
      } else {
        // Crear nuevo proyecto
        const newProject = await createProject(currentProject);
        // Obtener evaluaciones y detalles para el nuevo proyecto
        const evaluations = await getEvaluationsByProject(newProject.project_id);
        newProject.evaluations = evaluations;

        // Asignar ProjectType al nuevo proyecto
        const projectType = projectTypes.find(
          (type) => type.id === newProject.project_type_id
        );
        if (projectType) {
          newProject.ProjectType = projectType;
        }

        setProjects((prevProjects) => [...prevProjects, newProject]);

        // Establecer como activo automáticamente si es el único proyecto
        if (projects.length === 0) {
          handleSetActiveProject(newProject.project_id, newProject.project_name);
        }
      }
      handleCloseProjectModal();
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
      // Aquí puedes agregar notificaciones de error si lo deseas
    } finally {
      setIsSaving(false); // Finalizar estado de carga
    }
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(projectToDelete.project_id);
      setProjects((prevProjects) =>
        prevProjects.filter(
          (project) => project.project_id !== projectToDelete.project_id
        )
      );
      // Si el proyecto eliminado es el activo, resetear el proyecto activo
      if (projectToDelete.project_id === activeProjectId) {
        if (projects.length > 1) {
          // Si hay otros proyectos, establecer el primero como activo
          const remainingProjects = projects.filter(
            (project) => project.project_id !== projectToDelete.project_id
          );
          const newActiveProject = remainingProjects[0];
          handleSetActiveProject(newActiveProject.project_id, newActiveProject.project_name);
        } else {
          setActiveProjectById(null);
          localStorage.removeItem('activeProjectId');
          localStorage.removeItem('activeProjectName');
        }
      }
      setProjectToDelete(null);
      setOpenConfirmDelete(false);
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
      // Aquí puedes agregar notificaciones de error si lo deseas
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <Typography variant="h6">Cargando proyectos...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      {/* Sección de Acciones Rápidas */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenProjectModal()}
        >
          Crear Nuevo Proyecto
        </Button>
        <Button
          variant="outlined"
          startIcon={showGuide ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          onClick={() => setShowGuide((prev) => !prev)}
        >
          {showGuide ? 'Ocultar Guía de Uso' : 'Mostrar Guía de Uso'}
        </Button>
      </Box>

      {/* Sección de Guía de Uso */}
      <Collapse in={showGuide}>
        <Box sx={{ mt: 2 }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="intro-content"
              id="intro-header"
            >
              <Typography>Introducción</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="div">
                Esta aplicación te permite gestionar tus proyectos de manera eficiente. Puedes crear, editar y eliminar proyectos, realizar evaluaciones, y acceder a tu roadmap y reportes.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="workflow-content"
              id="workflow-header"
            >
              <Typography>Flujo de Trabajo</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="div">
                El flujo de trabajo de la aplicación se divide en las siguientes etapas:
                <ol>
                  <li><strong>Crear Proyecto:</strong> Inicia creando un nuevo proyecto seleccionando el tipo de proyecto.</li>
                  <li><strong>Realizar Evaluaciones:</strong> Completa las evaluaciones necesarias para cada área del proyecto.</li>
                  <li><strong>Acceder al Roadmap:</strong> Visualiza el roadmap para planificar las siguientes acciones.</li>
                  <li><strong>Descargar Reportes:</strong> Genera y descarga reportes detallados de tu proyecto.</li>
                </ol>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="faq-content"
              id="faq-header"
            >
              <Typography>Preguntas Frecuentes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="div">
                <strong>¿Cómo creo un nuevo proyecto?</strong><br />
                Haz clic en el botón "Crear Nuevo Proyecto", completa los detalles y guarda.
                <br /><br />
                <strong>¿Cómo edito un proyecto existente?</strong><br />
                Haz clic en el menú de opciones (tres puntos) en la tarjeta del proyecto y selecciona "Editar".
                <br /><br />
                <strong>¿Cómo realizo una evaluación?</strong><br />
                Haz clic en el área del proyecto y navega a la sección de evaluaciones.
                <br /><br />
                <strong>¿Puedo eliminar un proyecto?</strong><br />
                Sí, selecciona "Eliminar" en el menú de opciones de la tarjeta del proyecto.
              </Typography>
            </AccordionDetails>
          </Accordion>
          {/* Puedes agregar más acordeones según sea necesario */}
        </Box>
      </Collapse>

      {/* Resumen de Proyectos */}
      <Grid container spacing={4}>
        {projects.length > 0 ? (
          projects.map((project) => (
            <Grid
              item
              xs={12}
              sm={projects.length === 1 ? 12 : 6} // Ajuste dinámico basado en el número total de proyectos
              key={project.project_id}
            >
              <ProjectCard
                project={project}
                isActive={project.project_id === activeProjectId}
                onEdit={() => handleOpenProjectModal(project)}
                onDelete={() => {
                  setProjectToDelete(project);
                  setOpenConfirmDelete(true);
                }}
                onSetActive={() => handleSetActiveProject(project.project_id, project.project_name)}
                navigate={navigate}
              />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" color="text.secondary">
              No tienes proyectos creados.
            </Typography>
          </Grid>
        )}
      </Grid>

      {/* Modal para Crear/Editar Proyecto */}
      <Dialog
        open={openProjectModal}
        onClose={(event, reason) => {
          // Permitir cerrar solo si no está guardando y no es por clic en el backdrop
          if (!isSaving && reason !== 'backdropClick') {
            handleCloseProjectModal();
          }
        }}
        fullWidth
        maxWidth="sm"
        disableEscapeKeyDown={isSaving} // Prevenir cerrar con Escape mientras se guarda
      >
        <DialogTitle>
          {isEditing ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
        </DialogTitle>
        <DialogContent dividers>
          {/* Mostrar indicador de carga sobre el formulario si se está guardando */}
          {isSaving && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <CircularProgress />
            </Box>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Nombre del Proyecto"
            fullWidth
            variant="outlined"
            value={currentProject.project_name}
            onChange={(e) =>
              setCurrentProject({
                ...currentProject,
                project_name: e.target.value,
              })
            }
            disabled={isSaving} // Deshabilitar campo si está guardando
          />
          <TextField
            margin="dense"
            label="Descripción"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={currentProject.description}
            onChange={(e) =>
              setCurrentProject({
                ...currentProject,
                description: e.target.value,
              })
            }
            disabled={isSaving} // Deshabilitar campo si está guardando
          />
          <FormControl fullWidth margin="dense" disabled={isSaving}>
            <InputLabel id="project-type-label">Tipo de Proyecto</InputLabel>
            <Select
              labelId="project-type-label"
              label="Tipo de Proyecto"
              value={currentProject.project_type_id}
              onChange={(e) =>
                setCurrentProject({
                  ...currentProject,
                  project_type_id: e.target.value,
                })
              }
              displayEmpty
            >
              <MenuItem value="">
                <em>Seleccione un tipo de proyecto</em>
              </MenuItem>
              {projectTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProjectModal} disabled={isSaving}>
            Cancelar
          </Button>
          <Button
            onClick={handleSaveProject}
            variant="contained"
            color="primary"
            disabled={
              isSaving ||
              !currentProject.project_name.trim() ||
              !currentProject.project_type_id
            }
          >
            {isSaving ? (
              <CircularProgress size={24} color="inherit" />
            ) : isEditing ? (
              'Guardar Cambios'
            ) : (
              'Crear Proyecto'
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Confirmación para Eliminar Proyecto */}
      <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el proyecto "
            {projectToDelete?.project_name}"? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)}>Cancelar</Button>
          <Button onClick={handleDeleteProject} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomePage;
