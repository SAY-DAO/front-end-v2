import React, { useEffect } from 'react';
import {
  Grid,
  Typography,
  CircularProgress,
  Avatar,
  Box,
  Card,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import Back from '../components/Back';
import Message from '../components/Message';
import { fetchChildOneNeed } from '../actions/childAction';

const useStyles = makeStyles({
  root: {
    top: 0,
    left: 0,
    right: 0,
    minHeight: '290px',
    backgroundRepeat: 'no-repeat',
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
    textAlign: 'center',
    width: '100%',
    marginLeft: 2,
    marginRight: 2,
  },
  progressBar: {
    width: '100%',
    margin: 2,
  },
  percentage: {
    color: '#f05a31',
    fontWeight: 500,
    fontSize: '12px',
  },
  theCard1: {
    margin: 1,
    width: '75%',
    textAlign: 'center',
    padding: 5,
    // marginLeft: 20,
    // marginRight: 20,
    borderRadius: 5,
  },
  theCard2: {
    textAlign: 'center',
    width: '23%',
    padding: 5,
    // marginLeft: 20,
    // marginRight: 20,
    borderRadius: 5,
  },
});

export default function NeedPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { childId, needId } = useParams();

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
    if (!successOneNeed && needId) {
      dispatch(fetchChildOneNeed(needId));
    }
  }, [successOneNeed, needId]);

  // In case the child is not in the state
  useEffect(() => {
    if (!theChild) {
      history.push('/main/dashboard');
    }
  }, [theChild, history]);

  const classes = useStyles();
  return (
    <>
      {loadingOneNeed ? (
        <CircularProgress />
      ) : (
        <Grid container direction="column">
          {oneNeed && (
            <>
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
                    <Typography
                      className={classes.needName}
                      variant="subtitle1"
                    >
                      {oneNeed.name}
                    </Typography>
                    <Typography className={classes.sayName} variant="subtitle2">
                      {theChild.sayName}
                    </Typography>

                    <Box>
                      <Grid className={classes.needDesc}>
                        <Grid
                          sx={{
                            marginLeft: 3,
                            marginRight: 3,
                          }}
                        >
                          {theChild && (
                            <Grid item container sx={{ marginTop: 2 }}>
                              <Grid item sx={{ margin: 'auto' }}>
                                <Typography variant="body1">
                                  {oneNeed.description}
                                </Typography>
                              </Grid>
                              <Grid item container sx={{ marginTop: 4 }}>
                                <Card
                                  className={classes.theCard2}
                                  elevation={1}
                                >
                                  <Grid item xs={2}>
                                    <Typography className={classes.percentage}>
                                      %{oneNeed.progress}
                                    </Typography>
                                  </Grid>
                                </Card>
                                <Card className={classes.theCard1}>
                                  <Grid item xs={10} sx={{ margin: 'auto' }}>
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
                                          {oneNeed.cost.toLocaleString() +
                                            t('currency.toman')}
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
                                          {oneNeed.paid.toLocaleString() +
                                            t('currency.toman')}
                                        </Typography>
                                      </Grid>
                                    </Grid>

                                    <LinearProgress
                                      variant="determinate"
                                      value={Number(oneNeed.progress)}
                                      className={classes.progressBar}
                                    />
                                  </Grid>
                                </Card>
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                        <Grid item xs={12} sx={{ marginTop: 4 }}>
                          hi
                        </Grid>
                      </Grid>
                    </Box>
                  </>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      )}
      <Grid item xs={10} sx={{ textAlign: 'center' }}>
        {errorOneNeed && (
          <Message backError={errorOneNeed} variant="filled" severity="error" />
        )}
      </Grid>
    </>
  );
}
