// src/layouts/MainLayout/MainLayout.js

import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

const drawerWidth = 200; // Ancho del sidebar expandido
const collapsedDrawerWidth = 60; // Ancho del sidebar minimizado

function MainLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <Header
        isSidebarOpen={isSidebarOpen}
        handleSidebarToggle={handleSidebarToggle}
        drawerWidth={drawerWidth}
        collapsedDrawerWidth={collapsedDrawerWidth}
      />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
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
            transition: (theme) =>
              theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default MainLayout;
