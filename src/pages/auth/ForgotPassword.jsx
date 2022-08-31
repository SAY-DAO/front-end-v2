/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Grid, Divider, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../actions/userAction';
import Message from '../../components/Message';
import contents from '../../inputsValidation/Contents';
import Back from '../../components/Back';
import validateEmail from '../../inputsValidation/validateEmail';
import validatePhone from '../../inputsValidation/validatePhone';
import { USER_FORGOT_PASSWORD_RESET } from '../../constants/main/userConstants';
// Customized "react-phone-input-2/lib/material.css"
import '../../resources/styles/css/material.css';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // const [_isLoggedIn, setIsLoggedIn] = useState(false);
  const [validateErr, setValidateErr] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const userResetPass = useSelector((state) => state.userResetPass);
  const {
    loading: loadingReset,
    error: errorReset,
    success: successReset,
  } = userResetPass;

  // cleanup the state error after leaving the page - this runs every reload
  useEffect(() => {
    dispatch({ type: USER_FORGOT_PASSWORD_RESET });
  }, [phoneNumber, email]);

  // check phone every 1000 ms when typing
  useEffect(() => {
    if (phoneNumber) {
      setValidateErr('');
      setEmail('');
      const phoneResult = validatePhone(phoneNumber, countryCode);
      if (phoneResult && phoneResult.errorMessage) {
        const timeout = setTimeout(() => {
          setValidateErr(t(phoneResult.errorMessage));
        }, 1000);
        return () => {
          clearTimeout(timeout);
        };
      }
    }
  }, [phoneNumber]);

  // check email every 1000 ms when typing
  useEffect(() => {
    if (email) {
      setValidateErr('');
      setPhoneNumber(dialCode);
      const emailResult = validateEmail(email);
      if (emailResult && emailResult.errorMessage) {
        const timeout = setTimeout(() => {
          setValidateErr(t(emailResult.errorMessage));
        }, 1000);
        return () => {
          clearTimeout(timeout);
        };
      }
    }
  }, [email]);

  // loading button
  useEffect(() => {
    if (loadingReset) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingReset, phoneNumber, email]);

  // disable button
  useEffect(() => {
    if (!validateErr && (phoneNumber || email)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [validateErr, phoneNumber, email, successReset]);

  // email changes
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  // phone changes
  const handleChangePhoneNumber = (input, data, event, formattedValue) => {
    setPhoneNumber(formattedValue);
    setDialCode(data.dialCode);
    setCountryCode(data.countryCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateErr === '') {
      if (email) {
        console.log('verifying email...');
        dispatch(forgotPassword('email', email));
      } else if (phoneNumber) {
        console.log('verifying phone number...');
        dispatch(forgotPassword('phone_number', phoneNumber));
      }
    } else if (!phoneNumber && !email) {
      setValidateErr(t(contents.fillOne));
    } else {
      setValidateErr('verification logic error');
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
    >
      <Back to="/auth/login" isOrange />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        item
        sx={{ marginTop: 10 }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: 6, fontWeight: 'lighter' }}
        >
          {t('forgot-password.title')}
        </Typography>
        <FormControl onSubmit={handleSubmit} variant="outlined">
          <form>
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
            <Divider sx={{ marginTop: 4, marginBottom: 4 }}>
              <Typography variant="subtitle1">
                {t('divider.register')}
              </Typography>
            </Divider>
            <TextField
              type="email"
              id="outlined-adornment-email"
              label={t('placeholder.email')}
              value={email}
              onChange={handleChangeEmail}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'email',
              }}
            />
            <Grid item xs={12} sx={{ marginTop: 8, textAlign: 'center' }}>
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                disabled={isDisabled}
                loading={isLoading}
                sx={{ bottom: 5 }}
              >
                {t('button.submit')}
              </LoadingButton>
            </Grid>
          </form>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        {(validateErr || errorReset) && (
          <Message frontError={errorReset} variant="standard" severity="error">
            {validateErr}
          </Message>
        )}
        {(!validateErr || !errorReset) && successReset && (
          <Message variant="standard" severity="success">
            {t('forgot-password.successNotif')}
          </Message>
        )}
      </Grid>
    </Grid>
  );
};

export default ForgotPassword;
