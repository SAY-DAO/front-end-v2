import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Back from '../Back';

export default function Settings() {
  const { t } = useTranslation();

  const theCart = useSelector((state) => state.theCart);
  const { cartItems } = theCart;

  // cart badge number
  useEffect(() => {
    if (cartItems) {
      //   setBadgeNumber(cartItems.length);
    }
  }, [cartItems]);

  return (
    <Grid sx={{ width: '100%' }}>
      <Back to="/main/profile" isOrange />
      <Box
        sx={{
          p: 2,
          marginBottom: 2,
          width: '100%',
          bgcolor: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="subtitle1">{t('setting.title')}</Typography>
      </Box>
    </Grid>
  );
}
