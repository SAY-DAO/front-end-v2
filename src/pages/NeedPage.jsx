/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChildOneNeed } from '../actions/childAction';
import NeedAvailable from '../components/need/NeedAvailable';
import NeedDone from '../components/need/NeedDone';

export default function NeedPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { childId, needId } = useParams();

  const ChildOneNeed = useSelector((state) => state.ChildOneNeed);
  const {
    oneNeed,
    loading: loadingOneNeed,
    error: errorOneNeed,
    success: successOneNeed,
  } = ChildOneNeed;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  useEffect(() => {
    if (!userInfo && !successLogin) {
      history.push(`/login?redirect=main/home`);
    }
  }, [userInfo, successLogin, history]);

  // fetch need
  useEffect(() => {
    if (!successOneNeed && needId) {
      dispatch(fetchChildOneNeed(needId));
    }
  }, [successOneNeed, needId, dispatch]);

  return (
    <>
      {!successOneNeed ? (
        <CircularProgress />
      ) : (
        <Grid container direction="column">
          {!oneNeed.isDone ? (
            <NeedAvailable childId={childId} />
          ) : (
            <NeedDone childId={childId} />
          )}
        </Grid>
      )}
    </>
  );
}
