import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  OutlinedInput,
  InputAdornment,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

export default function CartPageDonation() {
  const { t } = useTranslation();

  const [donationAmount, setDonationAmount] = useState(0);

  const handleDonationAmount = (event) => {
    setDonationAmount(event.target.value);
  };

  return (
    <>
      <Typography sx={{ marginTop: 4, marginBottom: 2 }} variant="subtitle1">
        {t('needPage.donateCheckbox')}
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ textAlign: 'center' }}
      >
        <Grid item xs={2}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                  0%
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={handleDonationAmount}>
              <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                  5%
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                  10%
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                  15%
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                  20%
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={handleDonationAmount}>
              <CardContent>
                <Typography gutterBottom variant="body2" component="div">
                  {t('needPage.otherDonate')}
                </Typography>
                <OutlinedInput
                  sx={{ direction: 'rtl' }}
                  type="number"
                  id="filled-adornment-someAmount"
                  value={donationAmount}
                  onChange={handleDonationAmount}
                  startAdornment={
                    <InputAdornment position="start">
                      {t('currency.toman')}
                    </InputAdornment>
                  }
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
