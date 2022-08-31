import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import { Typography, Grid, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LangButton from '../components/LangButton';
import { fetchUserDetails } from '../redux/actions/userAction';

const Intro = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { success: successUserDetails } = userDetails;

  // redirect if logged in
  useEffect(() => {
    dispatch(fetchUserDetails());
    if (userInfo || successLogin || successUserDetails) {
      navigate('/main/home');
    }
  }, [userInfo, successLogin, successUserDetails, dispatch]);

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid
          item
          xs={12}
          sx={{ width: '100%', marginTop: 2, direction: 'rtl' }}
        >
          <LangButton />
        </Grid>
        <Grid item xs={12} sx={{ paddingBottom: 4 }}>
          <img
            src="/images/intro.png"
            width="100%"
            style={{ paddingBottom: '20px' }}
            alt="intro page"
          />
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ paddingBottom: 2 }}
          >
            {t('intro.slideTitle1')}
          </Typography>
          <Typography variant="body1" align="center">
            {t('intro.slideDesc1')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/auth/register')}
          >
            {t('button.register')}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/auth/login')}
          >
            {t('button.login')}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Intro;
