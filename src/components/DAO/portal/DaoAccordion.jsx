/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Grid,
  CircularProgress,
  Divider,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DaoChildCard from './DaoChildCard';
import DaoDoneTable from './DaoDoneTable';

export default function DaoAccardion({ childrenList }) {
  const [expanded, setExpanded] = useState(false);
  const [childId, setChildId] = useState();

  const server = useSelector((state) => state.server);
  const { updated } = server;

  const themeOptions = useSelector((state) => state.themeOptions);
  const { activeMode } = themeOptions;

  const handleChange = (id) => (event, isExpanded) => {
    setExpanded(isExpanded ? id : false);
    setChildId(id);
  };
  return (
    <Grid container>
      <Box
        sx={{
          width: '100%',
          height: 200,
          m: 1,
          backgroundColor: '#282C34',
          '&:hover': {
            backgroundColor: 'primary.light',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
      <Divider sx={{ width: '100%', mt: 2, mb: 2 }}>My Children</Divider>

      {childrenList &&
        childrenList.map((child) => (
          <Accordion
            key={child.id}
            expanded={expanded === child.id}
            onChange={handleChange(child.id)}
            sx={{ width: '100%' }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{
                '& .MuiAccordionSummary-expandIconWrapper': {
                  pt: '20px',
                  pb: '20px',
                  mb: 1,
                  boxShadow: activeMode === 'dark' && '0px 2px 5px 1px #282C34',
                },
              }}
            >
              <DaoChildCard key={child.id} myChild={child} />
            </AccordionSummary>
            <AccordionDetails
              sx={{
                fontSize: '15px',
                color: 'text.custom',
              }}
            >
              {updated ? <DaoDoneTable updated={updated} /> : <CircularProgress />}
            </AccordionDetails>
          </Accordion>
        ))}
    </Grid>
  );
}

DaoAccardion.propTypes = {
  childrenList: PropTypes.array.isRequired,
};
