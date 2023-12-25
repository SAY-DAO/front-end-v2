import React from 'react';
import { Grid } from '@mui/material';

export default function OfflineHome() {
  return (
    <Grid
      container
      sx={{
        // width: '65%',
        backgroundColor: '#F7F7F7',
        color: '#a1a1a1',
        height: '100vh',
        textAlign: 'center',
        p: 5,
      }}
      justifyContent="center"
      alignContent="center"
    >
      <img
        src="/images/maintenance.png"
        alt="Maintenance"
        style={{ width: 60, height: 60, marginBottom: 10 }}
      />
      <h3 style={{ margin: 'auto' }}>
       پوزش از اختلال به وجود آمده، در حال رفع مشکل دسترسی به سرور هستیم.
      </h3>
    </Grid>
  );
}
