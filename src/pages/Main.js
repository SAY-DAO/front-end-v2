/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import AppBar from '../components/main/AppBar';
import Profile from '../components/main/Profile';
import Search from '../components/main/Search';
import Cart from '../components/main/Cart';
import Home from '../components/main/Home';

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { localUserLogin, success: successLogin } = userLogin;

  useEffect(() => {
    if (!localUserLogin && !successLogin) {
      history.push('/login?redirect=main');
    }
  }, [localUserLogin, successLogin, history]);

  const path = location.pathname;
  return (
    <Grid container>
      {path === '/main/profile' ? (
        <Profile />
      ) : path === '/main/cart' ? (
        <Cart />
      ) : path === '/main/search' ? (
        <Search />
      ) : (
        <Home />
      )}
      <AppBar />
    </Grid>
  );
};
export default Main;
