/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Grid, Button, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { Link } from 'react-router-dom';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { useDispatch, useSelector } from 'react-redux';
import Back from '../../components/Back';
import Message from '../../components/Message';
import { login } from '../../actions/userAction';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    maxHeight: '300px',
  },
});

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [validateErr, setValidateErr] = useState('');
  const [userNameErr, setUserNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading: loadingLogin,
    error: errorLogin,
    success: successLogin,
  } = userLogin;

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(userName, password));
  };

  const handleChangeUserName = (event) => {
    setUserName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  // loading button
  useEffect(() => {
    if (loadingLogin) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingLogin]);

  // disable button
  useEffect(() => {
    if (!userName || !password) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [userName, password, userNameErr, passwordErr, errorLogin, successLogin]);

  // check phone every 1000 ms when typing
  useEffect(() => {
    if (!errorLogin) {
      setValidateErr('');
    } else if (errorLogin.status === 400) {
      setValidateErr(t('error.wrongUserOrPass'));
    }
  }, [errorLogin, successLogin]);

  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
      sx={{ marginTop: 36 }}
    >
      <Back to="/intro" />
      <Grid item xs={12}>
        <img
          src="/images/register.svg"
          style={{ paddingBottom: '20px', width: '100%' }}
          className={classes.root}
          alt="Login"
        />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        item
        sx={{ direction: 'ltr' }}
      >
        <FormControl onSubmit={handleSubmit} variant="outlined">
          <form>
            <Grid item xs={12} sx={{ marginTop: 4 }}>
              <FormControl variant="outlined" sx={{ direction: 'ltr' }}>
                <OutlinedInput
                  error={userNameErr}
                  id="outlined-adornment-userName"
                  type="text"
                  value={userName}
                  onChange={handleChangeUserName}
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
                  label="password"
                />
                <InputLabel htmlFor="password">
                  {t('placeholder.password')}
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
                {t('button.login')}
              </LoadingButton>
            </Grid>
          </form>
        </FormControl>
        <Grid item xs={12}>
          {(errorLogin || validateErr) && (
            <Message
              icon={false}
              backError={errorLogin}
              variant="outlined"
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

export default Login;
