/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { Link } from 'react-router-dom';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
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

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messageInput, setMessageInput] = useState('');

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

  // Message input for 422 status error
  useEffect(() => {
    if (userName) {
      setMessageInput('userName');
    }
  }, [userName]);

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
  }, [userName, password, errorLogin, successLogin]);

  useEffect(() => {
    if (successLogin) {
      history.push('/search');
    }
  }, [successLogin]);

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
        <Grid item xs={12} sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1">
            <Trans i18nKey="comeback.noAccount">
              Don't have an account yet?
              <Link to="/register" className="link" />
            </Trans>
          </Typography>
          <Typography variant="subtitle1">
            <Link to="/forgot-password" className="link">
              {t('forgot-password.title')}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          {errorLogin && (
            <Message
              input={messageInput}
              frontError={errorLogin}
              variant="filled"
              severity="error"
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
