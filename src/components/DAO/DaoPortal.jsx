import { CircularProgress, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signTransaction } from '../../redux/actions/main/daoAction';
import { fetchMyHome } from '../../redux/actions/main/homeAction';
import { fetchAlleeds } from '../../redux/actions/needAction';
import DaoAccarion from './DaoAccordion';

export default function DaoPortal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [gov, setGov] = useState(0);

  const myHome = useSelector((state) => state.myHome);
  const { user, children, loading: loadingHome, success: successHome } = myHome;

  const userDetails = useSelector((state) => state.userDetails);
  const { theUser, success: successUserDetails } = userDetails;

  useEffect(() => {
    if (!successHome) {
      dispatch(fetchMyHome());
    }
  }, []);

  const handleSignature = () => {
    dispatch(signTransaction(1, 'needTitle', 'needImage', 2, gov));
  };

  const handleChange = (event, newValue) => {
    setGov(newValue);
  };

  const handleClick = () => {
    dispatch(fetchAlleeds());
  };

  return (
    <Grid>
      {!theUser ? (
        <CircularProgress />
      ) : (
        <Grid
          item
          xs={12}
          sx={{ marginTop: 3, textAlign: 'center', width: '100%' }}
        >
          <DaoAccarion childrenList={children} />
        </Grid>
      )}
    </Grid>
  );
}
