import React from 'react';
import { Grid, Typography, LinearProgress, Card } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  progressBar: {
    margin: 2,
  },
  percentage: {
    color: '#f05a31',
    fontWeight: 500,
    fontSize: '12px',
    padding: '10px',
  },
  theCard1: {
    margin: 1,
    textAlign: 'center',
    padding: 5,

    borderRadius: 5,
  },
  theCard2: {
    textAlign: 'center',
    padding: 5,
    borderRadius: 5,
  },
});
export default function NeedPageTop({ oneNeed }) {
  const { t } = useTranslation();

  const classes = useStyles();
  return (
    <Grid item container justifyContent="center" sx={{ marginTop: 2 }}>
      <Grid item xs={12} sx={{ margin: 'auto', textAlign: 'center' }}>
        <Typography variant="body1">{oneNeed.description}</Typography>
      </Grid>
      <Grid xs={12} md={10} item container sx={{ marginTop: 4 }}>
        <Grid item xs={10} sx={{ margin: 'auto' }}>
          <Card className={classes.theCard1}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography
                  component="span"
                  sx={{
                    fontSize: '10px',
                    fontWeight: 'normal',
                  }}
                >
                  {oneNeed.cost.toLocaleString() + t('currency.toman')}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  component="span"
                  sx={{
                    fontSize: '10px',
                    fontWeight: 'normal',
                  }}
                >
                  {oneNeed.paid.toLocaleString() + t('currency.toman')}
                </Typography>
              </Grid>
            </Grid>
            <LinearProgress
              variant="determinate"
              value={Number(oneNeed.progress)}
              className={classes.progressBar}
            />
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card className={classes.theCard2} elevation={1}>
            <Typography className={classes.percentage}>
              %{oneNeed.progress}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

NeedPageTop.propTypes = {
  oneNeed: PropTypes.object,
};
