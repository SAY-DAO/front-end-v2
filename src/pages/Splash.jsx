import React from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  function myFunction() {
    setTimeout(() => {
      navigate('/Intro');
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
