import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { Grid, Typography, Divider, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/userAction';
import Back from '../Back';
import LangButton from '../LangButton';
import Message from '../Message';
import { USER_RESET_PASSWORD_RESET } from '../../redux/constants/main/userConstants';

const useStyles = makeStyles(() => ({
  icon: {
    maxWidth: '25px',
    maxHeight: '25px',
    marginLeft: 8,
    marginRight: 8,
  },
}));

export default function Settings() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theCart = useSelector((state) => state.theCart);
  const { cartItems } = theCart;

  const userResetPass = useSelector((state) => state.userResetPass);
  const { success: successReset } = userResetPass;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  useEffect(() => {
    if (!userInfo && !successLogin) {
      navigate('/auth/login?redirect=main/home');
    }
    return () => {
      dispatch({ type: USER_RESET_PASSWORD_RESET });
    };
  }, [userInfo, successLogin]);

  // cart badge number
  useEffect(() => {
    if (cartItems) {
      //   setBadgeNumber(cartItems.length);
    }
  }, [cartItems]);

  const classes = useStyles();

  return (
    <Grid sx={{ width: '100%', height: '100vh' }}>
      <Back to="/main/profile" isOrange />
      <Box
        sx={{
          p: 2,
          marginBottom: 2,
          width: '100%',
          bgcolor: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="subtitle1">{t('setting.title')}</Typography>
      </Box>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        alignItems="stretch"
        spacing={1}
      >
        <Grid item container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={2}>
            <IconButton>
              <img src="/images/icons/language.svg" alt="language icon" className={classes.icon} />
            </IconButton>
          </Grid>

          <Grid item xs={8}>
            <IconButton sx={{ padding: 0 }}>
              <Typography component="span" variant="subtitle2">
                {t('setting.language.title')}
              </Typography>
            </IconButton>
          </Grid>
          <Grid item xs>
            <LangButton />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider
            sx={{
              width: '80%',
              margin: 'auto',
              textAlign: 'center',
            }}
          />
        </Grid>
        <Grid item container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={2}>
            <IconButton onClick={() => navigate('/auth/reset-password')}>
              <img
                src="/images/icons/changePassword.svg"
                alt="change password icon"
                className={classes.icon}
              />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Link to="/auth/reset-password">
              <Typography component="span" variant="subtitle2">
                {t('setting.changePass.title')}
              </Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider
            sx={{
              width: '80%',
              margin: 'auto',
              textAlign: 'center',
            }}
          />
        </Grid>
        {/* <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={1}>
            <img
              src="/images/icons/un.svg"
              alt="un icon"
              className={classes.icon}
            />
          </Grid>
          <Grid item xs>
            <Typography
              component="span"
              variant="subtitle1"
            >
              {t('setting.crc.title')}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider
            sx={{
              width: '80%',
              margin: 'auto',
              textAlign: 'center',
            }}
          />
        </Grid>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={1}>
            <img
              src="/images/icons/email.svg"
              alt="contact icon"
              className={classes.icon}
            />
          </Grid>
          <Grid item xs>
            <Typography
              component="span"
              variant="subtitle1"
            >
              {t('setting.contact.title')}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider
            sx={{
              width: '80%',
              margin: 'auto',
              textAlign: 'center',
            }}
          />
        </Grid> */}
        {/* <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        > */}
        {/* <Grid item xs={1}>
            <img
              src="/images/icons/info.svg"
              alt="language icon"
              className={classes.icon}
            />
          </Grid> */}
        {/* <Grid item xs>
            <Typography
              component="span"
              variant="subtitle1"
            >
              {t('setting.about.title')}
            </Typography>
          </Grid> */}
        {/* <Grid item xs={12}>
            <Divider
              sx={{
                width: '80%',
                margin: 'auto',
                textAlign: 'center',
              }}
            />
          </Grid>
        </Grid> */}
        <Grid item container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item xs={2}>
            <IconButton onClick={() => dispatch(logout())}>
              <img src="/images/icons/exit.svg" alt="language icon" className={classes.icon} />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Link to="#" onClick={() => dispatch(logout())}>
              <Typography component="span" variant="subtitle1" sx={{ color: '#FF8393' }}>
                {t('setting.logout.title')}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center', margin: 4 }}>
        {successReset && (
          <Message variant="standard" severity="success">
            {t('change-password.successNotif')}
          </Message>
        )}
      </Grid>
    </Grid>
  );
}
