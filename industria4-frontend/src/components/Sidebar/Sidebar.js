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
  IconButton,
  Tooltip,
} from '@mui/material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/Auth/context/AuthContext';
import {
  FaHome,
  FaClipboardCheck,
  FaMapSigns,
  FaFileAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Sidebar = ({ isSidebarOpen, handleSidebarToggle, drawerWidth, collapsedDrawerWidth }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Inicio', icon: <FaHome />, path: '/' },
    { text: 'Evaluación', icon: <FaClipboardCheck />, path: '/evaluacion' },
    { text: 'Roadmap', icon: <FaMapSigns />, path: '/roadmap' },
    { text: 'Reporte', icon: <FaFileAlt />, path: '/reporte' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      open={isSidebarOpen}
      sx={{
        width: isSidebarOpen ? drawerWidth : collapsedDrawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isSidebarOpen ? drawerWidth : collapsedDrawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          color: 'text.primary',
          transition: (theme) =>
            theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          overflowX: 'hidden',
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isSidebarOpen ? 'flex-end' : 'center',
          px: [1],
        }}
      >
        <IconButton onClick={handleSidebarToggle} sx={{ color: 'text.primary' }}>
          {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <Tooltip title={!isSidebarOpen ? item.text : ''} placement="right" key={item.text}>
            <ListItem
              button
              component={Link}
              to={item.path}
              sx={{
                color: 'text.primary',
                '&.Mui-selected': {
                  backgroundColor: 'secondary.light',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
                '&:hover': {
                  backgroundColor: 'secondary.light',
                  color: 'primary.main',
                },
                justifyContent: isSidebarOpen ? 'initial' : 'center',
                px: 2.5,
              }}
              selected={location.pathname === item.path}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarOpen ? 3 : 'auto',
                  justifyContent: 'center',
                  color: 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isSidebarOpen && <ListItemText primary={item.text} />}
            </ListItem>
          </Tooltip>
        ))}
      </List>
      <Divider />
      <List sx={{ marginTop: 'auto' }}>
        <Tooltip title={!isSidebarOpen ? 'Cerrar Sesión' : ''} placement="right">
          <ListItem
            button
            onClick={handleLogout}
            sx={{
              color: 'secondary.main',
              '&:hover': {
                backgroundColor: 'secondary.dark',
                color: 'background.paper',
              },
              justifyContent: isSidebarOpen ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isSidebarOpen ? 3 : 'auto',
                justifyContent: 'center',
                color: 'inherit',
              }}
            >
              <FaSignOutAlt />
            </ListItemIcon>
            {isSidebarOpen && <ListItemText primary="Cerrar Sesión" />}
          </ListItem>
        </Tooltip>
      </List>
    </Drawer>
  );
};

export default Sidebar;
