/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Grid, Box, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router';
import AppBarBottom from './AppBarBottom';

const useStyles = makeStyles(() => ({
  nameTitle: {
    position: 'absolute',
    color: ' rgba(102, 102, 102, 0.15)',
    fontSize: '48px',
    fontWeight: 900,
    lineHeight: '56px',
    whiteSpace: 'nowrap',
    left: 'calc(100vw - 400px)',
    top: '30px',
    float: 'left',
  },
  userAvatar: {
    width: 80,
    height: 80,
  },
  childAvatar: {
    width: 55,
    height: 55,
    backgroundColor: '#FDE1C1',
    margin: 'auto',
  },
  theCard: {
    marginBottom: 10,
    padding: 10,
    minHeight: '70px',
  },
  icons: {
    width: 14,
    height: 14,
    marginLeft: 4,
    marginRight: 4,
  },
  sayName: {
    textAlign: 'right',
    padding: 5,
    margin: 'auto',
  },
  actionArea: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
}));

const Profile = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  useEffect(() => {
    if (!userInfo && !successLogin) {
      history.push('/login?redirect=main/profile');
    }
  }, [userInfo, successLogin, history]);

  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" maxWidth>
      {userInfo ? (
        <>
          <Grid
            container
            direction="column"
            alignItems="center"
            sx={{
              marginTop: 4,
              marginBottom: 4,
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <Grid
              item
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ marginTop: 1 }}
            >
              <Grid item xs={3} md={2}>
                <Avatar
                  src={userInfo.user.avatarUrl}
                  className={classes.userAvatar}
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: 2 }}>
                <Typography variant="subtitle1">{`${userInfo.user.firstName} ${userInfo.user.lastName}`}</Typography>
              </Grid>
              <Grid item xs={3} sx={{ padding: 2, zIndex: 10 }}>
                <IconButton
                  color="primary"
                  onClick={() => history.push('/main/profile/settings')}
                >
                  <Box
                    sx={{
                      bgcolor: 'white',
                      maxHeight: '30px',
                    }}
                  >
                    <img
                      src="/images/icons/settings.svg"
                      alt="profile settings"
                      style={{
                        padding: '3px',
                      }}
                    />
                  </Box>
                </IconButton>
              </Grid>

              <Grid>
                <Typography className={classes.nameTitle}>
                  {`${userInfo.user.firstName} ${userInfo.user.lastName}`}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Box
            sx={{
              p: 4,
              marginBottom: 2,
              width: '100%',
              bgcolor: 'white',
              textAlign: 'center',
            }}
          >
            <Grid container direction="row">
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  {t('profile.credit')}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#f05a31' }}>
                  {userInfo.user.credit.toLocaleString() + t('currency.toman')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  {t('profile.doneNeeds')}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#f05a31' }}>
                  {userInfo.user.done_needs_count}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <AppBarBottom path="profile" />
        </>
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default Profile;
