import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import CartAccordion from '../cart/CartAccordion';
import AppBarBottom from './AppBarBottom';

export default function Cart() {
  const history = useHistory();
  const { t } = useTranslation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  const theCart = useSelector((state) => state.theCart);
  const { cartItems } = theCart;

  useEffect(() => {
    if (!userInfo && !successLogin) {
      history.push('/login?redirect=main/cart');
    }
  }, [userInfo, successLogin, history]);

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
          width: '100%',
          bgcolor: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="subtitle1">{t('cart.title')}</Typography>
      </Box>
      <CartAccordion cartItems={cartItems} />
      <AppBarBottom path="cart" />
    </Grid>
  );
}
