import React from 'react';
import { experimentalStyled, Container, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MainWrapper = experimentalStyled('div')(() => ({
  minHeight: '100vh',
  overflow: 'hidden',
  width: '100%',
}));
const PageWrapper = experimentalStyled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden',

  backgroundColor: theme.palette.background.default,

  [theme.breakpoints.up('md')]: {
    paddingTop: '64px',
  },
  [theme.breakpoints.down('sm')]: {
    // paddingTop: '10px',
  },
}));

const FullLayout = () => (
  <MainWrapper>
    <PageWrapper>
      <Container maxWidth={false}>
        <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
          <Outlet />
        </Box>
      </Container>
    </PageWrapper>
  </MainWrapper>
);

export default FullLayout;
