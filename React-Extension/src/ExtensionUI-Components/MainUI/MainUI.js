/* global chrome */
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Drawer, Box, CssBaseline, IconButton, useMediaQuery, useTheme, Fade, Backdrop } from '@mui/material';
import { Menu, ChevronLeft, ChevronRight } from '@mui/icons-material';
import Navigation from './Navigation';
import { handleAxeApiCall } from '../../functions/handleAxeApiCall';
import LoadingScreen from '../Pages/LoadingScreen';

/**
 * MainUI Component
 * 
 * The core layout and navigation handler for the extensions UI.
 * It manages the state of the sidebar and handles API calls to fetch audit results.
 * It displays a loading screen while the API call is in progress.
 * The main content is rendered through the Outlet component, which allows for nested routing.
 * 
 * @returns {JSX.Element} The rendered MainUI component.
 * 
 * @see https://reactrouter.com/api/components/Outlet
 * @see https://mui.com/material-ui/react-drawer/
 * @see https://mui.com/material-ui/react-css-baseline/
 * @see https://mui.com/material-ui/react-use-media-query/
 * 
 */
const MainUI = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [collapsed, setCollapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [storedUrl, setStoredUrl] = useState('');
  const [auditResults, setAuditResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (chrome?.storage?.local) {
      chrome.storage.local.get(['extensionUrl'], (result) => {
        setStoredUrl(result.extensionUrl || '');
      });
    }
  }, []);

  useEffect(() => {
    const handleApiCall = async (targetUrl) => {
      if (!targetUrl) return;
      setLoading(true);
      try { 
        const auditResponse = await handleAxeApiCall(targetUrl, setLoading, setError);
        console.log('Audit Results:', auditResponse);
        setAuditResults(auditResponse);
      } catch (error) {
        console.error('Error during API call:', error);
      } finally {
        setLoading(false);
      }
    };
    handleApiCall(storedUrl);
  }, [storedUrl]);

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  if (loading) {
    return (
      <LoadingScreen />      
    );
  }

  return (
    <Fade in timeout={900}>
      <Box sx={{ display: 'flex', position: 'relative', height: '100vh' }}>
        <CssBaseline />

        <IconButton
          color="inherit"
          onClick={handleDrawerToggle}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: theme.zIndex.drawer + 2,
          }}
        >
          {isMobile ? <Menu /> : collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>

        <Drawer
          variant={isMobile ? 'temporary' : 'persistent'}
          open={isMobile ? mobileOpen : true}
          onClose={() => setMobileOpen(false)}
          hideBackdrop={!isMobile}
          ModalProps={{
            keepMounted: true,
            ...(isMobile && {
              BackdropProps: {
                style: { backgroundColor: 'rgba(0, 0, 0, 0.3)' },
              }
            })
          }}
          PaperProps={{
            sx: {
              width: collapsed ? 64 : 240,
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.standard,
              }),
              backgroundColor: 'background.paper',
              boxShadow: 5,
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100vh',
              borderRight: 'none',
            }
          }}
          sx={{
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Navigation 
            collapsed={collapsed}
            isMobile={isMobile}
            setMobileOpen={setMobileOpen}
          />
        </Drawer>

        {!isMobile && !collapsed && (
          <Backdrop
            open
            sx={{
              zIndex: theme.zIndex.drawer,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            }}
            onClick={handleDrawerToggle}
          />
        )}

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            position: 'relative',
            overflow: 'auto',
            zIndex: 1,
          }}
        >
          <Outlet context={{ auditResults, loading, setLoading }} />
        </Box>
      </Box>
    </Fade>
  );
};

export default MainUI;