/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import AppBar from '../components/main/AppBar';
import Profile from '../components/main/Profile';
import Search from '../components/main/Search';
import Cart from '../components/main/Cart';
import Home from '../components/main/home/Home';
import MyChildPage from './MyChildPage';
import NeedPage from './NeedPage';

const Main = () => {
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
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ margin: 0, padding: 0 }}
    >
      {path === '/main/profile' ? (
        <Profile />
      ) : path === '/main/cart' ? (
        <Cart />
      ) : path === '/main/search' ? (
        <Search sx={{ minHeight: '100vh' }} />
      ) : path === '/main/home' ? (
        <Home />
      ) : path.indexOf('/needs') > -1 ? (
        <NeedPage sx={{ margin: 0, padding: 0 }} />
      ) : path.indexOf('/child') > -1 ? (
        <MyChildPage sx={{ margin: 0, padding: 0 }} />
      ) : null}
      <AppBar />
    </Grid>
  );
};
export default Main;
