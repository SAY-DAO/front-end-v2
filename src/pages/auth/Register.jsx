import React from 'react';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import EntryForm from '../../components/register/EntryForm';
import VerifyCodeForm from '../../components/register/VerifyCodeForm';
import FinalForm from '../../components/register/FinalForm';

const Register = () => {
  const verifyStep = useSelector((state) => state.verifyStep);
  const { step } = verifyStep;

  const switchComponent = () => {
    switch (step) {
      case 'EntryForm':
        return (
          <Grid xs={12} item sx={{ marginTop: 40 }}>
            <EntryForm />
          </Grid>
        );
      case 'VerifyCodeForm':
        return (
          <Grid item sx={{ marginTop: 36 }}>
            <VerifyCodeForm />
          </Grid>
        );
      case 'FinalForm':
        return (
          <Grid item sx={{ marginTop: 36 }}>
            <FinalForm />
          </Grid>
        );
      default:
        return (
          <Grid item sx={{ marginTop: 36 }}>
            <EntryForm />
          </Grid>
        );
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
    >
      {switchComponent()}
    </Grid>
  );
};

export default Register;
