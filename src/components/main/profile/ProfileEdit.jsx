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
import PhoneInput from 'react-phone-input-2';
import Message from '../../Message';
import { USER_RESET_PASSWORD_RESET } from '../../../constants/main/userConstants';

const ProfileEdit = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [email, setEmail] = useState('');

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
      history.push('/login?redirect=main/profile/edit');
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
    if (!successReset) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [successReset]);

  useEffect(() => {
    if (successReset) {
      history.push('main/profile/settings');
    }
  }, [successReset]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  // email changes
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  // phone changes
  const handleChangePhoneNumber = (input, data, event, formattedValue) => {
    setPhoneNumber(formattedValue);
    setCountryCode(data.countryCode);
    setDialCode(data.dialCode);
  };
  return (
    <>
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
      <Typography
        variant="h6"
        sx={{ padding: 2, fontWeight: 'lighter', textAlign: 'center' }}
      >
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
        maxWidth
      >
        <FormControl onSubmit={handleSubmit} variant="outlined">
          <form>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              item
              sx={{ marginTop: 10 }}
            >
              <Grid item>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-firstName"
                    type="text"
                    value={firstName}
                    onChange={handleChangeFirstName}
                    label="First Name"
                    startAdornment={
                      <InputAdornment position="start">kg</InputAdornment>
                    }
                  />
                  <InputLabel>{t('placeholder.name')}</InputLabel>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-lastName"
                    type="password"
                    value={lastName}
                    onChange={handleChangeLastName}
                    label="Last name"
                    startAdornment={
                      <InputAdornment position="start">kg</InputAdornment>
                    }
                  />
                  <InputLabel>{t('placeholder.lastName')}</InputLabel>
                </FormControl>
              </Grid>
              <Grid item>
                <PhoneInput
                  style={{ direction: 'ltr' }}
                  specialLabel={t('placeholder.phoneNumber')}
                  country="ir"
                  value={phoneNumber}
                  disableDropdown="false"
                  onChange={handleChangePhoneNumber}
                  inputProps={{
                    name: 'phone',
                  }}
                  defaultMask="... ... .. ..."
                  countryCodeEditable={false}
                />
              </Grid>
            </Grid>
          </form>
        </FormControl>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          {errorReset && (
            <Message
              sx={{ justifyContent: 'center' }}
              icon={false}
              backError={errorReset}
              variant="filled"
              severity="error"
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileEdit;
