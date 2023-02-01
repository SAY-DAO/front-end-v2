/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Grid, Divider, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchMyHome } from '../../actions/main/homeAction';
import {
  CHILD_BY_ID_RESET,
  CHILD_NEEDS_RESET,
  CHILD_ONE_NEED_RESET,
  CHILD_RANDOM_SEARCH_RESET,
} from '../../constants/childConstants';
import ChildCard from '../child/ChildCard';
import AppBarBottom from './AppBarBottom';
import {
  JOIN_VIRTUAL_FAMILY_RESET,
  LEAVE_VIRTUAL_FAMILY_RESET,
  ACCEPT_INVITATION_RESET,
} from '../../constants/familyConstants';
import { fetchUserDetails, logout } from '../../actions/userAction';

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
    zIndex: 10,
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

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

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

  const acceptInvite = useSelector((state) => state.acceptInvite);
  const { success: successAcceptInvite } = acceptInvite;

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
      history.push('/login?redirect=main/home');
    }
  }, [userInfo, successLogin, history, errorUserDetails]);

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
    if (successAcceptInvite) {
      dispatch({ type: ACCEPT_INVITATION_RESET });
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
      history.push('/main/search');
    } else if (children && children[0]) {
      history.push('/main/home');
    }
  }, [children, successHome, loadingHome]);

  const handleMyChildPage = (child) => {
    history.push(`/child/${child.id}`);
  };

  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      maxWidth
      sx={{ paddingLeft: 2, paddingRight: 2 }}
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
                <Avatar src={user.avatarUrl} className={classes.userAvatar} />
              </Grid>
              <Grid item xs sx={{ padding: 2 }}>
                <Typography variant="subtitle1">{`${user.firstName} ${user.lastName}`}</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.nameTitle}>
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
      <AppBarBottom path="home" />
    </Grid>
  );
};

export default Home;
