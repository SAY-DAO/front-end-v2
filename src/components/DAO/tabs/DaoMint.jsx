import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import MintInfoCard from '../MintInfoCard';

export default function DaoMint() {
  const { t } = useTranslation();

  return (
    <Grid container>
      <MintInfoCard />
      <Container sx={{ p: 4, textAlign: 'center', m: 'auto', mt: 15 }}>
        <Typography component="span">{t('dao.mintTab.notAvailable')}</Typography>
      </Container>
    </Grid>
  );
}
