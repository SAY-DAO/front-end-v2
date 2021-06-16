/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { useTranslation, Trans } from 'react-i18next';
// Customized "react-phone-input-2/lib/material.css"
import '../../resources/styles/css/material.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import NumberFormat from 'react-number-format';
import Back from '../Back';
import Message from '../Message';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    maxHeight: '300px',
  },
});

const FinalForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    dispatch();
  };

  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
    >
      <Grid item xs={12}>
        <img
          src="/images/finalForm.svg"
          width="100%"
          className={classes.root}
          alt="otp page"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" sx={{ direction: 'ltr' }}>
          <TextField
            type="email"
            sx={{ marginBottom: 2 }}
            label={t('placeholder.username')}
            helperText="Some important text"
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'email',
            }}
          />
          <TextField
            type="password"
            helperText="Some important text"
            sx={{ marginBottom: 2 }}
            label={t('placeholder.password')}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'password',
            }}
          />
          <TextField
            type="password"
            sx={{ marginBottom: 2 }}
            label={t('placeholder.repeatPassword')}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'repeatPassword',
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <LoadingButton
          variant="contained"
          color="primary"
          disabled={isDisabled}
          loading={isLoading}
          onClick={handleClick}
        >
          {t('button.submit')}
        </LoadingButton>
      </Grid>
      {/* <Grid item xs={12}>
        {errorVerifyCode && (
          <Message
            backError={errorVerifyCode}
            variant="filled"
            severity="error"
          />
        )}
      </Grid> */}
    </Grid>
  );
};

export default FinalForm;
