// src/layouts/MainLayout/MainLayout.js

import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const MainLayout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header />

      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        handleSidebarToggle={handleSidebarToggle}
        drawerWidth={drawerWidth}
        collapsedDrawerWidth={collapsedDrawerWidth}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: 'background.default',
          minHeight: '100vh',
          transition: (theme) =>
            theme.transitions.create(['margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)', // Sombra interna para tridimensionalidad
          borderLeft: '1px solid rgba(0,0,0,0.1)', // Borde sutil
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
