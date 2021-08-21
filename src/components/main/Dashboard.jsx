/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Divider,
  Typography,
  Avatar,
  Card,
  CardActionArea,
} from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { fetchMyDashboard } from '../../actions/main/dashboardAction';
import Message from '../Message';
import { fetchMyChildById } from '../../actions/childAction';

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
    width: 55,
    height: 55,
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

const Dashboard = ({ setContent }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const myDashboard = useSelector((state) => state.myDashboard);
  const { user, children, success: successDashboard } = myDashboard;

  useEffect(() => {
    if (!successDashboard) {
      dispatch(fetchMyDashboard());
    }
  }, [successDashboard]);

  const handleClick = (child) => {
    dispatch(fetchMyChildById(child.id));
    setContent('myChildPage');
  };

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
                <Card key={child.id} elevation={4} className={classes.theCard}>
                  <CardActionArea
                    className={classes.actionArea}
                    onClick={handleClick(child)}
                  >
                    <Grid
                      container
                      item
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Grid
                        container
                        item
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-end"
                        xs={7}
                      >
                        <Grid item xs sx={{ display: 'flex' }}>
                          <Typography variant="span">
                            {t('currency.toman') +
                              child.spent_credit.toLocaleString()}
                          </Typography>
                          <img
                            src="/images/icons/Money.svg"
                            alt="money icon"
                            className={classes.icons}
                          />
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex' }}>
                          <Typography variant="span">
                            {child.done_needs_count}
                          </Typography>
                          <img
                            src="/images/icons/Task.svg"
                            alt="done icon"
                            className={classes.icons}
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={3} className={classes.sayName}>
                        <Typography variant="body1">{child.sayName}</Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Avatar
                          src={child.avatarUrl}
                          className={classes.childAvatar}
                        />
                      </Grid>
                    </Grid>
                  </CardActionArea>
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

Dashboard.propTypes = {
  setContent: PropTypes.func,
};
