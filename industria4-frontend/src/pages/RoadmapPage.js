// src/pages/RoadmapPage.js

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Add, MoreVert } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Menu from '@mui/material/Menu';
import MenuItemComponent from '@mui/material/MenuItem'; // Renombrado para evitar conflictos

// RoadmapPage Component
const RoadmapPage = () => {
  const navigate = useNavigate();

  // Datos dummy para el roadmap y las iniciativas
  const [roadmap, setRoadmap] = useState({
    roadmap_id: 1,
    project_id: 1,
    overall_strategy: 'Mejorar la eficiencia energética y reducir costos operativos.',
    created_at: '2023-11-01',
    updated_at: '2023-11-01',
  });

  const [initiatives, setInitiatives] = useState([
    {
      initiative_id: 1,
      roadmap_id: 1,
      initiative_name: 'Implementar Sistema EMS',
      action_description: 'Instalar un sistema de gestión de energía para monitorizar y optimizar el consumo.',
      contribution_value: 'Essential',
      implementation_complexity: 'High',
      benefits: 'Reducción del consumo energético en un 15%.',
      efforts: '6 meses, 3 FTE',
      maturity_level_targeted: 4,
      investment_cost: 50000.0,
      return_on_investment: 20.0,
      implementation_time: 6,
      priority_score: 80,
      status: 'En progreso',
      created_at: '2023-11-01',
      updated_at: '2023-11-01',
    },
    {
      initiative_id: 2,
      roadmap_id: 1,
      initiative_name: 'Optimizar Procesos de Producción',
      action_description: 'Revisar y mejorar los procesos para reducir desperdicios.',
      contribution_value: 'Significant',
      implementation_complexity: 'Middle',
      benefits: 'Mejora de la eficiencia en un 10%.',
      efforts: '4 meses, 2 FTE',
      maturity_level_targeted: 3,
      investment_cost: 20000.0,
      return_on_investment: 15.0,
      implementation_time: 4,
      priority_score: 70,
      status: 'No iniciado',
      created_at: '2023-11-01',
      updated_at: '2023-11-01',
    },
    // Puedes agregar más iniciativas según sea necesario
  ]);

  // Estados para el modal de agregar/editar iniciativa
  const [openInitiativeModal, setOpenInitiativeModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInitiative, setCurrentInitiative] = useState({
    initiative_id: null,
    roadmap_id: roadmap.roadmap_id,
    initiative_name: '',
    action_description: '',
    contribution_value: 'Essential',
    implementation_complexity: 'Low',
    benefits: '',
    efforts: '',
    maturity_level_targeted: 1,
    investment_cost: 0.0,
    return_on_investment: 0.0,
    implementation_time: 0,
    priority_score: 0,
    status: 'No iniciado',
    created_at: '',
    updated_at: '',
  });

  // Estados para el menú de acciones
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [selectedInitiative, setSelectedInitiative] = useState(null);

  // Funciones para manejar el modal
  const handleOpenInitiativeModal = (initiative = null) => {
    if (initiative) {
      setIsEditing(true);
      setCurrentInitiative(initiative);
    } else {
      setIsEditing(false);
      setCurrentInitiative({
        initiative_id: null,
        roadmap_id: roadmap.roadmap_id,
        initiative_name: '',
        action_description: '',
        contribution_value: 'Essential',
        implementation_complexity: 'Low',
        benefits: '',
        efforts: '',
        maturity_level_targeted: 1,
        investment_cost: 0.0,
        return_on_investment: 0.0,
        implementation_time: 0,
        priority_score: 0,
        status: 'No iniciado',
        created_at: '',
        updated_at: '',
      });
    }
    setOpenInitiativeModal(true);
  };

  const handleCloseInitiativeModal = () => {
    setOpenInitiativeModal(false);
    setCurrentInitiative({
      initiative_id: null,
      roadmap_id: roadmap.roadmap_id,
      initiative_name: '',
      action_description: '',
      contribution_value: 'Essential',
      implementation_complexity: 'Low',
      benefits: '',
      efforts: '',
      maturity_level_targeted: 1,
      investment_cost: 0.0,
      return_on_investment: 0.0,
      implementation_time: 0,
      priority_score: 0,
      status: 'No iniciado',
      created_at: '',
      updated_at: '',
    });
  };

  const handleSaveInitiative = () => {
    if (isEditing) {
      // Actualizar iniciativa existente
      setInitiatives((prevInitiatives) =>
        prevInitiatives.map((initiative) =>
          initiative.initiative_id === currentInitiative.initiative_id
            ? { ...currentInitiative, updated_at: new Date().toISOString().split('T')[0] }
            : initiative
        )
      );
    } else {
      // Agregar nueva iniciativa
      const newInitiative = {
        ...currentInitiative,
        initiative_id: initiatives.length + 1, // Deberías reemplazar esto con un ID de tu backend
        created_at: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().split('T')[0],
      };
      setInitiatives((prevInitiatives) => [...prevInitiatives, newInitiative]);
    }
    handleCloseInitiativeModal();
  };

  // Función para calcular priority_score (puedes ajustar la lógica según tus criterios)
  const calculatePriorityScore = (initiative) => {
    let score = 0;
    // Asignar puntos según contribution_value
    switch (initiative.contribution_value) {
      case 'Essential':
        score += 30;
        break;
      case 'Significant':
        score += 20;
        break;
      case 'Supporting':
        score += 10;
        break;
      default:
        score += 0;
    }
    // Asignar puntos según implementation_complexity (menor complejidad, mayor prioridad)
    switch (initiative.implementation_complexity) {
      case 'Low':
        score += 20;
        break;
      case 'Middle':
        score += 10;
        break;
      case 'High':
        score += 0;
        break;
      default:
        score += 0;
    }
    // Asignar puntos según return_on_investment
    if (initiative.return_on_investment > 15) {
      score += 20;
    } else if (initiative.return_on_investment > 10) {
      score += 10;
    } else {
      score += 0;
    }
    return score;
  };

  // Función para abrir el menú de acciones
  const handleMenuOpenInitiative = (event, initiative) => {
    setAnchorEl(event.currentTarget);
    setSelectedInitiative(initiative);
  };

  // Función para cerrar el menú de acciones
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInitiative(null);
  };

  // Función para eliminar una iniciativa
  const handleDeleteInitiative = () => {
    setInitiatives(initiatives.filter((i) => i.initiative_id !== selectedInitiative.initiative_id));
    handleMenuClose();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Roadmap del Proyecto
      </Typography>
      <Typography variant="h6" gutterBottom>
        Estrategia General
      </Typography>
      <Typography variant="body1" gutterBottom>
        {roadmap.overall_strategy}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={() => handleOpenInitiativeModal()}
        sx={{ my: 2 }}
      >
        Agregar Iniciativa
      </Button>

      {/* Tabla de Iniciativas */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre de la Iniciativa</TableCell>
              <TableCell>Contribución</TableCell>
              <TableCell>Complejidad</TableCell>
              <TableCell>Beneficios</TableCell>
              <TableCell>Esfuerzos</TableCell>
              <TableCell>Inversión ($)</TableCell>
              <TableCell>ROI (%)</TableCell>
              <TableCell>Tiempo (meses)</TableCell>
              <TableCell>Puntuación Prioridad</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {initiatives.map((initiative) => (
              <TableRow key={initiative.initiative_id}>
                <TableCell>{initiative.initiative_name}</TableCell>
                <TableCell>{initiative.contribution_value}</TableCell>
                <TableCell>{initiative.implementation_complexity}</TableCell>
                <TableCell>{initiative.benefits}</TableCell>
                <TableCell>{initiative.efforts}</TableCell>
                <TableCell>{initiative.investment_cost.toFixed(2)}</TableCell>
                <TableCell>{initiative.return_on_investment.toFixed(2)}</TableCell>
                <TableCell>{initiative.implementation_time}</TableCell>
                <TableCell>{calculatePriorityScore(initiative)}</TableCell>
                <TableCell>{initiative.status}</TableCell>
                <TableCell>
                  <Tooltip title="Editar Iniciativa">
                    <IconButton onClick={() => handleOpenInitiativeModal(initiative)}>
                      <MoreVert />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para Agregar/Editar Iniciativa */}
      <Dialog open={openInitiativeModal} onClose={handleCloseInitiativeModal} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditing ? 'Editar Iniciativa' : 'Agregar Nueva Iniciativa'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la Iniciativa"
            fullWidth
            variant="outlined"
            value={currentInitiative?.initiative_name || ''}
            onChange={(e) =>
              setCurrentInitiative({ ...currentInitiative, initiative_name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Descripción de la Acción"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={currentInitiative?.action_description || ''}
            onChange={(e) =>
              setCurrentInitiative({ ...currentInitiative, action_description: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Contribución al Negocio</InputLabel>
            <Select
              value={currentInitiative?.contribution_value || 'Essential'}
              label="Contribución al Negocio"
              onChange={(e) =>
                setCurrentInitiative({ ...currentInitiative, contribution_value: e.target.value })
              }
            >
              <MenuItem value="Essential">Essential</MenuItem>
              <MenuItem value="Significant">Significant</MenuItem>
              <MenuItem value="Supporting">Supporting</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Complejidad de Implementación</InputLabel>
            <Select
              value={currentInitiative?.implementation_complexity || 'Low'}
              label="Complejidad de Implementación"
              onChange={(e) =>
                setCurrentInitiative({ ...currentInitiative, implementation_complexity: e.target.value })
              }
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Middle">Middle</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Beneficios"
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            value={currentInitiative?.benefits || ''}
            onChange={(e) =>
              setCurrentInitiative({ ...currentInitiative, benefits: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Esfuerzos"
            fullWidth
            variant="outlined"
            value={currentInitiative?.efforts || ''}
            onChange={(e) =>
              setCurrentInitiative({ ...currentInitiative, efforts: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Nivel de Madurez Objetivo"
            fullWidth
            type="number"
            variant="outlined"
            value={currentInitiative?.maturity_level_targeted || ''}
            onChange={(e) =>
              setCurrentInitiative({ ...currentInitiative, maturity_level_targeted: parseInt(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            label="Costo de Inversión ($)"
            fullWidth
            type="number"
            variant="outlined"
            value={currentInitiative?.investment_cost || ''}
            onChange={(e) =>
              setCurrentInitiative({ ...currentInitiative, investment_cost: parseFloat(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            label="Retorno de Inversión (%)"
            fullWidth
            type="number"
            variant="outlined"
            value={currentInitiative?.return_on_investment || ''}
            onChange={(e) =>
              setCurrentInitiative({ ...currentInitiative, return_on_investment: parseFloat(e.target.value) })
            }
          />
          <TextField
            margin="dense"
            label="Tiempo de Implementación (meses)"
            fullWidth
            type="number"
            variant="outlined"
            value={currentInitiative?.implementation_time || ''}
            onChange={(e) =>
              setCurrentInitiative({ ...currentInitiative, implementation_time: parseInt(e.target.value) })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Estado</InputLabel>
            <Select
              value={currentInitiative?.status || 'No iniciado'}
              label="Estado"
              onChange={(e) =>
                setCurrentInitiative({ ...currentInitiative, status: e.target.value })
              }
            >
              <MenuItem value="No iniciado">No iniciado</MenuItem>
              <MenuItem value="En progreso">En progreso</MenuItem>
              <MenuItem value="Completado">Completado</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInitiativeModal}>Cancelar</Button>
          <Button onClick={handleSaveInitiative} color="primary">
            {isEditing ? 'Guardar Cambios' : 'Agregar Iniciativa'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Menú de Acciones */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItemComponent onClick={() => { handleOpenInitiativeModal(selectedInitiative); handleMenuClose(); }}>Editar</MenuItemComponent>
        <MenuItemComponent onClick={handleDeleteInitiative}>Eliminar</MenuItemComponent>
      </Menu>
    </Box>
  );
};

// ProjectCard Component (Si decides reutilizarlo en RoadmapPage)
const ProjectCard = ({ project, isActive, onEdit, onDelete, onSetActive, navigate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: isActive ? '2px solid' : '1px solid',
        borderColor: isActive ? 'primary.main' : 'grey.300',
      }}
    >
      <CardContent sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={onSetActive}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">{project.initiative_name}</Typography>
          <IconButton size="small" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>
        </Box>
        <Typography color="text.secondary">{project.contribution_value}</Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Complejidad: {project.implementation_complexity}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Beneficios: {project.benefits}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Esfuerzos: {project.efforts}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Nivel de Madurez Objetivo: {project.maturity_level_targeted}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Inversión: ${project.investment_cost.toFixed(2)}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          ROI: {project.return_on_investment}%
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Tiempo de Implementación: {project.implementation_time} meses
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Estado: {project.status}
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Puntuación Prioridad: {project.priority_score}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => navigate(`/evaluacion`)}
        >
          {project.evaluationProgress < 100 ? 'Continuar Evaluación' : 'Ver Evaluación'}
        </Button>
        {project.implementation_complexity === 'Low' && (
          <Button
            size="small"
            color="primary"
            onClick={() => navigate(`/roadmap`)}
          >
            Crear Roadmap
          </Button>
        )}
        {project.status === 'Completado' && (
          <Button
            size="small"
            color="primary"
            onClick={() => navigate(`/reporte`)}
          >
            Ver Reporte
          </Button>
        )}
      </CardActions>

      {/* Menú de Acciones */}
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItemComponent onClick={onEdit}>Editar</MenuItemComponent>
        <MenuItemComponent onClick={onDelete}>Eliminar</MenuItemComponent>
      </Menu>
    </Card>
  );
};

export default RoadmapPage;
