import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { Grid, Typography, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import LangButton from '../LangButton';

import Back from '../Back';
import Message from '../Message';

const useStyles = makeStyles(() => ({
  icon: {
    maxWidth: '28px',
    maxHeight: '28px',
    margin: 5,
  },
}));

export default function Settings() {
  const { t } = useTranslation();

  const theCart = useSelector((state) => state.theCart);
  const { cartItems } = theCart;

  const userResetPass = useSelector((state) => state.userResetPass);
  const { success: successReset } = userResetPass;

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
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={1}>
            <img
              src="/images/icons/language.svg"
              alt="language icon"
              className={classes.icon}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography
              component="span"
              variant="subtitle2"
              sx={{ padding: 1 }}
            >
              {t('setting.language.title')}
            </Typography>
          </Grid>
          <Grid item xs={2}>
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
          <Grid item xs={1}>
            <img
              src="/images/icons/changePassword.svg"
              alt="change password icon"
              className={classes.icon}
            />
          </Grid>
          <Grid item xs>
            <Link to="/setpassword">
              <Typography
                component="span"
                variant="subtitle1"
                sx={{ padding: 1 }}
              >
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
        <Grid
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
              sx={{ padding: 1 }}
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
              sx={{ padding: 1 }}
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
              src="/images/icons/info.svg"
              alt="language icon"
              className={classes.icon}
            />
          </Grid>
          <Grid item xs>
            <Typography
              component="span"
              variant="subtitle1"
              sx={{ padding: 1 }}
            >
              {t('setting.about.title')}
            </Typography>
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
              src="/images/icons/exit.svg"
              alt="language icon"
              className={classes.icon}
            />
          </Grid>
          <Grid item xs>
            <Typography
              component="span"
              variant="subtitle1"
              sx={{ padding: 1, color: '#FF8393' }}
            >
              {t('setting.logout.title')}
            </Typography>
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
