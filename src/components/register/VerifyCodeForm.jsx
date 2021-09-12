/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import LoadingButton from '@material-ui/lab/LoadingButton';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { useTranslation, Trans } from 'react-i18next';
// Customized "react-phone-input-2/lib/material.css"
import '../../resources/styles/css/material.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import NumberFormat from 'react-number-format';
import Back from '../Back';
import {
  verifyUser,
  userVerifyCode,
  changeVerifyStep,
} from '../../actions/userAction';
import Message from '../Message';
import { CODE_VERIFY_RESET } from '../../constants/main/userConstants';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

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

const VerifyCodeForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [verificationMethod, setVerificationMethod] = useState('');
  const [enableResend, setEnableResend] = useState(false);
  const [progress, setProgress] = useState(100);
  const [code, setCode] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [messageInput, setMessageInput] = useState('');

  const theVerifyCode = useSelector((state) => state.userVerifyCode);
  const {
    error: errorVerifyCode,
    success: successVerifyCode,
    loading: loadingVerifyCode,
  } = theVerifyCode;

  const localVerifyInfo = JSON.parse(localStorage.getItem('localVerifyInfo'));

  // Message input for 422 status error
  useEffect(() => {
    if (code) {
      setMessageInput('code');
    }
  }, [code]);

  useEffect(() => {
    if (localVerifyInfo.type === 'phone') {
      setVerificationMethod(localVerifyInfo.phone_number);
    } else if (localVerifyInfo.type === 'email') {
      setVerificationMethod(localVerifyInfo.email);
    }
  }, [localVerifyInfo]);

  // resend progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setEnableResend(false);
          return 100;
        }
        const diff = 1.5;
        return Math.min(oldProgress + diff, 100);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // change step
  useEffect(() => {
    if (successVerifyCode) {
      dispatch(changeVerifyStep('FinalForm'));
    }
  }, [successVerifyCode]);

  // loading button
  useEffect(() => {
    if (loadingVerifyCode) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingVerifyCode]);

  // button disable
  useEffect(() => {
    if (!errorVerifyCode && successVerifyCode) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [errorVerifyCode, successVerifyCode]);

  // verify code
  useEffect(() => {
    if (code.length === 6) {
      dispatch({ type: CODE_VERIFY_RESET });
      dispatch(userVerifyCode(localVerifyInfo.id, code));
    }
    return () => {
      dispatch({ type: CODE_VERIFY_RESET });
    };
  }, [code]);

  const handleResend = () => {
    const theType = localVerifyInfo.phone_number ? 'phone_number' : 'email';
    dispatch(verifyUser(theType, verificationMethod));
    setProgress(0);
    setEnableResend(true);
  };

  const handleChange = (event) => {
    setCode(event.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userVerifyCode(localVerifyInfo.id, code));
  };

  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
      sx={{ marginTop: 4 }}
    >
      <Back step="EntryForm" isOrange />
      <Grid item xs={12}>
        <img src="/images/otp.svg" className={classes.root} alt="otp page" />
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 2 }}>
        {localVerifyInfo && (
          <Typography variant="subtitle1">
            <Trans
              i18nKey={`verify.content.by${capitalize(localVerifyInfo.type)}`}
            >
              <span dir="ltr">{{ verificationMethod }}</span>
            </Trans>
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        <FormControl onSubmit={handleSubmit} variant="outlined">
          <form>
            <NumberFormat
              value={code}
              onValueChange={handleChange}
              id="codeInput"
              placeholder={t('placeholder.code')}
              customInput={TextField}
              format="### ###"
              mask="_"
            />
          </form>
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 14 }}>
        <LoadingButton
          variant="contained"
          color="primary"
          disabled={isDisabled}
          loading={isLoading}
          sx={{
            bottom: 5,
          }}
        >
          {t('button.submit')}
        </LoadingButton>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {enableResend && !errorVerifyCode ? (
          <Grid sx={{ width: '100%', marginTop: 2 }}>
            <Grid item xs={12}>
              <LinearProgress variant="determinate" value={progress} />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle1"
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                  color: '#f5a344',
                }}
              >
                {t('verify.pleaseWait')}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ marginTop: 2 }}>
            {localVerifyInfo && (
              <Typography variant="subtitle1">
                {t('verify.notReceiveCode')}{' '}
                <Link to="#" onClick={handleResend}>
                  {t('verify.resendCode')}
                </Link>
              </Typography>
            )}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        {errorVerifyCode && (
          <Message
            input={messageInput}
            backError={errorVerifyCode}
            variant="filled"
            severity="error"
          />
        )}
      </Grid>
    </Grid>
  );
};

export default VerifyCodeForm;
