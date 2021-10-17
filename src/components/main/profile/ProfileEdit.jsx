/* eslint-disable prefer-destructuring */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import LoadingButton from '@material-ui/lab/LoadingButton';
import FormControl from '@material-ui/core/FormControl';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Message from '../../Message';
import { USER_RESET_PASSWORD_RESET } from '../../../constants/main/userConstants';

const ProfileEdit = () => {
  const { t } = useTranslation();
  const history = useHistory();
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

  useEffect(() => {
    dispatch({ type: USER_RESET_PASSWORD_RESET });
    if (!userInfo && !successLogin) {
      history.push('/login?redirect=setpassword');
    }
  }, [userInfo, successLogin, history]);

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
    if (successReset) {
      history.push('main/profile/settings');
    }
  }, [successReset]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password) {
      dispatch(ProfileEdit(password));
    }
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeRepeatPassword = (event) => {
    setRepeatPassword(event.target.value);
  };

  //   const handleCancelEdit = () => {
  //     if (!handleClickOverride) {
  //       dispatch(changeVerifyStep(step));
  //       dispatch({ type: USER_VERIFY_RESET });
  //       history.push(to);
  //     } else {
  //       handleClickOverride();
  //     }
  //   };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
    >
      <Link to="/main/profile">
        <CloseIcon
          sx={{
            color: 'red',
            top: 0,
            right: 0,
            width: '24px',
            margin: '18px',
            position: 'absolute',
            zIndex: 10,
          }}
        />
      </Link>
      <Typography variant="h6" sx={{ padding: 2, fontWeight: 'lighter' }}>
        {t('profile.editProfile.title')}
      </Typography>
      <Link to="#">
        <DoneIcon
          sx={{
            color: 'green',
            top: 0,
            left: 0,
            width: '24px',
            margin: '18px',
            position: 'absolute',
            zIndex: 10,
          }}
        />
      </Link>

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        item
        sx={{ direction: 'ltr', marginTop: 10 }}
      >
        <FormControl onSubmit={handleSubmit} variant="outlined">
          <form>
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
          </form>
        </FormControl>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          {(errorReset || validateErr) && (
            <Message
              sx={{ justifyContent: 'center' }}
              icon={false}
              backError={errorReset}
              variant="filled"
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

export default ProfileEdit;
