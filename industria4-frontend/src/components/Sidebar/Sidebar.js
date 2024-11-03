// src/components/Sidebar/Sidebar.js

import React from 'react';
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Box,
  IconButton,
} from '@mui/material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/Auth/context/AuthContext';
import {
  FaHome,
  FaClipboardCheck,
  FaMapSigns,
  FaFileAlt,
  FaBook,
  FaSignOutAlt,
} from 'react-icons/fa';
import Logo from '../../assets/images/logo.png';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

const Sidebar = ({ isSidebarCollapsed, handleSidebarToggle, drawerWidth, collapsedDrawerWidth, isMobile }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const menuItems = [
    { text: 'Inicio', icon: <FaHome />, path: '/' },
    { text: 'Evaluación', icon: <FaClipboardCheck />, path: '/evaluacion' },
    { text: 'Roadmap', icon: <FaMapSigns />, path: '/roadmap' },
    { text: 'Reporte', icon: <FaFileAlt />, path: '/reporte' },
  ];

  const additionalMenuItems = [
    { text: 'Curso', icon: <FaBook />, path: '/curso' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={!isSidebarCollapsed}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: isSidebarCollapsed ? collapsedDrawerWidth : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isSidebarCollapsed ? collapsedDrawerWidth : drawerWidth,
          boxSizing: 'border-box',
          background: theme.gradients.sidebar, // Usar gradiente del tema
          color: '#FFFFFF',
          position: 'fixed',
          height: '100vh',
          transition: 'width 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
          boxShadow: theme.shadows.drawer, // Usar sombra del tema
        },
      }}
    >
      {/* Logo */}
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
          alignItems: 'center',
          px: 2,
          minHeight: '64px',
        }}
      >
        <Tooltip title={!isSidebarCollapsed ? 'Inicio' : ''} placement="right" arrow>
          <Box
            component="img"
            src={Logo}
            alt="Logo de la Empresa"
            sx={{
              height: isSidebarCollapsed ? '24px' : '40px',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              transform: isSidebarCollapsed ? 'scale(0.8)' : 'scale(1)',
            }}
            onClick={() => navigate('/')}
          />
        </Tooltip>
      </Toolbar>

      <Divider />

      {/* Menú Principal */}
      <List>
        {menuItems.map((item) => (
          <Tooltip
            title={isSidebarCollapsed ? item.text : ''}
            placement="right"
            key={item.text}
            arrow
          >
            <ListItem
              button
              component={Link}
              to={item.path}
              sx={{
                color: '#FFFFFF',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', // Resalta la selección
                  color: '#FFFFFF',
                  '& .MuiListItemIcon-root': {
                    color: '#FFFFFF',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                },
                px: 2.5,
              }}
              selected={location.pathname === item.path}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarCollapsed ? 'auto' : 3,
                  justifyContent: 'center',
                  color: 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isSidebarCollapsed && <ListItemText primary={item.text} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>

      <Divider />

      {/* Sección "Curso" */}
      <List>
        {additionalMenuItems.map((item) => (
          <Tooltip
            title={isSidebarCollapsed ? item.text : ''}
            placement="right"
            key={item.text}
            arrow
          >
            <ListItem
              button
              component={Link}
              to={item.path}
              sx={{
                color: '#FFFFFF',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  '& .MuiListItemIcon-root': {
                    color: '#FFFFFF',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                },
                px: 2.5,
              }}
              selected={location.pathname === item.path}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarCollapsed ? 'auto' : 3,
                  justifyContent: 'center',
                  color: 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isSidebarCollapsed && <ListItemText primary={item.text} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>

      {/* Botón de Colapsar/Expandir Sidebar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, position: 'relative' }}>
        <Tooltip title={isSidebarCollapsed ? 'Expandir Sidebar' : 'Colapsar Sidebar'} placement="right" arrow>
          <IconButton
            onClick={handleSidebarToggle}
            sx={{
              position: 'absolute',
              right: isSidebarCollapsed ? '10px' : '15px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
              width: 40,
              height: 40,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
            aria-label={isSidebarCollapsed ? 'Expandir Sidebar' : 'Colapsar Sidebar'}
          >
            {isSidebarCollapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      {/* Cerrar Sesión */}
      <List>
        <Tooltip title={isSidebarCollapsed ? 'Cerrar Sesión' : ''} placement="right" arrow>
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              color: theme.palette.secondary.light, // Usar color del tema
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
              },
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSidebarCollapsed ? 'auto' : 3,
                justifyContent: 'center',
                color: 'inherit',
              }}
            >
              <FaSignOutAlt />
            </ListItemIcon>
            {!isSidebarCollapsed && <ListItemText primary="Cerrar Sesión" />}
          </ListItem>
        </Tooltip>
      </List>
    </Drawer>
  );
};

export default Sidebar;
