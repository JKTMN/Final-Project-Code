/* global chrome */
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import { Dashboard, MenuBook } from '@mui/icons-material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';



const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/main-ui/dashboard' },
  { text: 'Guides', icon: <MenuBook />, path: '/main-ui/guides' },
  { text: 'Caption Generator', icon: <AddPhotoAlternateIcon />, path: '/main-ui/caption-generator' },
];

/**
 * Navigation Component
 * 
 * This component renders the navigation menu for the extensions UI.
 * It uses Material-UI components to create a list of navigation items.
 * 
 * @param {Boolean} collapsed - A boolean indicating whether the sidebar is collapsed or not.
 * @param {Boolean} isMobile - A boolean indicating whether the current view is mobile or not.
 * @param {Function} setMobileOpen - A function to set the mobile open state of the sidebar.
 * 
 * @returns The rendered Navigation component.
 * 
 * @see https://reactrouter.com/api/components/Navigate
 */
const Navigation = ({ collapsed, isMobile, setMobileOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setMobileOpen(false);
  };

  return (
    <List>
      {menuItems.map((item, index) => (
        <Tooltip 
          key={item.path} 
          title={collapsed ? item.text : ''} 
          placement="right"
          arrow
        >
          <ListItem disablePadding sx={{ mt: index === 0 ? 6 : 0 }}>
            <ListItemButton
              selected={location.pathname.includes(item.path)}
              onClick={() => handleNavigation(item.path)}
              sx={{ minHeight: 48, justifyContent: collapsed ? 'center' : 'initial', px: 2.5 }}>
              <ListItemIcon sx={{ minWidth: 0, mr: collapsed ? 0 : 1, color: 'inherit'}}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ opacity: collapsed ? 0 : 1, transition: 'opacity 0.2s'}} />
            </ListItemButton>
          </ListItem>
        </Tooltip>
      ))}
    </List>
  );
};

export default Navigation;