import React from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import NeedPageProduct from './NeedPageProduct';
import NeedPageService from './NeedPageService';

export default function NeedInfo({ oneNeed }) {
  const { t } = useTranslation();

  return (
    <>
      <Grid
        item
        xs={12}
        md={8}
        container
        direction="row"
        sx={{ marginTop: 5, padding: 2 }}
      >
        <Grid item xs={3}>
          <Typography variant="subtitle2">{t('needPage.needInfo')}</Typography>
        </Grid>
        <Grid item xs={9}>
          <Divider sx={{ width: '95%', margin: 1 }} />
        </Grid>
      </Grid>
      <Grid item xs={12} md={8}>
        {oneNeed.type === 1 ? (
          <NeedPageProduct oneNeed={oneNeed} />
        ) : (
          <NeedPageService oneNeed={oneNeed} />
        )}
      </Grid>
    </>
  );
}

NeedInfo.propTypes = {
  oneNeed: PropTypes.object.isRequired,
};
