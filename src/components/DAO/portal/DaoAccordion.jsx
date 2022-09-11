/* eslint-disable no-nested-ternary */
import {
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Grid,
  CircularProgress,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import DaoChildCard from './DaoChildCard';
import { updateNestServer } from '../../../redux/actions/main/daoAction';
import DaoDoneTable from './DaoDoneTable';

// let child;
export default function DaoAccardion() {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);
  const [childId, setChildId] = useState();

  const myHome = useSelector((state) => state.myHome);
  const { user, children } = myHome;

  const server = useSelector((state) => state.server);
  const { updated } = server;

  const themeOptions = useSelector((state) => state.themeOptions);
  const { activeMode } = themeOptions;

  useEffect(() => {
    if (childId) {
      dispatch(updateNestServer(childId, user.id));
    }
  }, [childId]);

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

      {children &&
        children.map((child) => (
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
              {updated ? (
                <DaoDoneTable updated={updated} />
              ) : (
                <CircularProgress />
              )}
            </AccordionDetails>
          </Accordion>
        ))}
    </Grid>
  );
}
