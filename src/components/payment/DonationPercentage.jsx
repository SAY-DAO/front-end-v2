import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DonationModal from '../modals/DonationModal';

export default function Donation({ setPercentage, amount }) {
  const { t } = useTranslation();

  const [width2, setWidth2] = useState(5);
  const [width3, setWidth3] = useState(2);
  const [width4, setWidth4] = useState(2);
  const [width5, setWidth5] = useState(2);
  const [view, setView] = useState(0);
  const [checked, setChecked] = React.useState(false);
  const [modal, setModal] = useState(false);

  const handleWidth = (value) => {
    setView(value);

    if (value === 5) {
      setPercentage(5);
      setWidth2(6);
      setWidth3(2);
      setWidth4(2);
      setWidth5(2);
    } else if (value === 10) {
      setPercentage(10);
      setWidth2(2);
      setWidth3(6);
      setWidth4(2);
      setWidth5(2);
    } else if (value === 15) {
      setPercentage(15);
      setWidth2(2);
      setWidth3(2);
      setWidth4(6);
      setWidth5(2);
    } else if (value === 20) {
      setPercentage(20);
      setWidth2(2);
      setWidth3(2);
      setWidth4(2);
      setWidth5(6);
    } else if (value === 25) {
      setPercentage(25);
      setWidth2(2);
      setWidth3(2);
      setWidth4(2);
      setWidth5(2);
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Grid sx={{ marginTop: 1, marginBottom: 4 }}>
      <FormControlLabel
        label={
          <>
            <Typography variant="subtitle2" component="span">
              {t('needPage.donateCheckbox')}
            </Typography>
            <IconButton color="primary" onClick={() => setModal(true)}>
              <InfoOutlinedIcon />
            </IconButton>
          </>
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
                  width2 !== 2
                    ? 'linear-gradient(90deg, #f59e39 0%, #f05a31 100%)'
                    : '#dcdcdc',
                color: width2 !== 2 && 'white',
              }}
            >
              <CardActionArea onClick={() => handleWidth(5)}>
                <CardContent
                  sx={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 1,
                    paddingTop: 2,
                  }}
                >
                  <Typography gutterBottom variant="body2" component="div">
                    5%
                    {view === 5 && (
                      <Typography gutterBottom variant="body2" component="span">
                        {' '}
                        (
                        {(
                          (5 * amount) / 100 -
                          (((5 * amount) / 100) % 100)
                        ).toLocaleString() + t('currency.toman')}
                        )
                      </Typography>
                    )}
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
                  width3 !== 2
                    ? 'linear-gradient(90deg, #f59e39 0%, #f05a31 100%)'
                    : '#dcdcdc',
                color: width3 !== 2 && 'white',
              }}
            >
              <CardActionArea onClick={() => handleWidth(10)}>
                <CardContent
                  sx={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 1,
                    paddingTop: 2,
                  }}
                >
                  <Typography gutterBottom variant="body2" component="div">
                    10%
                    {view === 10 && (
                      <Typography gutterBottom variant="body2" component="span">
                        {' '}
                        (
                        {(
                          (10 * amount) / 100 -
                          (((10 * amount) / 100) % 100)
                        ).toLocaleString() + t('currency.toman')}
                        )
                      </Typography>
                    )}
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
                  width4 !== 2
                    ? 'linear-gradient(90deg, #f59e39 0%, #f05a31 100%)'
                    : '#dcdcdc',
                color: width4 !== 2 && 'white',
              }}
            >
              <CardActionArea onClick={() => handleWidth(15)}>
                <CardContent
                  sx={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 1,
                    paddingTop: 2,
                  }}
                >
                  <Typography gutterBottom variant="body2" component="div">
                    15%
                    {view === 15 && (
                      <Typography gutterBottom variant="body2" component="span">
                        {' '}
                        (
                        {(
                          (15 * amount) / 100 -
                          (((15 * amount) / 100) % 100)
                        ).toLocaleString() + t('currency.toman')}
                        )
                      </Typography>
                    )}
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
                  width5 !== 2
                    ? 'linear-gradient(90deg, #f59e39 0%, #f05a31 100%)'
                    : '#dcdcdc',
                color: width5 !== 2 && 'white',
              }}
            >
              <CardActionArea onClick={() => handleWidth(20)}>
                <CardContent
                  sx={{
                    paddingLeft: 0,
                    paddingRight: 0,
                    paddingBottom: 1,
                    paddingTop: 2,
                  }}
                >
                  <Typography gutterBottom variant="body2" component="div">
                    20%
                    {view === 20 && (
                      <Typography gutterBottom variant="body2" component="span">
                        {' '}
                        (
                        {(
                          (20 * amount) / 100 -
                          (((20 * amount) / 100) % 100)
                        ).toLocaleString() + t('currency.toman')}
                        )
                      </Typography>
                    )}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      )}
      {modal && <Donation setPercentage={setPercentage} amount={amount} />}
    </Grid>
  );
}

Donation.propTypes = {
  setPercentage: PropTypes.func,
  amount: PropTypes.number,
};
