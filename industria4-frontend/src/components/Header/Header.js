// src/components/Header/Header.js

import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Box } from '@mui/material';
import { deepPurple } from '@mui/material/colors';

const Header = ({ isSidebarOpen, handleSidebarToggle, drawerWidth, collapsedDrawerWidth }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'primary.main',
        transition: (theme) =>
          theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        width: { sm: `calc(100% - ${isSidebarOpen ? drawerWidth : collapsedDrawerWidth}px)` },
        marginLeft: { sm: `${isSidebarOpen ? drawerWidth : collapsedDrawerWidth}px` },
      }}
    >
      <Toolbar>
        {/* Eliminar el botón de toggle y el logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Typography variant="h6" noWrap component="div" color="background.paper">
            Dashboard de Inteligencia de Negocios
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography variant="body1" sx={{ marginRight: 1, color: 'background.paper' }}>
            Hola, Usuario
          </Typography>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>U</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
