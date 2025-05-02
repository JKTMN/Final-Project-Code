import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import InformationButton from './InformationButton';

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

    let backgroundColor;
    let textColor = theme.palette.common.white;

    if (score <= 33) {
        backgroundColor = 'red';
        textColor = theme.palette.common.white;
    } else if (score <= 66) {
        backgroundColor = 'orange';
        textColor = theme.palette.common.white;
    } else {
        backgroundColor = 'green';
        textColor = theme.palette.common.white;
    }

    return (
      <Box
        sx={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: backgroundColor,
          margin: theme.spacing(1, 'auto'),
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
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
        <Typography 
          variant="h4" 
          sx={{ 
            color: textColor, 
            textAlign: 'center', 
            lineHeight: '200px',
          }}
        >
            {score}%
        </Typography>
        <InformationButton onClick={null} toolTip="This accessibility score was calculated using this equation: 'passes / total elements * 100"/>
      </Box>
    );
}

export default ScoreContainer;
