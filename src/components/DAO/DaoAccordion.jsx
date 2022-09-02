import {
  AccordionSummary,
  Accordion,
  AccordionDetails,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DaoChildCard from './DaoChildCard';
import { updateNestServer } from '../../redux/actions/main/daoAction';

export default function DaoAccarion() {
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState(false);

  const myHome = useSelector((state) => state.myHome);
  const { user, children } = myHome;

  const server = useSelector((state) => state.server);
  const { updated } = server;

  const themeOptions = useSelector((state) => state.themeOptions);
  const { activeMode } = themeOptions;

  const handleChange = (childId) => (event, isExpanded) => {
    setExpanded(isExpanded ? childId : false);
    dispatch(updateNestServer(childId));
  };

  return (
    <Grid container>
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
                updated.nestNeedResult.map((n) => (
                  <Typography key={n.need_id}>
                    {n.participants && n.participants.map((p) => p.id_user)}
                  </Typography>
                ))
              ) : (
                <CircularProgress />
              )}
            </AccordionDetails>
          </Accordion>
        ))}
    </Grid>
  );
}
