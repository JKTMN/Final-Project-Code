import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';


const BarChartTemplate = ({ title }) => {
    return (
        <>
        <Typography sx={{ fontWeight: 'bold', mb: 2 }}>{title}</Typography>
        <BarChart
            xAxis={[
                {
                id: 'barCategories',
                data: ['bar A', 'bar B', 'bar C'],
                scaleType: 'band',
                },
            ]}
            series={[
                {
                data: [2, 5, 3],
                },
            ]}
            width={360}
            height={300}
        />
        </>
    );
};

export default BarChartTemplate;