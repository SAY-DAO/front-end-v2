import { CircularProgress, Grid } from '@mui/material';
import React, { Suspense } from 'react';

const Loadable = (Component) => (props) =>
  (
    <Suspense
      fallback={
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      }
    >
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
