/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import FormControl from '@material-ui/core/FormControl';
import { useTranslation } from 'react-i18next';
// Customized "react-phone-input-2/lib/material.css"
import '../../resources/styles/css/material.css';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CircularProgress from '@material-ui/core/CircularProgress';
import Message from '../Message';
import validateUsername from '../../inputsValidation/validateUsername';
import { checkUserNameBeforeVerify, register } from '../../actions/userAction';
import validatePassword from '../../inputsValidation/validatePassword';
import validateRepeatPassword from '../../inputsValidation/validateRepeatPassword';
import { CHECK_USERNAME_RESET } from '../../constants/userConstants';

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

  const [validateErr, setValidateErr] = useState('');
  const [userNameErr, setUserNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [repeatPasswordErr, setRepeatPasswordErr] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const checkUserName = useSelector((state) => state.checkUserName);
  const {
    loading: loadingCheck,
    error: errorCheck,
    success: successCheck,
  } = checkUserName;

  // check userName every 1000 ms when typing
  useEffect(async () => {
    setValidateErr('');
    setUserNameErr(true);
    dispatch({ type: CHECK_USERNAME_RESET });
    if (userName) {
      const result = await validateUsername(userName);
      if (result && result.errorMessage) {
        const timeout = setTimeout(() => {
          setValidateErr(t(result.errorMessage));
        }, 1000);
        return () => clearTimeout(timeout);
      }
      if (!result.errorMessage && userName) {
        const timeout = setTimeout(() => {
          setUserNameErr(false);
          dispatch(checkUserNameBeforeVerify(userName));
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
    setUserNameErr(false);
  }, [userName]);

  // check password every 1000 ms when typing
  useEffect(async () => {
    setValidateErr('');
    setPasswordErr(true);
    if (password) {
      const result = await validatePassword(password);
      if (result && result.errorMessage) {
        const timeout = setTimeout(() => {
          setValidateErr(t(result.errorMessage));
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
    setPasswordErr(false);
  }, [password, repeatPassword]);

  // check password every 1000 ms when typing
  useEffect(async () => {
    setValidateErr('');
    setRepeatPasswordErr(true);
    if (repeatPassword) {
      const result = await validateRepeatPassword(password, repeatPassword);
      if (result && result.errorMessage) {
        const timeout = setTimeout(() => {
          setValidateErr(t(result.errorMessage));
        }, 1000);
        return () => clearTimeout(timeout);
      }
    }
    setRepeatPasswordErr(false);
  }, [password, repeatPassword]);

  // loading button
  useEffect(() => {
    if (loadingCheck) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingCheck]);

  // disable button
  useEffect(() => {
    if (
      !successCheck ||
      userNameErr ||
      passwordErr ||
      repeatPasswordErr ||
      errorCheck ||
      !userName ||
      !password ||
      !repeatPassword
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [
    userName,
    password,
    repeatPassword,
    userNameErr,
    passwordErr,
    repeatPasswordErr,
    errorCheck,
    successCheck,
  ]);

  const handleClick = () => {
    dispatch();
    // register(userName, password, theKey, value, countryCode, theVerifyCode)
  };

  const handleChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeRepeatPassword = (event) => {
    setRepeatPassword(event.target.value);
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
      <Grid item xs={12} sx={{ marginTop: 4 }}>
        <FormControl variant="outlined" sx={{ direction: 'ltr' }}>
          <OutlinedInput
            error={userNameErr}
            id="outlined-adornment-userName"
            type="text"
            value={userName}
            onChange={handleChangeUserName}
            endAdornment={
              <InputAdornment position="end">
                {loadingCheck ? null : userNameErr || errorCheck ? (
                  <CancelRoundedIcon sx={{ color: 'red' }} />
                ) : !userNameErr && successCheck && userName ? (
                  <CheckCircleRoundedIcon sx={{ color: 'green' }} />
                ) : null}
              </InputAdornment>
            }
            label="userName"
          />
          <InputLabel htmlFor="userName">
            {t('placeholder.userName')}
          </InputLabel>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 4 }}>
        <FormControl variant="outlined" sx={{ direction: 'ltr' }}>
          <OutlinedInput
            error={passwordErr}
            id="outlined-adornment-password"
            type="password"
            value={password}
            onChange={handleChangePassword}
            endAdornment={
              <InputAdornment position="end">
                {passwordErr ? (
                  <CancelRoundedIcon sx={{ color: 'red' }} />
                ) : !passwordErr.result && password ? (
                  <CheckCircleRoundedIcon sx={{ color: 'green' }} />
                ) : null}
              </InputAdornment>
            }
            label="password"
          />
          <InputLabel htmlFor="password">
            {t('placeholder.password')}
          </InputLabel>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 4 }}>
        <FormControl variant="outlined" sx={{ direction: 'ltr' }}>
          <OutlinedInput
            error={repeatPasswordErr}
            id="outlined-adornment-repeatPassword"
            type="password"
            value={repeatPassword}
            onChange={handleChangeRepeatPassword}
            endAdornment={
              <InputAdornment position="end">
                {repeatPasswordErr ? (
                  <CancelRoundedIcon sx={{ color: 'red' }} />
                ) : !repeatPasswordErr && repeatPassword ? (
                  <CheckCircleRoundedIcon sx={{ color: 'green' }} />
                ) : null}
              </InputAdornment>
            }
            label="repeatPassword"
          />
          <InputLabel htmlFor="repeatPassword">
            {t('placeholder.repeatPassword')}
          </InputLabel>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 4 }}>
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
      <Grid item xs={12}>
        {(errorCheck || validateErr) && (
          <Message
            icon={false}
            backError={errorCheck}
            variant="outlined"
            severity="error"
          >
            {validateErr}
          </Message>
        )}
      </Grid>
    </Grid>
  );
};

export default FinalForm;
