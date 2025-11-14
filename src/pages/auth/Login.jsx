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
    ? window.location.search.split('redirect=')[1]
    : 'main/home';

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  const {
    userInfo,
    loading: loadingLogin,
    error: errorLogin,
    success: successLogin,
  } = useSelector((state) => state.userLogin);
  const { success: successRegister } = useSelector((state) => state.userRegister);
  const {
    loading: loadingUserDetails,
    success: successUserDetails,
    error: errorUserDetails,
  } = useSelector((state) => state.userDetails);

  // Message input for some status error (422)
  useEffect(() => {
    if (userName) {
      setMessageInput('userName');
    }
  }, [userName]);

  // Update loading state for button
  useEffect(() => {
    setIsLoading(loadingLogin || loadingUserDetails);
  }, [loadingLogin, loadingUserDetails]);

  // Disable button based on userName and password
  useEffect(() => {
    setIsDisabled(!userName || !password);
  }, [userName, password]);

  // Handle login success
  useEffect(() => {
    if (successLogin) {
      dispatch(fetchUserDetails());
    }
  }, [successLogin, dispatch]);

  // Reset user details error or logout on errorLogin or errorUserDetails
  useEffect(() => {
    if (errorLogin || errorUserDetails) {
      dispatch({ type: USER_DETAILS_RESET });
    }
  }, [errorLogin, errorUserDetails, dispatch]);

  // Navigate after successful login and user details fetching
  useEffect(() => {
    if ((successLogin || userInfo) && successUserDetails) {
      navigate(`/${redirect}`);
    }
  }, [successLogin, successUserDetails, userInfo, navigate, redirect]);

  // Reset registration state on userName change
  useEffect(() => {
    if (successRegister) {
      dispatch({ type: USER_REGISTER_RESET });
    }
  }, [successRegister, dispatch]);

  // Handle input change for userName
  const handleChangeUserName = (event) => {
    setUserName(event.target.value);
    // Only reset details and logout on significant events, like login attempt
    if (userName) {
      dispatch({ type: USER_LOGOUT });
      dispatch({ type: USER_DETAILS_RESET });
    }
  };

  // Handle input change for password
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  // Submit login form
  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedUserName = userName.startsWith(0) ? `+98${userName.slice(1)}` : userName;
    dispatch(login(formattedUserName, password));
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
