import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Switch from '@mui/material/Switch';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function Wallet({ useCredit, setUseCredit }) {
  const { t } = useTranslation();

  const [checked, setChecked] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo.user.credit > 0) {
      setIsDisable(false);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      if (!checked) {
        setUseCredit(0);
      }
      if (checked) {
        setUseCredit(userInfo.user.credit);
      }
    }
  }, [userInfo, checked, useCredit, setUseCredit]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
      sx={{ marginTop: 2 }}
    >
      <Grid item xs container direction="column">
        <Grid item sx={{ marginBottom: 1 }}>
          <Typography variant="subtitle2">
            {t('needPage.useCredit.title')}
          </Typography>
        </Grid>
        <Grid item container direction="row">
          <Grid>
            <img src="/images/icons/wallet.svg" alt="wallet icon" />
          </Grid>
          <Grid>
            <Typography component="span" variant="body1" sx={{ padding: 1 }}>
              {t('profile.credit')} : {userInfo.user.credit}
              {t('currency.toman')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Switch
          disabled={isDisable}
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Grid>
    </Grid>
  );
}

Wallet.propTypes = {
  setUseCredit: PropTypes.func,
  useCredit: PropTypes.number,
};
