import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchUserDetails } from '../../redux/actions/userAction';
import CartAccordion from '../../components/cart/CartAccordion';

export default function Cart() {
  const navigate = useNavigate();
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
      navigate('/auth/login?redirect=main/cart');
    }
  }, [userInfo, successLogin, errorUserDetails, dispatch]);

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
      {!cartItems || !cartItems[0] ? (
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
    </Grid>
  );
}
