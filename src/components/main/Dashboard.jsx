/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Grid, Divider, Typography } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Message';

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
    >
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ direction: 'ltr', marginTop: 10 }}
      >
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={8}>
            first name
          </Grid>
          <Grid item xs={2}>
            name
          </Grid>
          <Grid item xs={2}>
            pic
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10}>
          <Divider sx={{ width: '95%' }} />
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1">{t('dashboard.title')}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 8, textAlign: 'center' }}>
        family
      </Grid>
    </Grid>
  );
};

export default Dashboard;
