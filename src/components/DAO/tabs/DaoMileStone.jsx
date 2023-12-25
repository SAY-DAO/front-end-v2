import React, { useState, useEffect } from 'react';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
// import Weather from 'simple-react-weather';
import { useNavigate } from 'react-router-dom';
import Message from '../../Message';
import { fetchMyChildById } from '../../../redux/actions/childAction';
import { CHILD_ONE_NEED_RESET } from '../../../redux/constants/childConstants';
import DaoTimeLine from './DaoTimeLine';

const DaoMileStone = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const childId = 38;
  const [weatherDisplay, setWeatherDisplay] = useState(false);
  const [myChildrenIdList, setMyChildrenIdList] = useState([]);

  const myHome = useSelector((state) => state.myHome);
  const { children } = myHome;

  const myChild = useSelector((state) => state.myChild);
  const {
    theChild,
    loading: loadingMyChild,
    error: errorMyChild,
    success: successMyChild,
  } = myChild;

  useEffect(() => {
    if (children) {
      const list = [];
      for (let i = 0; i < children.length; i += 1) {
        list.push(children[i].id);
        setMyChildrenIdList(list);
      }
    }
  });

  // when the child is not adopted by user and route to the child's page
  useEffect(() => {
    dispatch({ type: CHILD_ONE_NEED_RESET });
    if (
      successMyChild &&
      myChildrenIdList &&
      !myChildrenIdList.includes(Number(childId))
    ) {
      navigate('/main/home');
    } else {
      dispatch(fetchMyChildById(childId));
    }
  }, [childId, myChildrenIdList, dispatch]);

  // weather display
  useEffect(() => {
    if (successMyChild) {
      setTimeout(() => {
        setWeatherDisplay(true);
      }, 500);
    }
  }, [weatherDisplay, successMyChild]);

  // clear all intervals
  useEffect(() => {
    // Get a reference to the last interval + 1
    const intervalId = window.setInterval(() => {},
    Number.MAX_SAFE_INTEGER);
    // Clear any timeout/interval up to that id
    for (let i = 1; i < intervalId; i += 1) {
      window.clearInterval(i);
    }
  });

  // Age
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

  return (
    <>
      {loadingMyChild ? (
        <CircularProgress />
      ) : (
        <Grid container direction="column" sx={{}}>
          <Grid
            item
            container
            xs={12}
            sx={{
              top: 0,
              left: 0,
              right: 0,
              mb: 2,
              padding: 0,
            }}
          >
            <Grid item xs={12}>
              {theChild && theChild.sayName && (
                <>
                  <div style={{ minHeight: '20px' }} />

                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      m: 'auto',
                      backgroundColor: '#f9d6af',
                      boxShadow: '4px 4px 10px rgba(0,0,0,.09)',
                    }}
                    alt={`${theChild.sayName}`}
                    src={theChild.avatarUrl}
                  />
                  <Typography
                    sx={{
                      color: 'white',
                      m: 'auto',
                      textAlign: 'center',
                      p: 1,
                    }}
                    variant="subtitle1"
                  >
                    {theChild.sayName}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'white',
                      textAlign: 'center',
                    }}
                    variant="subtitle2"
                  >
                    {getAge(theChild.birthDate) + t('assets.age')}
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
          <Grid sx={{ maxWidth: '100% !important' }}>
            <DaoTimeLine />
          </Grid>
        </Grid>
      )}
      <Grid item xs={10} sx={{ textAlign: 'center' }}>
        {errorMyChild && (
          <Message
            backError={errorMyChild}
            variant="standard"
            severity="error"
          />
        )}
      </Grid>
    </>
  );
};

export default DaoMileStone;
