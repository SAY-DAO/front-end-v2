/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Grid, Divider, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchMyHome } from '../../../actions/main/homeAction';
import {
  CHILD_BY_ID_RESET,
  CHILD_NEEDS_RESET,
  CHILD_RANDOM_SEARCH_RESET,
} from '../../../constants/childConstants';
import ChildCard from '../../child/ChildCard';
import AppBarBottom from '../AppBarBottom';
import {
  JOIN_VIRTUAL_FAMILY_RESET,
  LEAVE_VIRTUAL_FAMILY_RESET,
} from '../../../constants/familyConstants';

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

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const myHome = useSelector((state) => state.myHome);
  const { user, children, success: successHome } = myHome;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login?redirect=main/home');
    }
  }, [userInfo, successLogin, history]);

  useEffect(() => {
    dispatch(fetchMyHome());
    dispatch({ type: CHILD_BY_ID_RESET });
    dispatch({ type: CHILD_NEEDS_RESET });
    dispatch({ type: CHILD_RANDOM_SEARCH_RESET });
    dispatch({ type: LEAVE_VIRTUAL_FAMILY_RESET });
    dispatch({ type: JOIN_VIRTUAL_FAMILY_RESET });
  }, []);

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
      {successHome && user && children ? (
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
                children.map((myChild) => (
                  <ChildCard
                    key={myChild.id}
                    handleMyChildPage={handleMyChildPage}
                    myChild={myChild}
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
