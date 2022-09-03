import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyHome } from '../../redux/actions/main/homeAction';
import DaoAccardion from './DaoAccordion';

export default function DaoPortal() {
  const dispatch = useDispatch();

  const myHome = useSelector((state) => state.myHome);
  const { children, success: successHome } = myHome;

  const userDetails = useSelector((state) => state.userDetails);
  const { success: successUserDetails } = userDetails;

  useEffect(() => {
    if (!successHome) {
      dispatch(fetchMyHome());
    }
  }, []);

  return (
    <Grid>
      {!successUserDetails || !successHome ? (
        <CircularProgress />
      ) : (
        <Grid
          item
          xs={12}
          sx={{ mt: 3, mb: 8, textAlign: 'center', width: '100%' }}
        >
          <DaoAccardion childrenList={children} />
        </Grid>
      )}
    </Grid>
  );
}
