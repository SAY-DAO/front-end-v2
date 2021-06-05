/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { useTranslation, Trans } from 'react-i18next';
// Customized "react-phone-input-2/lib/material.css"
import '../../resources/styles/css/material.css';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Back from '../Back';
import { verifyUser } from '../../actions/userAction';

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    maxHeight: '280px',
  },
});

const VerifyCodeForm = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [verificationMethod, setverificationMethod] = useState('');
  const [enableResend, setenableResend] = useState(false);
  const [progress, setProgress] = useState(100);

  // const verifyInfo = useSelector((state) => state.verifyInfo);
  // const { localVerifyInfo } = verifyInfo;

  const localVerifyInfo = JSON.parse(localStorage.getItem('localVerifyInfo'));

  useEffect(() => {
    if (localVerifyInfo.type === 'phone') {
      setverificationMethod(localVerifyInfo.phone_number);
    } else if (localVerifyInfo.type === 'email') {
      setverificationMethod(localVerifyInfo.email);
    }
  }, []);

  // resend progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setenableResend(false);
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

  const classes = useStyles();
  const handleResend = () => {
    const theType = localVerifyInfo.phone_number ? 'phone_number' : 'email';
    dispatch(verifyUser(theType, verificationMethod));
    setProgress(0);
    setenableResend(true);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
    >
      <Back step="EnteryForm" />
      <Grid item xs={12}>
        <img
          src="/images/otp.svg"
          width="100%"
          style={{ paddingBottom: '20px' }}
          className={classes.root}
          alt="otp page"
        />
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
        <FormControl variant="outlined">
          <TextField
            id="outlined-adornment-email"
            label={t('placeholder.code')}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'email',
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sx={{ marginTop: 10 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push('#')}
          sx={{
            bottom: 5,
          }}
        >
          {t('button.submit')}
        </Button>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          {localVerifyInfo && (
            <Typography variant="subtitle1">
              {t(`verify.wrong${capitalize(localVerifyInfo.type)}`)}{' '}
              <Link to="#" onClick={handleResend}>
                {t(`verify.change${capitalize(localVerifyInfo.type)}`)}
              </Link>
            </Typography>
          )}
        </Grid>
        {enableResend ? (
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
    </Grid>
  );
};

export default VerifyCodeForm;
