import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { fetchAvailableContribution } from '../../../redux/actions/main/daoAction';

export default function ContributionList() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const ecoContribution = useSelector((state) => state.ecoContribution);
  const { contributions } = ecoContribution;

  useEffect(() => {
    dispatch(fetchAvailableContribution());
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: 360, mb: 15 }}>
      <nav aria-label="main mailbox folders">
        <List>
          <Grid container>
            <Typography sx={{ m: 'auto', p: 4 }}>
              {t('dao.contributionTab.notAvailable')}
            </Typography>
          </Grid>
          {contributions &&
            contributions.map((c) => (
              <ListItem
                key={c.id}
                sx={{ border: '0.01em solid lightGrey', borderRadius: 3, mb: 2 }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts" />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </nav>
    </Box>
  );
}
