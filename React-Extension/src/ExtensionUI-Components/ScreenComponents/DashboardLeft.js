import React, { useState, useEffect } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { removeScheme } from '../../functions/utilityFunctions';
import TabsComponent from '../SmallComponents/TabsComponent';
import ResultsList from '../SmallComponents/ResultsList';
import FilterSelect from '../SmallComponents/FilterSelect';
import ScoreContainer from '../SmallComponents/ScoreContainer';
import { calculateAccessibilityScore } from '../../functions/calculateAccessibilityScore';

/**
 * DashboardLeft Component
 * 
 * This component is responsible for rendering the left side of the dashboard.
 * It displays the results of the audit in a list format, along with a score container and filter options.
 * 
 * @param {Object} auditResults - The results of the audit.
 * @param {string} url - The URL of the audited page.
 * @param {string} chosenList - The currently selected list (e.g., "Passes", "Violations", etc.).
 * @param {function} setChosenList - Function to update the selected list.
 * 
 * @returns the rendered DashboardLeft component.
 */
const DashboardLeft = ({ auditResults, url, chosenList, setChosenList, headingRef }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { passes = [], violations = [], incomplete = [], inapplicable = [], testsRan = [] } = auditResults || {};
    const [filters, setFilters] = useState([]);
    const [filter, setFilter] = useState({});
    const [listData, setListData] = useState(passes);
    const [calculatedScore, setCalculatedScore] = useState(0);

    useEffect(() => {
    const uniqueTags = [...new Set(listData.flatMap(listItem => listItem.tags))];
    setFilters(["all", ...uniqueTags]);
    }, [listData]);

    const tabLabels = [
        ["Passes", passes?.length || 0],
        ["Violations", violations?.length || 0],
        ["Incomplete", incomplete?.length || 0],
        ["Inapplicable", inapplicable?.length || 0],
        ["Tests Ran", testsRan?.length || 0]
      ];

    useEffect(() => {
    const listMapping = {
        "Passes": passes,
        "Violations": violations,
        "Incomplete": incomplete,
        "Inapplicable": inapplicable,
        "Tests Ran": testsRan,
    };
    
    setListData(listMapping[chosenList] || []);
    setFilter("all");
    }, [chosenList, auditResults]);

    useEffect(() => {
        setCalculatedScore(calculateAccessibilityScore(testsRan.length, passes.length, inapplicable.length));
    }, [passes, testsRan, inapplicable]);
    

    return (
        <Box sx={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden', 
            pl: isMobile ? 5 : 6,
        }}>
            <Box sx={{ 
                minHeight: '3rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography
                variant={isMobile ? "h5" : "h4"}
                id="main-title"
                ref={headingRef}
                tabIndex={-1}
                sx={{ 
                    color: theme.palette.text.primary,
                    textAlign: 'center',
                    my: 4,
                }}
                >
                Results For {removeScheme(url)}
                </Typography>
            </Box>

            <ScoreContainer score={calculatedScore} />

            <Box sx={{ width: '100%', mb: 0.5}}>
                <TabsComponent setChosenList={setChosenList} tabLabels={tabLabels} />
            </Box>

            <Box sx={{justifyItems: 'flex-end', pr: 4}}>
            <FilterSelect filters={filters} setFilter={setFilter} width={120}/>
            </Box>

            <Box sx={{ width: '100%', flex: 1}}>
                <ResultsList title={chosenList} listData={listData} chosenList={chosenList} filter={filter}/>
            </Box> 
        </Box>
    );
}

export default DashboardLeft;