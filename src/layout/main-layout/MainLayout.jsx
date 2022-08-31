import React, { useEffect } from 'react';
import { experimentalStyled, Box, Container } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyHome } from '../../actions/main/homeAction';
import AppBarBottom from '../../components/main/AppBarBottom';

const MainWrapper = experimentalStyled('div')(() => ({
  overflow: 'hidden',
  width: '100%',
}));
const PageWrapper = experimentalStyled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  // overflow: 'hidden',

  backgroundColor: theme.palette.background.default,
}));

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myHome = useSelector((state) => state.myHome);
  const { success: successHome } = myHome;

  const userDetails = useSelector((state) => state.userDetails);
  const { success: successUserDetails } = userDetails;

  useEffect(() => {
    if (!successHome) {
      dispatch(fetchMyHome());
    }
  }, []);

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
