import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { useTranslation, Trans } from 'react-i18next';
// Customized "react-phone-input-2/lib/material.css"
import '../../resources/styles/css/material.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Back from '../Back';

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
  // const enableResend = true;
  const { t } = useTranslation();
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [verificationMethod, setverificationMethod] = useState('');
  const verifyInfo = useSelector((state) => state.verifyInfo);
  const { verifyData } = verifyInfo;

  useEffect(() => {
    if (verifyData.type === 'phone') {
      setverificationMethod(verifyData.phone_number);
      console.log(verificationMethod);
    } else if (verifyData.type === 'email') {
      setverificationMethod(verifyData.email);
    }
  }, [verifyData]);

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
        <Typography variant="subtitle1">
          <Trans i18nKey={`verify.content.by${capitalize(verifyData.type)}`}>
            کد تایید به شماره موبایل{' '}
            <span dir="ltr">{{ verificationMethod }}</span> ارسال شد.
          </Trans>
        </Typography>
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
      <Grid item xs={12} sx={{ marginTop: 2 }}>
        <Typography variant="subtitle1">
          {/* {t('verify.notReceiveCode')}{' '}
          {enableResend ? (
            <Link onClick={(e) => handleResend(e)}>
              {t('verify.resendCode')}
            </Link>
          ) : (
            ''
          )} */}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default VerifyCodeForm;
