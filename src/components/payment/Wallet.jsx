import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Switch from '@mui/material/Switch';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUserDetails } from '../../actions/userAction';

export default function Wallet({ setIsCredit, userCredit, setUserCredit }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { theUser, success: successUserDetails } = userDetails;

  useEffect(() => {
    if (theUser && Number(theUser.credit) >= 0) {
      console.log(theUser.credit);
      setIsDisable(false);
    } else {
      setIsDisable(true);.
    }
  }, [theUser]);

  useEffect(() => {
    if (successUserDetails) {
      setUserCredit(theUser.credit);
      if (!checked) {
        setIsCredit(false);
      }
      if (checked) {
        setIsCredit(true);
      }
    } else {
      dispatch(fetchUserDetails());
    }
  }, [
    successUserDetails,
    dispatch,
    theUser,
    checked,
    userCredit,
    setUserCredit,
    setIsCredit,
  ]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-end"
      sx={{ marginTop: 2, marginLeft: 2, marginRight: 2 }}
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
              {t('profile.credit')} : {theUser && theUser.credit}
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
  setUserCredit: PropTypes.func,
  userCredit: PropTypes.number,
  setIsCredit: PropTypes.func,
};
