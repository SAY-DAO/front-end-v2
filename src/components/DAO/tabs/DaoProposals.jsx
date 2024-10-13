import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function DaoProposals() {
  const { t } = useTranslation();
  return (
    <Grid container>
      <Container sx={{ p: 4, textAlign: 'center', m: 'auto', mt: 15 }}>
        <Typography component="span">{t('dao.proposalsTab.notAvailable')}</Typography>
        <Link target="_blank" to="https://www.tally.xyz/explore">
          {t('dao.link')}
        </Link>
        <Typography component="span">{t('dao.proposalsTab.notAvailable2')}</Typography>
      </Container>
    </Grid>
  );
}
