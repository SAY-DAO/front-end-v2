/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import { LoadingButton } from '@mui/lab';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { useDispatch, useSelector } from 'react-redux';
import Back from '../../components/Back';
import Message from '../../components/Message';
import { fetchUserDetails, login } from '../../redux/actions/userAction';
import {
  USER_DETAILS_RESET,
  USER_LOGOUT,
  USER_REGISTER_RESET,
} from '../../redux/constants/main/userConstants';

const useStyles = makeStyles({
  root: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    maxHeight: '320px',
  },
});

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const redirect = window.location.search
    ? // eslint-disable-next-line no-restricted-globals
      window.location.search.split('redirect=')[1]
    : 'main/home';

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, loading: loadingLogin, error: errorLogin, success: successLogin } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const { success: successRegister } = userRegister;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingUserDetails,
    success: successUserDetails,
    error: errorUserDetails,
  } = userDetails;

  // loading button
  useEffect(() => {
    if (loadingLogin || loadingUserDetails) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingLogin, loadingUserDetails]);

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
      dispatch(fetchUserDetails());
    }
    if (errorLogin || errorUserDetails) {
      dispatch({ type: USER_DETAILS_RESET });
    }
  }, [successLogin, errorUserDetails, errorLogin]);

  useEffect(() => {
    if ((successLogin || userInfo) && successUserDetails) {
      navigate(`/${redirect}`);
    }
  }, [redirect, successLogin, successUserDetails]);

  // Message input for some status error (422)
  useEffect(() => {
    if (successRegister) {
      dispatch({ type: USER_REGISTER_RESET });
    }
  }, [userName]);

  // Message input for some status error (422)
  useEffect(() => {
    if (userName) {
      setMessageInput('userName');
    }
  }, [userName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const theUserName = userName && userName.startsWith(0) ? `+98${userName.slice(1)}` : userName;
    dispatch(login(theUserName, password));
  };

  const handleChangeUserName = (event) => {
    setUserName(event.target.value);
    // clean error
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    // clean error
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: USER_DETAILS_RESET });
  };

  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
      sx={{ marginTop: 34 }}
    >
      <Back to="/auth/intro" isOrange />
      <Grid item xs={12}>
        <img src="/images/register.svg" className={classes.root} alt="Login" />
      </Grid>
      <Grid container direction="column" justifyContent="center" alignItems="center" item>
        <FormControl onSubmit={handleSubmit} variant="outlined">
          <form>
            <Grid item xs={12} sx={{ marginTop: 4 }}>
              <FormControl variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-userName"
                  type="text"
                  value={userName}
                  onChange={handleChangeUserName}
                  label="userName"
                />
                <InputLabel>{t('placeholder.userName')}</InputLabel>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 4 }}>
              <FormControl variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="password"
                  value={password}
                  onChange={handleChangePassword}
                  label="password"
                />
                <InputLabel htmlFor="password">{t('placeholder.password')}</InputLabel>
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
          <Typography variant="subtitle2">
            <Trans i18nKey="comeback.noAccount">
              Don't have an account yet?
              <Link to="/auth/register" className="link" />
            </Trans>
          </Typography>
          <Typography variant="subtitle2">
            <Link to="/auth/forgot-password" className="link">
              {t('forgot-password.title')}
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          {errorLogin && (
            <Message
              input={messageInput}
              backError={errorLogin}
              variant="standard"
              severity="error"
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Login;
