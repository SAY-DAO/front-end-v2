import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function DaoMint() {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Container sx={{ p: 4, textAlign: 'center', m: 'auto', mt: 20 }}>
        <Typography>{t('dao.mintTab.notAvailable')}</Typography>
      </Container>
    </Grid>
  );
}
