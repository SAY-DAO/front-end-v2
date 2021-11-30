/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Grid, Typography, Avatar, Box, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Back from '../Back';
import Message from '../Message';
import NeedPageTop from './NeedPageTop';
import NeedStepper from './NeedStepper';
import { CHILD_ONE_NEED_RECEIPT_RESET } from '../../constants/childConstants';
import NeedParticipants from './NeedParticipants';
import { SHAPARAK_RESET } from '../../constants/paymentConstants';
import { fetchChildNeeds } from '../../actions/childAction';

const useStyles = makeStyles({
  root: {
    top: 0,
    left: 0,
    right: 0,
    minHeight: '290px',
    backgroundRepeat: 'round',
    backgroundImage:
      'linear-gradient(to bottom,rgba(255, 255, 255, 0) 80%, #f7f7f7 100%),url("/images/child/background.png")',
    margin: 0,
    padding: 0,
  },

  needAvatar: {
    width: 100,
    height: 100,
    top: '20%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f9d6af',
    boxShadow: '4px 4px 10px rgba(0,0,0,.09)',
  },
  needName: {
    color: 'white',
    top: '31%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
  sayName: {
    color: 'white',
    top: '34%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
  needDesc: {
    color: '#8c8c8c',
    top: '40%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, 0%)',
    width: '100%',
    marginLeft: 2,
    marginRight: 2,
  },
});

export default function NeedDone({ childId }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const myChild = useSelector((state) => state.myChild);
  const { theChild } = myChild;

  const ChildOneNeed = useSelector((state) => state.ChildOneNeed);
  const {
    oneNeed,
    loading: loadingOneNeed,
    error: errorOneNeed,
    success: successOneNeed,
  } = ChildOneNeed;

  useEffect(() => {
    dispatch({ type: CHILD_ONE_NEED_RECEIPT_RESET });
    dispatch({ type: SHAPARAK_RESET });
  }, [dispatch]);

  // loading button
  useEffect(() => {
    if (loadingOneNeed) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingOneNeed]);

  // disable button
  useEffect(() => {
    if (successOneNeed) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [successOneNeed]);

  // When payment is done we land here with an interval from NeedAvailable.jsx
  useEffect(() => {
    if (theChild) {
      dispatch(fetchChildNeeds(theChild.id));
    }

    // clear all intervals
    // Get a reference to the last interval + 1
    const intervalId = window.setInterval(function () {},
    Number.MAX_SAFE_INTEGER);

    // Clear any timeout/interval up to that id
    for (let i = 1; i < intervalId; i += 1) {
      window.clearInterval(i);
    }
  }, [theChild]);

  const classes = useStyles();
  return (
    <>
      <Grid container direction="column">
        {!isLoading && oneNeed && theChild && (
          <Grid item xs={12} className={classes.root}>
            <Back isOrange={false} to={`/child/${childId}`} />
            <Grid item xs={12}>
              <>
                <div style={{ minHeight: '350px' }} />

                <Avatar
                  className={classes.needAvatar}
                  alt={`${oneNeed.sayName}`}
                  src={oneNeed.imageUrl}
                />
                <Typography className={classes.needName} variant="subtitle1">
                  {oneNeed.name}
                </Typography>
                <Typography className={classes.sayName} variant="subtitle2">
                  {theChild.sayName}
                </Typography>

                <Box>
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.needDesc}
                  >
                    <Grid
                      item
                      sx={{
                        marginLeft: 3,
                        marginRight: 3,
                        marginBottom: 8,
                      }}
                    >
                      <NeedPageTop oneNeed={oneNeed} />
                    </Grid>
                    <Grid item>
                      <NeedStepper oneNeed={oneNeed} />
                    </Grid>
                    <Grid
                      item
                      container
                      direction="row"
                      sx={{ marginTop: 5, padding: 2 }}
                    >
                      <Grid item xs={3}>
                        <Typography variant="subtitle2">
                          {t('needPage.participants.title')}
                        </Typography>
                      </Grid>
                      <Grid item xs={9}>
                        <Divider sx={{ width: '95%', margin: 1 }} />
                      </Grid>
                    </Grid>
                    <NeedParticipants participants={oneNeed.participants} />
                  </Grid>
                </Box>
              </>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={10} sx={{ textAlign: 'center' }}>
        {errorOneNeed && (
          <Message
            backError={errorOneNeed}
            variant="standard"
            severity="error"
          />
        )}
      </Grid>
    </>
  );
}

NeedDone.propTypes = {
  childId: PropTypes.string,
};
