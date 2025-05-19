import React from 'react';
import { Box, Typography, useTheme, Grid, Card, CardContent, List, ListItem, ListItemText, Chip, Link, Tooltip, IconButton} from '@mui/material';
import { Info as InfoIcon, Code as CodeIcon, BugReport as IssuesIcon, Checklist as TestIcon, OpenInNew } from '@mui/icons-material';

const sectionIcons = {
  'Why Keyboard Navigation Matters': <CodeIcon />,
  'Implementation Guidelines': <CodeIcon />,
  'Testing Protocol': <TestIcon />,
  'Common Issues & Fixes': <IssuesIcon />,
  'Why Screen Reader Support Matters': <InfoIcon />,
};

const GuideContent = ({ topic, isMobile }) => {
  const theme = useTheme();

  const renderItems = (items) => {
    if (items[0]?.issue) {
      return (
        <List dense>
          {items.map((item, index) => (
            <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column' }}>
              <Typography variant="subtitle1" color="error" fontWeight={500}>
                {item.issue}
              </Typography>
              <Typography variant="body2" sx={{ ml: 2, mb: 1 }}>
                {item.fix}
              </Typography>
              {item.source && (
                <Link 
                  href="#" 
                  variant="caption" 
                  underline="hover" 
                  sx={{ ml: 2, display: 'flex', alignItems: 'center' }}
                  aria-label={`Source for ${item.issue}`}
                >
                  <OpenInNew fontSize="inherit" sx={{ mr: 0.5 }} />
                  Source Documentation
                </Link>
              )}
            </ListItem>
          ))}
        </List>
      );
    }

    if (items[0]?.checks) {
      return (
        <List dense>
          {items.map((item, index) => (
            <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column' }}>
              <Typography variant="subtitle2" gutterBottom>
                {item.description}
              </Typography>
              <List dense sx={{ width: '100%' }}>
                {item.checks.map((check, checkIndex) => (
                  <ListItem key={checkIndex}>
                    <ListItemText
                      primary={check}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
              {item.source && (
                <Link 
                  href="#" 
                  variant="caption" 
                  underline="hover" 
                  sx={{ display: 'flex', alignItems: 'center' }}
                  aria-label={`Source for ${item.description}`}
                >
                  <OpenInNew fontSize="inherit" sx={{ mr: 0.5 }} />
                  Testing Methodology
                </Link>
              )}
            </ListItem>
          ))}
        </List>
      );
    }

    return (
      <List dense>
        {items.map((item, index) => (
          <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column' }}>
            <ListItemText
              primary={typeof item === 'object' ? item.description : item}
              primaryTypographyProps={{ variant: 'body2' }}
              secondary={
                <>
                  {item.example && (
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        mt: 1,
                        p: 1.5,
                        fontFamily: 'monospace',
                        fontSize: '0.8rem'
                      }}
                    >
                      <pre style={{ margin: 0 }}>{item.example}</pre>
                    </Card>
                  )}
                  {item.wcag_refs && (
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                      {item.wcag_refs.map((ref, i) => (
                        <Grid item key={i}>
                          <Chip
                            label={`WCAG ${ref}`}
                            size="small"
                            variant="outlined"
                            aria-label={`WCAG ${ref} reference`}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </>
              }
              secondaryTypographyProps={{ component: 'div' }}
            />
          </ListItem>
        ))}
      </List>
    );
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card 
          component="section"
          aria-labelledby="overview-section"
          sx={{ 
            backgroundColor: theme.palette.background.default,
            borderLeft: `4px solid ${theme.palette.primary.main}`
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Tooltip title="General information about this topic" arrow>
                <IconButton aria-label="Overview information" size="small">
                  <InfoIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Typography variant="h6" component="h2" id="overview-section">
                Overview
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {topic.summary}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {topic.sections.map((section, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Card 
            component="article"
            aria-labelledby={`section-${index}-heading`}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderLeft: `4px solid ${theme.palette.primary.main}`,
              transition: 'box-shadow 0.3s',
              '&:hover': {
                boxShadow: theme.shadows[3]
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Tooltip title={section.title} arrow>
                  <IconButton aria-label={section.title} size="small">
                    {sectionIcons[section.title]}
                  </IconButton>
                </Tooltip>
                <Typography variant="h6" component="h3" id={`section-${index}-heading`}>
                  {section.title}
                </Typography>
              </Box>

              {section.description && (
                <Typography variant="body1" paragraph sx={{ mb: 2 }}>
                  {section.description}
                </Typography>
              )}

              {section.items && renderItems(section.items)}
            </CardContent>
          </Card>
        </Grid>
      ))}

      {topic.wcag_references && (
        <Grid item xs={12}>
          <Card 
            component="section"
            aria-labelledby="wcag-references"
            sx={{ backgroundColor: theme.palette.background.default }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Tooltip title="WCAG specification references" arrow>
                  <IconButton aria-label="WCAG references" size="small">
                    <CodeIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Typography variant="h6" component="h2" id="wcag-references">
                  WCAG References
                </Typography>
              </Box>
              <Grid container spacing={2}>
                {topic.wcag_references.map((ref, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card variant="outlined" sx={{ p: 2 }}>
                      <Typography variant="subtitle2" component="h3">
                        {ref.title} (Level {ref.level})
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {ref.description}
                      </Typography>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      )}

      <Grid item xs={12}>
        <Card 
          component="section"
          aria-labelledby="resources-section"
          sx={{ 
            backgroundColor: theme.palette.background.default,
            borderLeft: `4px solid ${theme.palette.secondary.main}`
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Tooltip title="Additional learning resources" arrow>
                <IconButton aria-label="Additional resources" size="small">
                  <IssuesIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Typography variant="h6" component="h2" id="resources-section">
                Additional Resources
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {topic.resources.map((resource, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Tooltip title={`Open ${resource.type} resource`} arrow>
                    <Card 
                      component="a"
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          backgroundColor: theme.palette.action.hover,
                          boxShadow: 3
                        }
                      }}
                      aria-label={`Resource: ${resource.title}`}
                      role="link"
                    >
                      <CardContent>
                        <Typography 
                          variant="subtitle2" 
                          gutterBottom 
                          color="primary"
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <OpenInNew fontSize="inherit" sx={{ mr: 1 }} />
                          {resource.type}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                          {resource.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default GuideContent;