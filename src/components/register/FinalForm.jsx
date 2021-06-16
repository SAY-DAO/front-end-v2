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
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import Message from '../Message';
import Back from '../Back';

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

  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    dispatch();
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          <OutlinedInput
            id="outlined-adornment-username"
            type="text"
            value={values.username}
            onChange={handleChange('username')}
            endAdornment={
              <InputAdornment position="end">
                {values.username ? (
                  <CancelRoundedIcon sx={{ color: 'red' }} />
                ) : (
                  <CheckCircleRoundedIcon sx={{ color: 'green' }} />
                )}
              </InputAdornment>
            }
            label="username"
          />
          <InputLabel htmlFor="username">
            {t('placeholder.username')}
          </InputLabel>
          <FormHelperText id="outlined-weight-helper-text">
            Weight
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" sx={{ direction: 'ltr' }}>
          <OutlinedInput
            id="outlined-adornment-password"
            type="password"
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                {values.password ? (
                  <CancelRoundedIcon sx={{ color: 'red' }} />
                ) : (
                  <CheckCircleRoundedIcon sx={{ color: 'green' }} />
                )}
              </InputAdornment>
            }
            label="password"
          />
          <InputLabel htmlFor="password">
            {t('placeholder.password')}
          </InputLabel>
          <FormHelperText id="outlined-weight-helper-text">
            Weight
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined" sx={{ direction: 'ltr' }}>
          <OutlinedInput
            id="outlined-adornment-repeatPassword"
            type="password"
            value={values.repeatPassword}
            onChange={handleChange('repeatPassword')}
            endAdornment={
              <InputAdornment position="end">
                {values.repeatPassword ? (
                  <CancelRoundedIcon sx={{ color: 'red' }} />
                ) : (
                  <CheckCircleRoundedIcon sx={{ color: 'green' }} />
                )}
              </InputAdornment>
            }
            label="repeatPassword"
          />
          <InputLabel htmlFor="repeatPassword">
            {t('placeholder.repeatPassword')}
          </InputLabel>
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
