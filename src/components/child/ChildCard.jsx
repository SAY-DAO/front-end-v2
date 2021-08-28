import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Typography,
  Avatar,
  Card,
  CardActionArea,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  childAvatar: {
    width: 55,
    height: 55,
    backgroundColor: '#FDE1C1',
    margin: 'auto',
  },
  theCard: {
    marginBottom: 10,
    padding: 10,
    minHeight: '70px',
  },
  icons: {
    width: 14,
    height: 14,
    marginLeft: 4,
    marginRight: 4,
  },
  sayName: {
    padding: 5,
    margin: 'auto',
  },
  actionArea: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
}));
export default function ChildCard({ myChild, handleMyChildPage }) {
  const { t } = useTranslation();

  const classes = useStyles();

  return (
    <>
      <Card elevation={4} className={classes.theCard}>
        <CardActionArea
          className={classes.actionArea}
          onClick={() => handleMyChildPage(myChild)}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              item
              spacing={1}
              xs={6}
            >
              <Grid item xs={6}>
                <Avatar
                  src={myChild.avatarUrl}
                  className={classes.childAvatar}
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{myChild.sayName}</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
              item
              spacing={1}
              xs={6}
            >
              <Grid item sx={{ display: 'flex' }}>
                <Typography component="span">
                  {myChild.done_needs_count}
                </Typography>
                <img
                  src="/images/icons/Task.svg"
                  alt="done icon"
                  className={classes.icons}
                />
              </Grid>
              <Grid item sx={{ display: 'flex' }}>
                <Typography component="span">
                  {t('currency.toman') + myChild.spent_credit.toLocaleString()}
                </Typography>
                <img
                  src="/images/icons/Money.svg"
                  alt="money icon"
                  className={classes.icons}
                />
              </Grid>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </>
  );
}

ChildCard.propTypes = {
  myChild: PropTypes.object.isRequired,
  handleMyChildPage: PropTypes.func.isRequired,
};
