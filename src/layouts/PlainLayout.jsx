import React from 'react';
import { experimentalStyled, Box, Container } from '@mui/material';
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
}));

const BlankLayout = () => (
  <MainWrapper>
    <PageWrapper>
      <Container
        maxWidth={false}
        sx={{ paddingLeft: '0px !important', paddingRight: '0px !important' }}
      >
        <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
          <Outlet />
        </Box>
      </Container>
    </PageWrapper>
  </MainWrapper>
);
export default BlankLayout;
