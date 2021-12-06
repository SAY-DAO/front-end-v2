import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Avatar,
  Card,
  CardActionArea,
  AvatarGroup,
} from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useTranslation } from 'react-i18next';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';

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
  needCost: {
    fontWeight: 'normal',
    fontSize: '11px',
    color: '#f05a31',
    marginBottom: '2px',
    marginTop: '4px',
  },
  needName: {
    // textAlign: 'right',
    padding: 5,
    marginTop: '5px',
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

export default function NeedCard({ need, handleNeedCardClick, childId }) {
  const { t } = useTranslation();

  const [inCart, setInCart] = useState(false);

  const cartItems = localStorage.getItem('SAY-cartItems')
    ? JSON.parse(localStorage.getItem('SAY-cartItems'))
    : [];

  useEffect(() => {
    if (cartItems[0]) {
      for (let i = 0; i < cartItems.length; i += 1) {
        if (cartItems[i].needId === need.id) {
          console.log(inCart);
          setInCart(true);
        }
      }
    }
  }, [need]);

  const classes = useStyles();
  return (
    <Card elevation={3} className={classes.theCard}>
      <CardActionArea
        className={classes.actionArea}
        onClick={() => handleNeedCardClick(need.id, childId)}
      >
        <Grid container item direction="row" justifyContent="space-between">
          <Grid item xs={2}>
            <Avatar src={need.imageUrl} className={classes.imageUrl} />
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="subtitle2" className={classes.needName}>
                {need.name}
              </Typography>
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
          <Grid
            container
            item
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            xs={3}
          >
            <Grid item container direction="column" sx={{ display: 'flex' }}>
              <Grid item xs>
                <AvatarGroup
                  max={3}
                  sx={{ margin: 'auto', direction: 'ltr !important' }}
                >
                  {need.participants.map((user, index) => (
                    <Avatar
                      key={index}
                      alt="user image"
                      src={user.user_avatar}
                      sx={{
                        border: '1px solid #968c8c !important',
                      }}
                    />
                  ))}
                </AvatarGroup>
              </Grid>
              <Grid item>
                {!need.isDone ? (
                  <Typography variant="body1" className={classes.needCost}>
                    {!inCart && !need.unpayable
                      ? need.cost.toLocaleString() + t('currency.toman')
                      : !inCart && '-'}
                    {inCart && (
                      <CheckCircleOutlineSharpIcon
                        sx={{ color: '#4caf50', opacity: '0.9' }}
                      />
                    )}
                  </Typography>
                ) : (
                  <Typography variant="body1" className={classes.needCost}>
                    {need.cost.toLocaleString() + t('currency.toman')}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

NeedCard.propTypes = {
  need: PropTypes.object.isRequired,
  childId: PropTypes.number.isRequired,
  handleNeedCardClick: PropTypes.func.isRequired,
};
