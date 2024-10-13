import React from 'react';
import { experimentalStyled, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppBarBottom from '../components/AppBarBottom';

const MainWrapper = experimentalStyled('div')(() => ({
  minHeight: '100vh',
  overflow: 'hidden',
}));

const AppBarLayout = () => (
  <MainWrapper>
    <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
      <Outlet />
    </Box>
    <AppBarBottom />
  </MainWrapper>
);

export default AppBarLayout;
