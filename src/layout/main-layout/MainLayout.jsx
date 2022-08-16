import React from 'react';
import { experimentalStyled, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MainWrapper = experimentalStyled('div')(() => ({
  minHeight: '100vh',
  overflow: 'hidden',
}));

const MainLayout = () => (
  <MainWrapper>
    <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
      <Outlet />
    </Box>
  </MainWrapper>
);

export default MainLayout;
