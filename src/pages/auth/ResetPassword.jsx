/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import { fetchUserDetails, resetPassword } from '../../actions/userAction';
import Message from '../../components/Message';
import validatePassword from '../../inputsValidation/validatePassword';
import validateRepeatPassword from '../../inputsValidation/validateRepeatPassword';
import Back from '../../components/Back';
import { USER_RESET_PASSWORD_RESET } from '../../constants/main/userConstants';

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [validateErr, setValidateErr] = useState('');
  const [passwordErr, setPasswordErr] = useState(false);
  const [repeatPasswordErr, setRepeatPasswordErr] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const userResetPass = useSelector((state) => state.userResetPass);
  const {
    loading: loadingReset,
    error: errorReset,
    success: successReset,
  } = userResetPass;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: errorUserDetails } = userDetails;

  // login
  useEffect(() => {
    dispatch(fetchUserDetails());
    if (errorUserDetails) {
      navigate('/auth/login?redirect=setpassword');
    }
  }, [userInfo, successLogin, errorUserDetails, dispatch]);

  // loading button
  useEffect(() => {
    if (loadingReset) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingReset]);

  // disable button
  useEffect(() => {
    if (
      passwordErr ||
      repeatPasswordErr ||
      errorReset ||
      !password ||
      !repeatPassword
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [
    password,
    repeatPassword,
    passwordErr,
    repeatPasswordErr,
    errorReset,
    successReset,
  ]);

  useEffect(() => {
    dispatch({ type: USER_RESET_PASSWORD_RESET });
    if (!userInfo && !successLogin) {
      navigate('/auth/login?redirect=setpassword');
    }
  }, [userInfo, successLogin]);

  // cleanup the state error after leaving the page - this runs every reload
  useEffect(() => {
    dispatch({ type: USER_RESET_PASSWORD_RESET });
  }, [password, repeatPassword]);

  // check password every 1000 ms when typing
  useEffect(() => {
    setValidateErr('');
    setPasswordErr(true);
    if (password) {
      const result = validatePassword(password);
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
      const result = validateRepeatPassword(password, repeatPassword);
      if (result && result.errorMessage) {
        const timeout = setTimeout(() => {
          setValidateErr(t(result.errorMessage));
        }, 100);
        return () => clearTimeout(timeout);
      }
    }
    setRepeatPasswordErr(false);
  }, [password, repeatPassword]);

  useEffect(() => {
    if (successReset) {
      navigate('/main/profile/settings');
    }
  }, [successReset]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password) {
      dispatch(resetPassword(password));
    }
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeRepeatPassword = (event) => {
    setRepeatPassword(event.target.value);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
    >
      <Back to="/main/profile/settings" isOrange />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        item
        sx={{ direction: 'ltr', marginTop: 10 }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: 6, fontWeight: 'lighter' }}
        >
          {t('change-password.title')}
        </Typography>
        <FormControl onSubmit={handleSubmit} variant="outlined">
          <form>
            <Grid item xs={12} sx={{ marginTop: 4 }}>
              <FormControl variant="outlined">
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
              <FormControl variant="outlined">
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
            <Grid item xs={12} sx={{ marginTop: 4, textAlign: 'center' }}>
              <LoadingButton
                variant="contained"
                color="primary"
                disabled={isDisabled}
                loading={isLoading}
                type="submit"
              >
                {t('button.confirm')}
              </LoadingButton>
            </Grid>
          </form>
        </FormControl>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          {(errorReset || validateErr) && (
            <Message
              sx={{ justifyContent: 'center' }}
              icon={false}
              backError={errorReset}
              variant="standard"
              severity="error"
            >
              {validateErr}
            </Message>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
