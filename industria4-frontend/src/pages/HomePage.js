// src/pages/HomePage.js

import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
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
  DialogContentText,
  Select,
  InputLabel,
  FormControl,
  Chip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MoreVert } from '@mui/icons-material';
import { useAuth } from '../features/Auth/context/AuthContext';

// Importar las funciones de la API
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../api/projects';
import { getProjectTypes } from '../api/projectTypes';

// Importar el contexto del proyecto activo
import { ActiveProjectContext } from '../context/ActiveProjectContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { activeProjectId, setActiveProjectById } = useContext(ActiveProjectContext);

  const [projects, setProjects] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);

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

  // Función para cargar los proyectos desde el backend
  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error al cargar los proyectos:', error);
    }
  };

  // Función para cargar los tipos de proyectos desde el backend
  const fetchProjectTypes = async () => {
    try {
      const data = await getProjectTypes();
      setProjectTypes(data);
    } catch (error) {
      console.error('Error al cargar los tipos de proyectos:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchProjectTypes();
  }, []);

  const handleOpenProjectModal = (project = null) => {
    if (project) {
      // Editar proyecto existente
      setIsEditing(true);
      setCurrentProject({
        project_id: project.project_id,
        project_name: project.project_name,
        description: project.description,
        project_type_id: project.project_type_id,
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
    setOpenProjectModal(false);
    setCurrentProject({
      project_id: null,
      project_name: '',
      description: '',
      project_type_id: '',
    });
  };

  const handleSaveProject = async () => {
    try {
      if (isEditing) {
        // Actualizar proyecto existente
        const updatedProject = await updateProject(
          currentProject.project_id,
          currentProject
        );
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project.project_id === updatedProject.project_id
              ? updatedProject
              : project
          )
        );
      } else {
        // Crear nuevo proyecto
        const newProject = await createProject(currentProject);
        setProjects((prevProjects) => [...prevProjects, newProject]);
      }
      handleCloseProjectModal();
    } catch (error) {
      console.error('Error al guardar el proyecto:', error);
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
        setActiveProjectById(null);
      }
      setProjectToDelete(null);
      setOpenConfirmDelete(false);
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
    }
  };

  const handleSetActiveProject = (projectId) => {
    setActiveProjectById(projectId);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Sección de Bienvenida */}
      <Typography variant="h4" gutterBottom>
        {`Bienvenido de nuevo, ${user?.name || 'Usuario'}`}
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="text.secondary">
        {`Empresa: ${user?.company || 'Tu Empresa'}`}
      </Typography>

      {/* Acciones Rápidas */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenProjectModal()}
        >
          Crear Nuevo Proyecto
        </Button>
      </Box>

      <Grid container spacing={2}>
        {/* Resumen de Proyectos */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Tus Proyectos
          </Typography>
          <Grid container spacing={2}>
            {projects.map((project) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
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
                  onSetActive={() =>
                    handleSetActiveProject(project.project_id)
                  }
                  navigate={navigate}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Modal para Crear/Editar Proyecto */}
      <Dialog open={openProjectModal} onClose={handleCloseProjectModal}>
        <DialogTitle>
          {isEditing ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}
        </DialogTitle>
        <DialogContent>
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
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="project-type-label">
              Tipo de Proyecto
            </InputLabel>
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
            >
              {projectTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProjectModal}>Cancelar</Button>
          <Button onClick={handleSaveProject} color="primary">
            {isEditing ? 'Guardar Cambios' : 'Crear Proyecto'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Confirmación para Eliminar Proyecto */}
      <Dialog
        open={openConfirmDelete}
        onClose={() => setOpenConfirmDelete(false)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el proyecto "
            {projectToDelete?.project_name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDelete(false)}>
            Cancelar
          </Button>
          <Button onClick={handleDeleteProject} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

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
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Calcula el progreso de evaluación y el estado
  const evaluationProgress = project.evaluationProgress || 0;
  const roadmapCreated = !!project.roadmap;
  const status = evaluationProgress === 100 ? 'Completado' : 'En Progreso';

  return (
    <Card
      sx={{
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid',
        borderColor: isActive ? 'primary.main' : 'grey.300',
        boxShadow: isActive ? 4 : 'none',
        backgroundColor: 'background.paper',
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
        sx={{ flexGrow: 1, cursor: 'pointer' }}
        onClick={onSetActive}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h6"
            color={isActive ? 'primary.main' : 'text.primary'}
          >
            {project.project_name}
          </Typography>
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
        </Box>
        {isActive && (
          <Chip
            label="Activo"
            color="primary"
            size="small"
            sx={{ mt: 1 }}
          />
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
        <Typography color="text.secondary">
          {project.projectType?.name || 'Tipo de Proyecto'}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Estado: {status}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Fecha de creación:{' '}
          {new Date(project.created_at).toLocaleDateString()}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {project.description}
        </Typography>
        <Typography sx={{ mt: 2 }}>Progreso de Evaluación</Typography>
        <LinearProgress
          variant="determinate"
          value={evaluationProgress}
          sx={{ mt: 1 }}
        />
        {roadmapCreated && (
          <>
            <Typography sx={{ mt: 2 }}>Roadmap</Typography>
            <Typography color="success.main">Creado</Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => navigate(`/evaluacion`)}
        >
          {evaluationProgress < 100
            ? 'Continuar Evaluación'
            : 'Ver Evaluación'}
        </Button>
        {evaluationProgress === 100 && !roadmapCreated && (
          <Button
            size="small"
            color="primary"
            onClick={() => navigate(`/roadmap`)}
          >
            Crear Roadmap
          </Button>
        )}
        {roadmapCreated && (
          <Button
            size="small"
            color="primary"
            onClick={() => navigate(`/reporte`)}
          >
            Ver Reporte
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default HomePage;
