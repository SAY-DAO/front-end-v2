import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

export default function Donation({ method, theNeed }) {
  const { t } = useTranslation();

  const [donationAmount, setDonationAmount] = useState(0);
  const [width2, setWidth2] = useState(5);
  const [width3, setWidth3] = useState(1.5);
  const [width4, setWidth4] = useState(1.5);
  const [width5, setWidth5] = useState(1.5);
  const [width6, setWidth6] = useState(1.5);
  const [amount, setAmount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    if (theNeed) {
      const { cost } = theNeed;
      const paid = theNeed.cost;
      const remainingCost = cost - paid;
      setAmount(remainingCost);
    }
  }, []);

  const calculateDonation = (percentage) => {
    if (method === 'payAll') {
      return (
        (percentage * remainingAmount) / 100 -
        (((percentage * remainingAmount) / 100) % 100)
      );
    }
    if (method === 'paySome') {
      return (
        (percentage * remainingAmount) / 100 -
        (((percentage * remainingAmount) / 100) % 100)
      );
    }
  };
  const handleWidth = (value) => {
    if (value === 5) {
      setWidth2(6);
      setWidth3(1.5);
      setWidth4(1.5);
      setWidth5(1.5);
      setWidth6(1.5);
    } else if (value === 10) {
      setWidth2(1.5);
      setWidth3(6);
      setWidth4(1.5);
      setWidth5(1.5);
      setWidth6(1.5);
    } else if (value === 15) {
      setWidth2(1.5);
      setWidth3(1.5);
      setWidth4(6);
      setWidth5(1.5);
      setWidth6(1.5);
    } else if (value === 20) {
      setWidth2(1.5);
      setWidth3(1.5);
      setWidth4(1.5);
      setWidth5(6);
      setWidth6(1.5);
    } else if (value === 25) {
      setWidth2(1.5);
      setWidth3(1.5);
      setWidth4(1.5);
      setWidth5(1.5);
      setWidth6(6);
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Grid sx={{ marginTop: 1 }}>
      <FormControlLabel
        label={
          <Typography variant="subtitle2">
            {t('needPage.donateCheckbox')}
          </Typography>
        }
        control={
          <Checkbox
            checked={checked}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChange}
          />
        }
      />
      {checked && (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: 'center' }}
          spacing={0.5}
        >
          <Grid item xs={width2}>
            <Card
              sx={{
                maxWidth: 345,
                background:
                  width2 !== 1.5
                    ? 'linear-gradient(90deg, #f59e39 100%, #f05a31 100%)'
                    : '#dcdcdc',
                color: width2 !== 1.5 && 'white',
              }}
            >
              <CardActionArea onClick={() => handleWidth(5)}>
                <CardContent
                  sx={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 1,
                    paddingTop: 1,
                  }}
                >
                  <Typography gutterBottom variant="body2" component="div">
                    5%
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={width3}>
            <Card
              sx={{
                maxWidth: 345,
                background:
                  width3 !== 1.5
                    ? 'linear-gradient(90deg, #f59e39 100%, #f05a31 100%)'
                    : '#dcdcdc',
                color: width3 !== 1.5 && 'white',
              }}
            >
              <CardActionArea onClick={() => handleWidth(10)}>
                <CardContent
                  sx={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 1,
                    paddingTop: 1,
                  }}
                >
                  <Typography gutterBottom variant="body2" component="div">
                    10%
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={width4}>
            <Card
              sx={{
                maxWidth: 345,
                background:
                  width4 !== 1.5
                    ? 'linear-gradient(90deg, #f59e39 100%, #f05a31 100%)'
                    : '#dcdcdc',
                color: width4 !== 1.5 && 'white',
              }}
            >
              <CardActionArea onClick={() => handleWidth(15)}>
                <CardContent
                  sx={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 1,
                    paddingTop: 1,
                  }}
                >
                  <Typography gutterBottom variant="body2" component="div">
                    15%
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={width5}>
            <Card
              sx={{
                maxWidth: 345,
                background:
                  width5 !== 1.5
                    ? 'linear-gradient(90deg, #f59e39 100%, #f05a31 100%)'
                    : '#dcdcdc',
                color: width5 !== 1.5 && 'white',
              }}
            >
              <CardActionArea onClick={() => handleWidth(20)}>
                <CardContent
                  sx={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 1,
                    paddingTop: 1,
                  }}
                >
                  <Typography gutterBottom variant="body2" component="div">
                    20%
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={width6}>
            <Card
              sx={{
                maxWidth: 345,
                background:
                  width6 !== 1.5
                    ? 'linear-gradient(90deg, #f59e39 100%, #f05a31 100%)'
                    : '#dcdcdc',
                color: width6 !== 1.5 && 'white',
              }}
            >
              <CardActionArea onClick={() => handleWidth(25)}>
                <CardContent
                  sx={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 1,
                    paddingTop: 1,
                  }}
                >
                  <Typography gutterBottom variant="body2" component="div">
                    25%
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

Donation.propTypes = {
  method: PropTypes.string,
  theNeed: PropTypes.object,
};
