/* eslint-disable react/display-name */
/* eslint-disable react/jsx-props-no-spreading */
import { CircularProgress, Grid } from '@mui/material';
import { Suspense } from 'react';

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
