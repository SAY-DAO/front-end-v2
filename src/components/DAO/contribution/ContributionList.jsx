import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Typography } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { fetchAvailableContribution } from '../../../redux/actions/main/daoAction';
import ContributionModal from '../../modals/ContributionModal';

export default function ContributionList() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const ecoContribution = useSelector((state) => state.ecoContribution);
  const { contributions } = ecoContribution;

  useEffect(() => {
    dispatch(fetchAvailableContribution());
  }, []);
  const handlePopUp = (contribution) => {
    setOpen(true);
    setData({ ...contribution });
  };
  return (
    <Box sx={{ width: '100%', mb: 15 }}>
      <Typography sx={{ textAlign: 'center', mb: 2, mt: 2, fontWeight: 400 }}>
        {t('dao.contributionTab.title')}
      </Typography>
      <nav aria-label="main mailbox folders">
        <List>
          {contributions &&
            contributions.map((c) => (
              <Card sx={{ border: '0.01em solid lightGrey', borderRadius: 2, mb: 2 }}>
                <ListItem key={c.id}>
                  <ListItemButton onClick={() => handlePopUp(c)}>
                    <ListItemIcon>
                      <WorkOutlineIcon />
                    </ListItemIcon>
                    <ListItemText primary={c.title} />
                  </ListItemButton>
                </ListItem>
              </Card>
            ))}
        </List>
      </nav>
      <ContributionModal open={open} setOpen={setOpen} data={data} />
    </Box>
  );
}
