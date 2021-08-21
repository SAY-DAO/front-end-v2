/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  Grid,
  Divider,
  Typography,
  Avatar,
  makeStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import { fetchMyDashboard } from '../../../actions/main/dashboardAction';
import Message from '../../Message';
import { CHILD_BY_ID_RESET } from '../../../constants/childConstants';
import ChildCard from '../../child/ChildCard';

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

const Dashboard = ({ setContent, setMyChildId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const myDashboard = useSelector((state) => state.myDashboard);
  const { user, children, success: successDashboard } = myDashboard;

  useEffect(() => {
    dispatch({ type: CHILD_BY_ID_RESET });
    if (!successDashboard) {
      dispatch(fetchMyDashboard());
    }
  }, [successDashboard]);

  const handleMyChildPage = (child) => {
    setContent('myChildPage');
    setMyChildId(child.id);
  };

  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
      sx={{ paddingLeft: 2, paddingRight: 2 }}
    >
      {successDashboard && user && children ? (
        <>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid
              item
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ margin: 4 }}
            >
              <Grid item xs>
                <Typography className={classes.nameTitle}>
                  {`${user.firstName} ${user.lastName}`}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right', margin: 1 }}>
                <Typography variant="subtitel1">{`${user.firstName} ${user.lastName}`}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Avatar src={user.avatarUrl} className={classes.userAvatar} />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={10}>
              <Divider sx={{ width: '95%' }} />
            </Grid>
            <Grid item xs={2}>
              <Typography variant="subtitle1">
                {t('dashboard.title')}
              </Typography>
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
        </>
      ) : (
        <CircularProgress />
      )}
    </Grid>
  );
};

export default Dashboard;

Dashboard.propTypes = {
  setContent: PropTypes.func,
  setMyChildId: PropTypes.func,
};