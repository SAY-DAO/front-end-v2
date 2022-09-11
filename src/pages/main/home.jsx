import React, { useEffect } from 'react';
import { Grid, Divider, Typography, Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchMyHome } from '../../redux/actions/main/homeAction';
import {
  CHILD_BY_ID_RESET,
  CHILD_NEEDS_RESET,
  CHILD_ONE_NEED_RESET,
  CHILD_RANDOM_SEARCH_RESET,
} from '../../redux/constants/childConstants';
import ChildCard from '../../components/child/ChildCard';
import {
  JOIN_VIRTUAL_FAMILY_RESET,
  LEAVE_VIRTUAL_FAMILY_RESET,
} from '../../redux/constants/familyConstants';
import { fetchUserDetails } from '../../redux/actions/userAction';

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const myHome = useSelector((state) => state.myHome);
  const {
    user,
    children,
    loading: loadingHome,
    success: successHome,
    error: errorHome,
  } = myHome;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  const leftFamily = useSelector((state) => state.leftFamily);
  const { success: successLeft } = leftFamily;

  const joinResult = useSelector((state) => state.joinResult);
  const { success: successJoin } = joinResult;

  const childRandomSearch = useSelector((state) => state.childRandomSearch);
  const { success: successRandomSearch } = childRandomSearch;

  const myChild = useSelector((state) => state.myChild);
  const { success: successMyChild } = myChild;

  const childNeeds = useSelector((state) => state.childNeeds);
  const { success: successNeeds } = childNeeds;

  const ChildOneNeed = useSelector((state) => state.ChildOneNeed);
  const { success: successOneNeed } = ChildOneNeed;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: errorUserDetails } = userDetails;

  // check for language on browser reload dir="" needs to change according to lang
  useEffect(() => {
    const getLanguage = () =>
      i18next.language || window.localStorage.i18nextLng;

    if (document.getElementById('direction')) {
      const currentLang = getLanguage();
      const elem = document.getElementById('direction');

      if (currentLang) {
        if (currentLang === 'fa') {
          elem.setAttribute('dir', 'rtl');
        } else {
          elem.setAttribute('dir', 'ltr');
        }
      }
    }
  }, []);

  // login
  useEffect(() => {
    dispatch(fetchMyHome());
    dispatch(fetchUserDetails());
    if (errorUserDetails) {
      navigate('/auth/login?redirect=main/home');
    }
  }, [userInfo, successLogin, errorUserDetails]);

  // clear all intervals
  useEffect(() => {
    // Get a reference to the last interval + 1
    const intervalId = window.setInterval(function () {},
    Number.MAX_SAFE_INTEGER);
    // Clear any timeout/interval up to that id
    for (let i = 1; i < intervalId; i += 1) {
      window.clearInterval(i);
    }
  });

  // clean up
  useEffect(() => {
    if (successMyChild) {
      dispatch({ type: CHILD_BY_ID_RESET });
    }
    if (successNeeds) {
      dispatch({ type: CHILD_NEEDS_RESET });
    }
    if (successOneNeed) {
      dispatch({ type: CHILD_ONE_NEED_RESET });
    }
    if (successJoin) {
      dispatch({ type: JOIN_VIRTUAL_FAMILY_RESET });
    }
    if (successLeft) {
      dispatch({ type: LEAVE_VIRTUAL_FAMILY_RESET });
    }
    if (successRandomSearch) {
      dispatch({ type: CHILD_RANDOM_SEARCH_RESET });
    }
  }, [successHome, successLeft]);

  // if no children
  useEffect(() => {
    if (!successRandomSearch && children && !children[0]) {
      navigate('/main/search');
    } else if (children && children[0]) {
      navigate('/main/home');
    }
  }, [children, successHome, loadingHome]);

  const handleMyChildPage = (child) => {
    navigate(`/child/${child.id}`);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      maxWidth
      sx={{ paddingLeft: 2, paddingRight: 2, maxHeight: '10%' }}
    >
      {!loadingHome && successHome && user && children ? (
        <>
          <Grid
            container
            direction="column"
            alignItems="center"
            sx={{ marginTop: 4 }}
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
                  src={user.avatarUrl}
                  sx={{ width: 80, height: 80, zIndex: 10 }}
                />
              </Grid>
              <Grid item xs sx={{ padding: 2 }}>
                <Typography variant="subtitle1">{`${user.firstName} ${user.lastName}`}</Typography>
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
                  {`${user.firstName} ${user.lastName}`}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ marginTop: 4 }}
            >
              <Grid item xs={2}>
                <Typography variant="subtitle1">{t('home.title')}</Typography>
              </Grid>
              <Grid item xs={10}>
                <Divider sx={{ width: '95%' }} />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ marginTop: 3, textAlign: 'center', width: '100%' }}
            >
              {children &&
                children.map((child) => (
                  <ChildCard
                    key={child.id}
                    handleMyChildPage={handleMyChildPage}
                    myChild={child}
                  />
                ))}
            </Grid>
          </Grid>
        </>
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default Home;
