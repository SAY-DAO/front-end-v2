import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import CartAccordion from '../cart/CartAccordion';

export default function Cart() {
  const { t } = useTranslation();
  const history = useHistory();

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
      <Box
        sx={{
          p: 2,
          marginBottom: 2,
          border: '1px solid grey',
          width: '100%',
          bgcolor: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="subtitle1">{t('cart.title')}</Typography>
      </Box>
      <CartAccordion />
    </Grid>
  );
}
