// src/pages/ReportePage.js

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  LinearProgress, // <--- Añadido LinearProgress
} from '@mui/material';
import { Scatter, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportePage = () => {
  // Datos dummy para el reporte
  const project = {
    project_id: 1,
    name: 'Proyecto A',
    description: 'Descripción del Proyecto A',
    type: 'Manufacturing',
    createdAt: '2023-11-01',
  };

  const evaluationSummary = {
    overallScore: 75,
    sectionProgress: [
      { section: 'Energía', score: 80 },
      { section: 'Procesos', score: 70 },
      { section: 'Calidad', score: 75 },
    ],
  };

  const roadmapSummary = {
    totalInitiatives: 5,
    totalInvestment: 150000.0,
    totalROI: 25.0,
    initiatives: [
      {
        name: 'Implementar Sistema EMS',
        status: 'En progreso',
        contribution_value: 'Essential',
        implementation_complexity: 'High',
        investment_cost: 50000.0,
        return_on_investment: 20.0,
        implementation_time: 6,
      },
      {
        name: 'Optimizar Procesos de Producción',
        status: 'No iniciado',
        contribution_value: 'Significant',
        implementation_complexity: 'Middle',
        investment_cost: 20000.0,
        return_on_investment: 15.0,
        implementation_time: 4,
      },
      {
        name: 'Implementar Sistema BMS',
        status: 'Completado',
        contribution_value: 'Supporting',
        implementation_complexity: 'Low',
        investment_cost: 10000.0,
        return_on_investment: 10.0,
        implementation_time: 2,
      },
      // Añade más iniciativas si lo deseas
    ],
  };

  const maturityLevelFinal = 4;

  // Datos para la Matriz de Impacto vs. Esfuerzo (Gráfico de dispersión)
  const impactVsEffortData = {
    datasets: [
      {
        label: 'Iniciativas',
        data: roadmapSummary.initiatives.map((init) => ({
          x:
            init.contribution_value === 'Essential'
              ? 3
              : init.contribution_value === 'Significant'
              ? 2
              : 1,
          y:
            init.implementation_complexity === 'Low'
              ? 1
              : init.implementation_complexity === 'Middle'
              ? 2
              : 3,
          label: init.name,
          backgroundColor:
            init.contribution_value === 'Essential'
              ? 'rgba(255, 99, 132, 0.6)'
              : init.contribution_value === 'Significant'
              ? 'rgba(54, 162, 235, 0.6)'
              : 'rgba(75, 192, 192, 0.6)',
        })),
        backgroundColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const impactVsEffortOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Impacto (Contribución al Negocio)',
        },
        ticks: {
          callback: function (value) {
            switch (value) {
              case 1:
                return 'Supporting';
              case 2:
                return 'Significant';
              case 3:
                return 'Essential';
              default:
                return '';
            }
          },
        },
        min: 0,
        max: 4,
        stepSize: 1,
      },
      y: {
        title: {
          display: true,
          text: 'Esfuerzo (Complejidad de Implementación)',
        },
        ticks: {
          callback: function (value) {
            switch (value) {
              case 1:
                return 'Low';
              case 2:
                return 'Middle';
              case 3:
                return 'High';
              default:
                return '';
            }
          },
        },
        min: 0,
        max: 4,
        stepSize: 1,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw.label;
          },
        },
      },
    },
  };

  // Datos para el Gráfico de Barras: Inversión vs. ROI
  const investmentVsROIData = {
    labels: roadmapSummary.initiatives.map((init) => init.name),
    datasets: [
      {
        label: 'Inversión ($)',
        data: roadmapSummary.initiatives.map((init) => init.investment_cost),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
      {
        label: 'ROI (%)',
        data: roadmapSummary.initiatives.map((init) => init.return_on_investment),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const investmentVsROIOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Inversión vs. ROI por Iniciativa',
      },
    },
  };

  // Datos para el Gráfico de Barras: Tiempo de Implementación
  const implementationTimeData = {
    labels: roadmapSummary.initiatives.map((init) => init.name),
    datasets: [
      {
        label: 'Tiempo de Implementación (meses)',
        data: roadmapSummary.initiatives.map((init) => init.implementation_time),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const implementationTimeOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tiempo de Implementación por Iniciativa',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Reporte del Proyecto
      </Typography>

      {/* Información del Proyecto */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Información del Proyecto
        </Typography>
        <Typography>
          <strong>Nombre:</strong> {project.name}
        </Typography>
        <Typography>
          <strong>Tipo:</strong> {project.type}
        </Typography>
        <Typography>
          <strong>Descripción:</strong> {project.description}
        </Typography>
        <Typography>
          <strong>Fecha de Creación:</strong> {project.createdAt}
        </Typography>
      </Paper>

      {/* Resumen de Evaluación */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Resumen de la Evaluación
        </Typography>
        <Typography variant="h6">Puntaje General: {evaluationSummary.overallScore}%</Typography>
        <Grid container spacing={2}>
          {evaluationSummary.sectionProgress.map((section, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Typography>
                <strong>{section.section}</strong>
              </Typography>
              <LinearProgress variant="determinate" value={section.score} />
              <Typography variant="body2" color="text.secondary">
                {section.score}%
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Resumen del Roadmap */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Resumen del Roadmap
        </Typography>
        <Typography>
          <strong>Total de Iniciativas:</strong> {roadmapSummary.totalInitiatives}
        </Typography>
        <Typography>
          <strong>Inversión Total Estimada:</strong> ${roadmapSummary.totalInvestment.toFixed(2)}
        </Typography>
        <Typography>
          <strong>ROI Promedio:</strong> {roadmapSummary.totalROI}%
        </Typography>
        <Typography>
          <strong>Nivel de Madurez Final:</strong> {maturityLevelFinal}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            {/* Matriz de Impacto vs. Esfuerzo */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Matriz de Impacto vs. Esfuerzo
              </Typography>
              <Scatter data={impactVsEffortData} options={impactVsEffortOptions} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption">
                  <strong>Eje X:</strong> Impacto (Essential: 3, Significant: 2, Supporting: 1)
                </Typography>
                <Typography variant="caption">
                  <strong>Eje Y:</strong> Esfuerzo (High: 3, Middle: 2, Low: 1)
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Gráfico de Barras: Inversión vs. ROI */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Inversión vs. ROI por Iniciativa
              </Typography>
              <Bar data={investmentVsROIData} options={investmentVsROIOptions} />
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            {/* Gráfico de Barras: Tiempo de Implementación */}
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Tiempo de Implementación por Iniciativa
              </Typography>
              <Bar data={implementationTimeData} options={implementationTimeOptions} />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ReportePage;
