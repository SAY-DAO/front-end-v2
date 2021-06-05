import React, { useState, useEffect } from 'react';
import { Grid, Divider, Typography, Button } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { useTranslation, Trans } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  changeVerifyStep,
  verifyUser,
  checkContactBeforeVerify,
} from '../../actions/userAction';
import Message from '../Message';
import contents from '../../inputsValidation/Contents';
import Back from '../Back';
// Customized "react-phone-input-2/lib/material.css"
import '../../resources/styles/css/material.css';
import { USER_VERIFY_RESET } from '../../constants/userConstants';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    maxHeight: '280px',
  },
});

const EnteryForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // const [_isLoggedIn, setIsLoggedIn] = useState(false);
  const [validateErr, setValidateErr] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [email, setEmail] = useState('');
  const [isDisabled, setisDisabled] = useState(true);

  const verifyInfo = useSelector((state) => state.verifyInfo);
  const {
    loading: loadingVerify,
    error: errorVerify,
    success: successVerify,
  } = verifyInfo;

  const checkBeforeVerify = useSelector((state) => state.checkBeforeVerify);
  const {
    loading: loadingCheck,
    error: errorCheck,
    success: successCheck,
  } = checkBeforeVerify;

  // disable button
  useEffect(() => {
    if (!successCheck || errorCheck || validateErr) {
      setisDisabled(true);
    } else {
      setisDisabled(false);
    }
  }, [validateErr, email, phoneNumber, errorCheck, errorVerify]);

  // check email every 500 ms when typing
  useEffect(() => {
    if (
      email.length > 0 ||
      (email.indexOf('@') > 0 && email.indexOf('.') > 0)
    ) {
      const timeout = setTimeout(() => {
        dispatch(checkContactBeforeVerify('email', email, countryCode));
      }, 500);
      return () => clearTimeout(timeout);
    }
    // if (email.length !== 0) {
    //   setValidateErr(t(contents.wrongEmail));
    // }
  }, [email]);

  // check phone every 500 ms when typing
  useEffect(() => {
    console.log(phoneNumber.length);
    if (
      phoneNumber.length === 16 &&
      countryCode === 'ir'
      // phoneNumber.length === 12
    ) {
      const timeout = setTimeout(() => {
        dispatch(
          checkContactBeforeVerify('phone_number', phoneNumber, countryCode)
        );
      }, 500);
      return () => clearTimeout(timeout);
    }
    if (phoneNumber.length > 4 && phoneNumber.length < 16) {
      setValidateErr(t(contents.wrongPhone));
    }
    return () => setValidateErr('');
  }, [phoneNumber]);

  // change step
  useEffect(() => {
    if (successCheck && successVerify) {
      dispatch(changeVerifyStep('VerifyCodeForm'));
    }
  }, [successVerify, successCheck]);

  // email changes
  const handleChangeEmail = (event) => {
    dispatch({ type: USER_VERIFY_RESET });
    setEmail(event.target.value);
    setPhoneNumber(countryCode);
  };

  // phone changes
  const handleChangePhoneNumber = (input, data, event, formattedValue) => {
    dispatch({ type: USER_VERIFY_RESET });
    setEmail('');
    setPhoneNumber(formattedValue);
    setCountryCode(data.countryCode);
  };

  const validateTheEmail = async () => {
    dispatch(checkContactBeforeVerify('email', email, countryCode));
    if (!errorCheck) {
      dispatch(verifyUser('email', email, countryCode));
    }
  };

  const validateThePhone = async () => {
    dispatch(
      checkContactBeforeVerify('phone_number', phoneNumber, countryCode)
    );
    if (!errorCheck) {
      const thePhoneNymber = phoneNumber.split(' ').join('');
      dispatch(verifyUser('phone_number', thePhoneNymber));
    }
  };

  const handleVerify = () => {
    dispatch({ type: USER_VERIFY_RESET });
    if (!validateErr) {
      if (email !== '' && phoneNumber === '') {
        console.log('verfying email...');
        validateTheEmail();
      } else if (phoneNumber !== '' && email === '') {
        console.log('verfying phone number...');
        validateThePhone();
      }
    } else {
      setValidateErr('verification logic error');
    }
  };

  const handleClick = () => {
    if (!(phoneNumber || email)) {
      setValidateErr(contents.fillOne);
    } else {
      console.log('verfying...');
      handleVerify();
    }
  };

  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
      sx={{ direction: 'ltr' }}
    >
      <Back to="/intro" />
      <Grid item xs={12}>
        <img
          src="/images/register.svg"
          width="100%"
          style={{ paddingBottom: '20px' }}
          className={classes.root}
          alt="register"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl variant="outlined">
          <PhoneInput
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
            <Typography variant="subtitle1">{t('devider.register')}</Typography>
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
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 8 }}>
        {loadingCheck || loadingVerify ? (
          <LoadingButton loading variant="contained">
            {t('button.submit')}
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            disabled={isDisabled}
            sx={{ bottom: 5 }}
          >
            {t('button.submit')}
          </Button>
        )}
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <Typography variant="subtitle1">
          <Trans i18nKey="join.alreadyJoined">
            If already joined tap
            <Link to="/Login">here</Link>
          </Trans>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {(validateErr || errorVerify || errorCheck) && (
          <Message
            onRequestBackError={errorCheck}
            onRequestFrontError={errorVerify}
            variant="filled"
            severity="error"
          >
            {validateErr}
          </Message>
        )}
      </Grid>
    </Grid>
  );
};

export default EnteryForm;