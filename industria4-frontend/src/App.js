// src/App.js

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layouts/MainLayout/MainLayout';

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          {/* Ruta de Login */}
          <Route path="/login" element={<LazyLoginPage />} />

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout>
                  <LazyHomePage />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/evaluacion"
            element={
              <PrivateRoute>
                <MainLayout>
                  <LazyEvaluacionPage />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/roadmap"
            element={
              <PrivateRoute>
                <MainLayout>
                  <LazyRoadmapPage />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/reporte"
            element={
              <PrivateRoute>
                <MainLayout>
                  <LazyReportePage />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/curso"
            element={
              <PrivateRoute>
                <MainLayout>
                  <LazyCursoPage />
                </MainLayout>
              </PrivateRoute>
            }
          />

          {/* Redirección para rutas no definidas */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

// Definición de componentes perezosos fuera del componente principal para mejorar la legibilidad
const LazyLoginPage = lazy(() => import('./features/Auth/pages/LoginPage'));
const LazyHomePage = lazy(() => import('./pages/HomePage'));
const LazyEvaluacionPage = lazy(() => import('./pages/EvaluacionPage'));
const LazyRoadmapPage = lazy(() => import('./pages/RoadmapPage'));
const LazyReportePage = lazy(() => import('./pages/ReportePage'));
const LazyCursoPage = lazy(() => import('./pages/CursoPage')); // Asegúrate de tener esta página

export default App;
