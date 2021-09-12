import React, { useState, useEffect } from 'react';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Weather from 'simple-react-weather';
import Message from '../components/Message';
import MyChildTabs from '../components/main/home/MyChildTabs';
import { fetchMyChildById } from '../actions/childAction';
import Back from '../components/Back';
import { CHILD_ONE_NEED_RESET } from '../constants/childConstants';

const useStyles = makeStyles({
  root: {
    top: 0,
    left: 0,
    right: 0,
    minHeight: '290px',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url("/images/child/background.png")',
    margin: 0,
    padding: 0,
  },
  childAvatar: {
    width: 100,
    height: 100,
    top: '20%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f9d6af',
    boxShadow: '4px 4px 10px rgba(0,0,0,.09)',
  },
  childSayName: {
    color: 'white',
    top: '32%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
  childAge: {
    color: 'white',
    top: '35%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
});

const MyChildPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { childId } = useParams();

  const [weatherDisplay, setWeatherDisplay] = useState(false);
  const myChild = useSelector((state) => state.myChild);
  const {
    theChild,
    loading: loadingMyChild,
    error: errorMyChild,
    success: successMyChild,
  } = myChild;

  useEffect(() => {
    dispatch({ type: CHILD_ONE_NEED_RESET });
    if (!successMyChild && childId) {
      dispatch(fetchMyChildById(childId));
    }
  }, [successMyChild, childId, dispatch]);

  const getAge = (DOB) => {
    const today = new Date();
    const birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  };

  const classes = useStyles();
  return (
    <>
      {loadingMyChild ? (
        <CircularProgress />
      ) : (
        <Grid container direction="column">
          <Grid item xs={12} className={classes.root}>
            <Back isOrange={false} to="/main/home" />
            <Grid item xs={12}>
              {theChild && theChild.sayName && (
                <>
                  <div style={{ minHeight: '250px' }} />

                  <Avatar
                    className={classes.childAvatar}
                    alt={`${theChild.sayName}`}
                    src={theChild.avatarUrl}
                  />
                  <Typography
                    className={classes.childSayName}
                    variant="subtitle1"
                  >
                    {theChild.sayName}
                  </Typography>
                  <Typography className={classes.childAge} variant="subtitle2">
                    {getAge(theChild.birthDate) + t('assets.age')}
                  </Typography>
                  <Box id="weather">
                    <Weather
                      unit="C"
                      city="Karaj"
                      appid="ed56fab00ca239bf1003eee32c78057b"
                      style={{ display: !weatherDisplay && 'none' }}
                    />
                  </Box>
                </>
              )}
            </Grid>
          </Grid>
          <Grid sx={{ maxWidth: '100% !important' }}>
            {theChild && (
              <MyChildTabs
                theChild={theChild}
                setWeatherDisplay={setWeatherDisplay}
              />
            )}
          </Grid>
        </Grid>
      )}
      <Grid item xs={10} sx={{ textAlign: 'center' }}>
        {errorMyChild && (
          <Message backError={errorMyChild} variant="filled" severity="error" />
        )}
      </Grid>
    </>
  );
};

export default MyChildPage;
