import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Grid,
  Typography,
  Avatar,
  Card,
  CardActionArea,
  makeStyles,
} from '@material-ui/core';

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
    textAlign: 'right',
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
    <div>
      <Card elevation={4} className={classes.theCard}>
        <CardActionArea
          className={classes.actionArea}
          onClick={() => handleMyChildPage(myChild)}
        >
          <Grid container item direction="row" justifyContent="space-between">
            <Grid
              container
              item
              direction="row"
              justifyContent="space-between"
              alignItems="flex-end"
              xs={7}
            >
              <Grid item xs sx={{ display: 'flex' }}>
                <Typography variant="span">
                  {t('currency.toman') + myChild.spent_credit.toLocaleString()}
                </Typography>
                <img
                  src="/images/icons/Money.svg"
                  alt="money icon"
                  className={classes.icons}
                />
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex' }}>
                <Typography variant="span">
                  {myChild.done_needs_count}
                </Typography>
                <img
                  src="/images/icons/Task.svg"
                  alt="done icon"
                  className={classes.icons}
                />
              </Grid>
            </Grid>
            <Grid item xs={3} className={classes.sayName}>
              <Typography variant="body1">{myChild.sayName}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Avatar src={myChild.avatarUrl} className={classes.childAvatar} />
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    </div>
  );
}

ChildCard.propTypes = {
  myChild: PropTypes.object.isRequired,
  handleMyChildPage: PropTypes.func.isRequired,
};
