/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useHistory } from 'react-router';
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
  const { oneNeed, success: successOneNeed } = ChildOneNeed;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  useEffect(() => {
    if (!userInfo && !successLogin) {
      history.push(`/login?redirect=main/home`);
    }
  }, [userInfo, successLogin, history]);

  // fetch need
  useEffect(() => {
    if (!oneNeed && needId) {
      dispatch(fetchChildOneNeed(needId));
      const doneNeedInterval = setInterval(
        () => dispatch(fetchChildOneNeed(needId)),
        3000
      );
      setTimeout(() => clearInterval(doneNeedInterval), 60 * 10 * 1000);
    }
    if (oneNeed) {
      // clear all intervals
      // Get a reference to the last interval + 1
      const intervalId = window.setInterval(function () {},
      Number.MAX_SAFE_INTEGER);
      // Clear any timeout/interval up to that id
      for (let i = 1; i < intervalId; i += 1) {
        window.clearInterval(i);
      }
    }
  }, [oneNeed, needId]);

  return (
    <>
      {!oneNeed ? (
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
