import React from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  function myFunction() {
    setTimeout(() => {
      navigate('/auth/intro');
    }, 3000);
  }

  myFunction();
  return (
    <Grid container sx={{ backgroundColor: '#FFFFFF', height: '100vh' }}>
      <img
        src="/images/logo.png"
        style={{ maxWidth: '30%', display: 'block', margin: 'auto' }}
        alt="logo"
      />
    </Grid>
  );
}
