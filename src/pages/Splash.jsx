/* eslint-disable no-undef */
import React from 'react';
import { Grid } from '@mui/material';
import { useHistory } from 'react-router-dom';

export default function Splash() {
  const history = useHistory();

  function myFunction() {
    setTimeout(() => {
      history.push('/Intro');
    }, 3000);
  }

  myFunction();
  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      sx={{ backgroundColor: '#FFFFFF', minHeight: '95vh' }}
    >
      <img
        src="/images/logo.png"
        style={{ maxWidth: '30%', display: 'block', margin: 'auto' }}
        alt="logo"
      />
    </Grid>
  );
}
