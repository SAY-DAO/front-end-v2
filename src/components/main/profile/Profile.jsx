import React, { useState, useEffect } from 'react';
import { Grid, Box, Card, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import AppBarBottom from '../AppBarBottom';
import { USER_RESET_PASSWORD_RESET } from '../../../constants/main/userConstants';
import WalletModal from '../../modals/WalletModal';
import { fetchUserDetails } from '../../../actions/userAction';

const useStyles = makeStyles(() => ({
  nameTitle: {
    position: 'absolute',
    color: ' rgba(102, 102, 102, 0.15)',
    fontSize: '48px',
    fontWeight: 900,
    lineHeight: '56px',
    whiteSpace: 'nowrap',
    left: 'calc(100vw - 350px)',
    top: '30px',
    float: 'left',
  },
  userAvatar: {
    boxShadow: '1px 1px #888888',
    width: 80,
    height: 80,
    zIndex: 10,
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
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [modal, setModal] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { theUser, error: errorUserDetails } = userDetails;

  // login
  useEffect(() => {
    dispatch({ type: USER_RESET_PASSWORD_RESET });
    dispatch(fetchUserDetails());
    if (errorUserDetails) {
      history.push('/login?redirect=main/profile');
    }
  }, [history, errorUserDetails, dispatch]);

  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" maxWidth>
      {theUser ? (
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
                  src={theUser.avatarUrl}
                  className={classes.userAvatar}
                />
              </Grid>
              <Grid item xs={6} sx={{ padding: 2 }}>
                <Typography variant="subtitle1">{`${theUser.firstName} ${theUser.lastName}`}</Typography>
                {/* <Grid item xs>
                  <Link to="/main/profile/edit">
                    <Typography
                      component="span"
                      sx={{ paddingTop: 2, paddingBlock: 2 }}
                      color="primary"
                      variant="body2"
                    >
                      {t('profile.editProfile.title')}
                    </Typography>
                  </Link>
                </Grid> */}
              </Grid>
              <Grid item xs={3} sx={{ padding: 2, zIndex: 10 }}>
                <IconButton
                  color="primary"
                  onClick={() => history.push('/main/profile/settings')}
                >
                  <Card
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
                  </Card>
                </IconButton>
              </Grid>

              <Grid>
                <Typography className={classes.nameTitle}>
                  {`${theUser.firstName} ${theUser.lastName}`}
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
                  {theUser.credit.toLocaleString() + t('currency.toman')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  {t('profile.doneNeeds')}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: '#f05a31' }}>
                  {theUser.done_needs_count}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              p: 2,
              marginBottom: 2,
              width: '100%',
            }}
          >
            <Grid>
              <Typography variant="body1">
                {t('profile.creditModal.thumbnail')}
                <IconButton color="primary" onClick={() => setModal(true)}>
                  <InfoOutlinedIcon />
                </IconButton>
              </Typography>
            </Grid>
          </Box>

          <AppBarBottom path="profile" />
          {modal && <WalletModal modal={modal} setModal={setModal} />}
        </>
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default Profile;
