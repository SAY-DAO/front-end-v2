import React, { useState, useEffect } from 'react';
import { Grid, Box, Card, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { useNavigate, Link } from 'react-router-dom';
import AppBarBottom from '../AppBarBottom';
import { USER_RESET_PASSWORD_RESET } from '../../../constants/main/userConstants';
import WalletModal from '../../modals/WalletModal';
import { fetchUserDetails } from '../../../actions/userAction';

const Profile = () => {
  const navigate = useNavigate();
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
      navigate('/auth/login?redirect=main/profile');
    }
  }, [errorUserDetails, dispatch]);

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
                  sx={{
                    boxShadow: '1px 1px #888888',
                    width: 80,
                    height: 80,
                    zIndex: 10,
                  }}
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
                  onClick={() => navigate('/main/profile/settings')}
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

              <Grid item sx={{ position: 'relative' }}>
                <Typography
                  sx={{
                    position: 'absolute',
                    color: ' rgba(102, 102, 102, 0.15)',
                    fontSize: '48px',
                    fontWeight: 900,
                    lineHeight: '56px',
                    whiteSpace: 'nowrap',
                    left: 'calc(100vw - 400px)',
                    top: '-50px',
                    float: 'left',
                  }}
                >
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

          {modal && <WalletModal modal={modal} setModal={setModal} />}
        </>
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default Profile;
