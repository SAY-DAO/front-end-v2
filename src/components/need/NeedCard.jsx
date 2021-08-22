import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Avatar,
  Card,
  CardActionArea,
  makeStyles,
} from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(() => ({
  imageUrl: {
    width: 45,
    height: 45,
    backgroundColor: '#FDE1C1',
    margin: 'auto',
  },
  theCard: {
    padding: 5,
    minHeight: '60px',
  },
  needName: {
    textAlign: 'right',
    padding: 5,
    margin: 'auto',
  },
  actionArea: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
  progressBar: {
    marginTop: '5px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  percentage: {
    color: '#f05a31',
    fontWeight: 500,
    fontSize: '12px',
  },
}));

export default function NeedCard({ need, handleCardClick }) {
  const classes = useStyles();
  return (
    <Card elevation={3} className={classes.theCard}>
      <CardActionArea
        className={classes.actionArea}
        onClick={() => handleCardClick(need.id)}
      >
        <Grid container item direction="row" justifyContent="space-between">
          <Grid
            container
            item
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            xs={3}
          >
            <Grid item xs sx={{ display: 'flex' }}>
              <Typography variant="body1">{need.cost}</Typography>
            </Grid>
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="column"
            className={classes.needName}
          >
            <Grid item>
              <Typography variant="subtitle2">{need.name}</Typography>
            </Grid>
            <Grid item container direction="row">
              <Grid item xs={10}>
                <LinearProgress
                  variant="determinate"
                  value={need.progress}
                  className={classes.progressBar}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2" className={classes.percentage}>
                  %{need.progress}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Avatar src={need.imageUrl} className={classes.imageUrl} />
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

NeedCard.propTypes = {
  need: PropTypes.object.isRequired,
  handleCardClick: PropTypes.func.isRequired,
};
