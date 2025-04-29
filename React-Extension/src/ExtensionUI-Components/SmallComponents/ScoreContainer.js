import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';

/**
 * ScoreContainer Component
 * 
 * This component is responsible for rendering a circular score container.
 * @param {String} score - The score to be displayed in the container.
 * 
 * @returns The rendered ScoreContainer component.
 */
const ScoreContainer = ({ score }) => {
    const theme = useTheme();

    return (
      <Box
        sx={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: theme.palette.primary.main,
          margin: theme.spacing(1, 'auto'),
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          [theme.breakpoints.down('sm')]: {
            width: 100,
            height: 100,
          },
          [theme.breakpoints.between('sm', 'md')]: {
            width: 130,
            height: 130,
          },
        }}
      >
        <Typography variant="h4" sx={{ color: theme.palette.common.white, textAlign: 'center', lineHeight: '200px' }}>
            {score}
        </Typography>
      </Box>
    );
}

export default ScoreContainer;