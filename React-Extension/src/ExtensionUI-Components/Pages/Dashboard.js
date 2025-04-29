/* global chrome */
import React, { useState, useEffect } from 'react';
import { Grid, useTheme, useMediaQuery } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import DashboardLeft from '../ScreenComponents/DashboardLeft';
import DashboardRight from '../ScreenComponents/DashboardRight';

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
  const [chosenList, setChosenList] = useState('Passes');

  useEffect(() => {
    if (chrome?.storage?.local) {
      chrome.storage.local.get(['extensionUrl'], (result) => {
        setStoredUrl(result.extensionUrl || '');
      });
    }
  }, []);

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
        <DashboardLeft auditResults={auditResults} url={storedUrl} chosenList={chosenList} setChosenList={setChosenList}/>
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
        <DashboardRight url={storedUrl} chosenList={chosenList}/>
      </Grid>
    </Grid>
  );
};

export default Dashboard;