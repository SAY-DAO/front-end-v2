import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChildOneNeed } from '../redux/actions/childAction';
import NeedAvailable from '../components/need/NeedAvailable';
import NeedDone from '../components/need/NeedDone';

export default function NeedPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { childId, needId } = useParams();

  const childOneNeed = useSelector((state) => state.childOneNeed);
  const { oneNeed, success: successOneNeed } = childOneNeed;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  useEffect(() => {
    if (!userInfo && !successLogin) {
      navigate(`/auth/login?redirect=main/home`);
    }
  }, [userInfo, successLogin]);

  // fetch need
  useEffect(() => {
    if (!successOneNeed && needId) {
      dispatch(fetchChildOneNeed(needId));
      // const doneNeedInterval = setInterval(() => dispatch(fetchChildOneNeed(needId)), 3000);
      // setTimeout(() => clearInterval(doneNeedInterval), 60 * 10 * 1000);
    }
    if (oneNeed) {
      // clear all intervals
      // Get a reference to the last interval + 1
      const intervalId = window.setInterval(() => {}, Number.MAX_SAFE_INTEGER);
      // Clear any timeout/interval up to that id
      for (let i = 1; i < intervalId; i += 1) {
        window.clearInterval(i);
      }
    }
  }, [successOneNeed, needId]);

  return (
    <>
      {!oneNeed ? (
        <CircularProgress />
      ) : (
        <Grid container direction="column">
          {!oneNeed.isDone ? <NeedAvailable childId={childId} /> : <NeedDone childId={childId} />}
        </Grid>
      )}
    </>
  );
}
