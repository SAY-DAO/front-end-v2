/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import AppBar from '../components/main/AppBar';
import Profile from '../components/main/Profile';
import Search from '../components/main/Search';
import Cart from '../components/main/Cart';
import Dashboard from '../components/main/Dashboard';
import MyChildPage from '../components/MyChildPage';

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [content, setContent] = useState('dashboard');

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
    >
      {path === '/main/profile' ? (
        <Profile />
      ) : path === '/main/cart' ? (
        <Cart />
      ) : path === '/main/search' ? (
        <Search sx={{ minHeight: '100vh' }} />
      ) : content === 'dashboard' ? (
        <Dashboard setContent={setContent} />
      ) : (
        <MyChildPage setContent={setContent} />
      )}
      <AppBar />
    </Grid>
  );
};
export default Main;
