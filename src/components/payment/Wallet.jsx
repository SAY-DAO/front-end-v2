import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';

export default function Donation() {
  const { t } = useTranslation();

  const [checked, setChecked] = useState(false);
  const [userCredit, setUserCredit] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, localUserLogin } = userLogin;

  useEffect(() => {
    if (userInfo) {
      setUserCredit(userInfo.user.credit);
    } else if (!userInfo && localUserLogin) {
      setUserCredit(localUserLogin.user.credit);
    }
  }, [userInfo, localUserLogin]);

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
              {t('profile.credit')} : {userCredit} {t('currency.toman')}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={3}>
        <Switch
          disabled={true && userCredit === 0}
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Grid>
    </Grid>
  );
}
