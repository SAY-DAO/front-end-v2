import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';
// Customized "react-phone-input-2/lib/material.css"
import '../../resources/styles/css/material.css';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import Message from '../Message';
import validateUsername from '../../inputsValidation/validateUsername';
import { checkUserNameBeforeVerify, register } from '../../redux/actions/userAction';
import validatePassword from '../../inputsValidation/validatePassword';
import validateRepeatPassword from '../../inputsValidation/validateRepeatPassword';
import {
  CHECK_USERNAME_RESET,
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

const FinalForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const queryStringValue = queryString.parse(search);
  const redirect = queryStringValue.redirect ? queryStringValue.redirect : 'main/search';

  const [validateErr, setValidateErr] = useState('');
  const [userNameErr, setUserNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [repeatPasswordErr, setRepeatPasswordErr] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [theKey, setTheKey] = useState('');
  const [value, setValue] = useState('');
  const [otp, setOtp] = useState('');
  const [messageInput, setMessageInput] = useState('');

  const checkUserName = useSelector((state) => state.checkUserName);
  const { loading: loadingCheck, error: errorCheck, success: successCheck } = checkUserName;

  const userRegister = useSelector((state) => state.userRegister);
  const { loading: loadingRegister, error: errorRegister, success: successRegister } = userRegister;

  const userVerifyInfo = useSelector((state) => state.userVerifyInfo);
  const { verifyInfo } = userVerifyInfo;

  const localOTP = localStorage.getItem('localOTP')
    ? JSON.parse(localStorage.getItem('localOTP'))
    : '';

  // loading button
  useEffect(() => {
    if (loadingCheck || loadingRegister || successRegister) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingCheck, loadingRegister, successRegister]);

  // disable button
  useEffect(() => {
    if (
      successRegister ||
      !successCheck ||
      userNameErr ||
      passwordErr ||
      repeatPasswordErr ||
      errorCheck ||
      errorRegister ||
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
    errorRegister,
    successRegister,
  ]);

  // change step
  useEffect(() => {
    if (successRegister) {
      navigate(`/${redirect}`);
    }
  }, [successRegister]);

  // Message input for status error
  useEffect(() => {
    if (userName) {
      setMessageInput('register');
    }
  }, [userName]);

  // clear error when types
  useEffect(() => {
    if (errorRegister || errorCheck) {
      dispatch({ type: USER_REGISTER_RESET });
      dispatch({ type: USER_REGISTER_RESET });
    }
  }, [userName, password, repeatPassword]);

  // check userName every 1000 ms when typing
  useEffect(() => {
    setValidateErr('');
    setUserNameErr(true);
    dispatch({ type: CHECK_USERNAME_RESET });
    if (userName) {
      const result = validateUsername(userName);
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
  useEffect(() => {
    async function passwordStuff() {
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
    }
    passwordStuff();
  }, [password, repeatPassword]);

  useEffect(() => {
    setOtp(localOTP);
    if (verifyInfo) {
      if (verifyInfo.type === 'phone') {
        setTheKey('phone');
        setValue(verifyInfo.phone_number);
      } else if (verifyInfo.type === 'email') {
        setTheKey('email');
        setValue(verifyInfo.email);
      }
    }
  }, [verifyInfo, localOTP]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(otp);
    dispatch(register(userName, password, theKey, value, otp));
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
    <Grid container direction="column" justifyContent="center" alignItems="center" maxWidth>
      <Grid item xs={12}>
        <img src="/images/finalForm.svg" className={classes.root} alt="otp page" />
      </Grid>
      <Grid container direction="column" justifyContent="center" alignItems="center" item>
        <FormControl onSubmit={handleSubmit} variant="outlined">
          <form>
            <Grid item xs={12} sx={{ marginTop: 4 }}>
              <FormControl variant="outlined">
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
                <InputLabel htmlFor="userName">{t('placeholder.userName')}</InputLabel>
              </FormControl>
            </Grid>
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
                <InputLabel htmlFor="password">{t('placeholder.password')}</InputLabel>
                <PasswordStrengthBar
                  id="pass-checker"
                  password={password}
                  shortScoreWord={t('error.weak')}
                  minLength={6}
                  scoreWords={[
                    t('error.weak'),
                    t('error.weak'),
                    t('error.okay'),
                    t('error.good'),
                    t('error.strong'),
                  ]}
                  style={{ fontSize: '10px' }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 1 }}>
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
                <InputLabel htmlFor="repeatPassword">{t('placeholder.repeatPassword')}</InputLabel>
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
                {t('button.submit')}
              </LoadingButton>
            </Grid>
          </form>
        </FormControl>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          {(errorCheck || validateErr || errorRegister) && (
            <Message
              input={messageInput}
              sx={{ justifyContent: 'center' }}
              icon={false}
              backError={errorCheck || errorRegister}
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

export default FinalForm;
