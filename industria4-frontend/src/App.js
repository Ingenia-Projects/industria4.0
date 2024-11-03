// src/App.js

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './layouts/MainLayout/MainLayout';

const LoginPage = lazy(() => import('./features/Auth/pages/LoginPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const EvaluacionPage = lazy(() => import('./pages/EvaluacionPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));
const ReportePage = lazy(() => import('./pages/ReportePage'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          {/* Ruta de Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Ruta protegida para HomePage */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout>
                  <HomePage />
                </MainLayout>
              </PrivateRoute>
            }
          />

          {/* Rutas para Evaluación, Roadmap y Reporte */}
          <Route
            path="/evaluacion"
            element={
              <PrivateRoute>
                <MainLayout>
                  <EvaluacionPage />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/roadmap"
            element={
              <PrivateRoute>
                <MainLayout>
                  <RoadmapPage />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/reporte"
            element={
              <PrivateRoute>
                <MainLayout>
                  <ReportePage />
                </MainLayout>
              </PrivateRoute>
            }
          />

          {/* Redirección en caso de rutas no definidas */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
