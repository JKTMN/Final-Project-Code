/* global chrome */
import React, { useState, useEffect, useRef } from 'react';
import { Grid, useTheme, useMediaQuery } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import DashboardLeft from '../ScreenComponents/DashboardLeft';
import DashboardRight from '../ScreenComponents/DashboardRight';
import { useLocation } from 'react-router-dom';


/**
 * Dashboard Component
 * 
 * Displays the main dashboard of the extension.
 * The dashboard consists of two main sections:
 * 1. Left Section: Displays the audit results and allows the user to select different lists (e.g., Passes, Violations).
 * 2. Right Section: Displays the rendered webpage of the selected URL.
 * 
 * @returns {JSX.Element} The rendered Dashboard component.
 * 
 * @see https://mui.com/material-ui/react-grid/
 * @see https://mui.com/material-ui/react-use-media-query/
 * @see https://reactrouter.com/api/components/Outlet
 */
const Dashboard = () => {
  const [storedUrl, setStoredUrl] = useState('');
  const { auditResults, loading, setLoading} = useOutletContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [chosenList, setChosenList] = useState('passes');
  const location = useLocation();
  const headingRef = useRef(null);

  useEffect(() => {
    if (chrome?.storage?.local) {
      chrome.storage.local.get(['extensionUrl'], (result) => {
        setStoredUrl(result.extensionUrl || '');
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (headingRef.current) {
        headingRef.current.focus();
      }
    }, 500)
  }, [theme]);

  return (
    <Grid container sx={{ height: 'auto', width: '100%', pl: 2}}>
      <Grid 
        item 
        xs={12} 
        md={7}
        sx={{
          height: '100%',
          display: 'flex'
        }}>
        <DashboardLeft auditResults={auditResults} url={storedUrl} chosenList={chosenList} setChosenList={setChosenList} headingRef={headingRef}/>
      </Grid>
      
      <Grid 
        item 
        xs={12} 
        md={5}
        sx={{
          height: 'auto',
          display: 'flex',
          pt: isMobile ? 1 : 0
        }}>
        <DashboardRight url={storedUrl} chosenList={chosenList} auditResults={auditResults}/>
      </Grid>
    </Grid>
  );
};

export default Dashboard;