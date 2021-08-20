/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Divider,
  Typography,
  Avatar,
  Card,
  Box,
} from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { fetchMyDashboard } from '../../actions/main/dashboardAction';
import Message from '../Message';

const useStyles = makeStyles(() => ({
  nameTitle: {
    position: 'absolute',
    color: ' rgba(102, 102, 102, 0.15)',
    fontSize: '48px',
    fontWeight: 900,
    lineHeight: '56px',
    whiteSpace: 'nowrap',
    left: 'calc(100vw - 450px)',
    top: '40px',
    float: 'left',
  },
  userAvatar: {
    width: 80,
    height: 80,
  },
  childAvatar: {
    width: 50,
    height: 50,
  },
  theCard: {
    marginBottom: 10,
    pt: 1,
    pb: 1,
    minHeight: '70px',
  },
}));

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const myDashboard = useSelector((state) => state.myDashboard);
  const { user, children, success: successDashboard } = myDashboard;

  useEffect(() => {
    if (!successDashboard) {
      dispatch(fetchMyDashboard());
    }
  }, [successDashboard]);

  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
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
              children.map((child) => (
                <Card elevation={4} className={classes.theCard}>
                  <Grid
                    container
                    item
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item xs={4}>
                      hi
                    </Grid>
                    <Grid item xs={4}>
                      <Grid item xs={6} sx={{ textAlign: 'right', margin: 1 }}>
                        <Typography variant="body1">{`${child.sayName}`}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={2}>
                      <Avatar
                        src={child.avatarUrl}
                        className={classes.childAvatar}
                      />
                    </Grid>
                  </Grid>
                </Card>
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
