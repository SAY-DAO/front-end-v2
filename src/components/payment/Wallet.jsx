import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';

export default function Donation() {
  const { t } = useTranslation();

  const [checked, setChecked] = useState(true);
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
      alignItems="center"
    >
      <Grid item xs container direction="column">
        <Grid item>
          <Typography variant="subtitle2">
            {t('needPage.useCredit.title')}
          </Typography>
        </Grid>
        <Grid item>
          <img src="/images/icons/wallet.svg" alt="done icon" />
          <Typography component="span" variant="subtitle2">
            {t('profile.credit')} : {userCredit}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={2}>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Grid>
    </Grid>
  );
}
