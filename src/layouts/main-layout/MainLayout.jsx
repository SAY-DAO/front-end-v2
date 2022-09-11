import React, { useEffect } from 'react';
import { experimentalStyled, Box, Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyHome } from '../../redux/actions/main/homeAction';
import { fetchUserDetails } from '../../redux/actions/userAction';
import AppBarBottom from '../../components/AppBarBottom';

const MainWrapper = experimentalStyled('div')(() => ({
  overflow: 'hidden',
  width: '100%',
}));
const PageWrapper = experimentalStyled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',

  backgroundColor: theme.palette.background.default,
}));

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { success: successUserDetails, error: errorUserDetails } = userDetails;

  // login
  useEffect(() => {
    dispatch(fetchMyHome());
    dispatch(fetchUserDetails());
    if (errorUserDetails) {
      navigate('/auth/login?redirect=main/home');
    }
  }, [successUserDetails, errorUserDetails]);

  return (
    <MainWrapper>
      <PageWrapper>
        <Container
          maxWidth={false}
          sx={{ paddingLeft: '0px !important', paddingRight: '0px !important' }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet sx={{ height: '100px' }} />
          </Box>
        </Container>
      </PageWrapper>
      <AppBarBottom />
    </MainWrapper>
  );
};

export default MainLayout;
