import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { Grid, Typography, Divider, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import i18next from 'i18next';
import LangButton from '../../LangButton';
import Back from '../../Back';
import Message from '../../Message';
import { logout } from '../../../actions/userAction';

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
  const history = useHistory();

  const theCart = useSelector((state) => state.theCart);
  const { cartItems } = theCart;

  const userResetPass = useSelector((state) => state.userResetPass);
  const { success: successReset } = userResetPass;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=main/home');
    }
  }, [userInfo, successLogin, history]);

  // cart badge number
  useEffect(() => {
    if (cartItems) {
      //   setBadgeNumber(cartItems.length);
    }
  }, [cartItems]);

  const getLanguage = () => i18next.language || window.localStorage.i18nextLng;

  const clickHandler = () => {
    let lang;
    const currentLang = getLanguage();

    switch (currentLang) {
      case 'en':
        lang = 'fa';
        break;
      case 'fa':
        lang = 'en';
        break;
      default:
        lang = 'fa';
    }

    i18next.changeLanguage(lang);
  };
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
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={2}>
            <IconButton onClick={clickHandler}>
              <img
                src="/images/icons/language.svg"
                alt="language icon"
                className={classes.icon}
              />
            </IconButton>
          </Grid>

          <Grid item xs={8}>
            <IconButton onClick={clickHandler}>
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
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={2}>
            <IconButton onClick={() => history.push('/setpassword')}>
              <img
                src="/images/icons/changePassword.svg"
                alt="change password icon"
                className={classes.icon}
              />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Link to="/setpassword">
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
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={2}>
            <IconButton onClick={() => dispatch(logout())}>
              <img
                src="/images/icons/exit.svg"
                alt="language icon"
                className={classes.icon}
              />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Link to="#" onClick={() => dispatch(logout())}>
              <Typography
                component="span"
                variant="subtitle1"
                sx={{ color: '#FF8393' }}
              >
                {t('setting.logout.title')}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center', margin: 4 }}>
        {successReset && (
          <Message variant="filled" severity="success">
            {t('change-password.successNotif')}
          </Message>
        )}
      </Grid>
    </Grid>
  );
}
