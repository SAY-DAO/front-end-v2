import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CartAccordion from '../cart/CartAccordion';
import AppBarBottom from './AppBarBottom';
import { fetchUserDetails } from '../../actions/userAction';

export default function Cart() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: errorUserDetails } = userDetails;

  const theCart = useSelector((state) => state.theCart);
  const { cartItems } = theCart;

  // login
  useEffect(() => {
    dispatch(fetchUserDetails());
    if (errorUserDetails) {
      history.push('/login?redirect=main/cart');
    }
  }, [userInfo, successLogin, history, errorUserDetails, dispatch]);

  const cartItemFromStorage = localStorage.getItem('SAY-cartItems')
    ? JSON.parse(localStorage.getItem('SAY-cartItems'))
    : null;

  return (
    <Grid sx={{ width: '100%' }}>
      <Box
        sx={{
          p: 2,
          marginBottom: 2,
          width: '100%',
          bgcolor: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="subtitle1">{t('cart.title')}</Typography>
      </Box>
      {!cartItemFromStorage ? (
        <Box
          sx={{
            width: '70%',
            height: 50,
            margin: 'auto',
            bgcolor: 'transparent',
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ padding: '15px' }}>
            {t('error.emptyCart')}
          </Typography>
        </Box>
      ) : (
        <Grid sx={{ marginRight: 2, marginLeft: 2 }}>
          <CartAccordion />
        </Grid>
      )}

      <AppBarBottom path="cart" />
    </Grid>
  );
}
