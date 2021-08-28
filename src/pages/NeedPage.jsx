import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  CircularProgress,
  Avatar,
  Box,
  Card,
  Divider,
  CardContent,
  CardMedia,
  Skeleton,
  Checkbox,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
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
    padding: '10px',
  },
  theCard1: {
    margin: 1,
    width: '75%',
    textAlign: 'center',
    padding: 5,

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

  const [imageSkeleton, setImageSkeleton] = useState(true);
  const [checked, setChecked] = React.useState(true);

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

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

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
                      <Grid container className={classes.needDesc}>
                        <Grid
                          sx={{
                            marginLeft: 3,
                            marginRight: 3,
                          }}
                        >
                          {theChild && (
                            <Grid item container sx={{ marginTop: 2 }}>
                              <Grid
                                item
                                sx={{ margin: 'auto', textAlign: 'center' }}
                              >
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
                        <Grid
                          item
                          container
                          direction="row"
                          sx={{ marginTop: 5, padding: 2, textAlign: 'center' }}
                        >
                          <Grid item xs={9}>
                            <Divider sx={{ width: '95%', margin: 1 }} />
                          </Grid>
                          <Grid item xs={3}>
                            <Typography variant="subtitle2">
                              {t('needPage.needInfo')}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Card
                            sx={{
                              display: 'flex',
                              marginLeft: 2,
                              marginRight: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography
                                  variant="subtitle2"
                                  sx={{ minWidth: '150px' }}
                                >
                                  {oneNeed.title}
                                </Typography>
                                <Typography variant="subtitle2">
                                  {oneNeed.cost}
                                </Typography>
                              </CardContent>
                            </Box>
                            <Skeleton
                              sx={
                                imageSkeleton
                                  ? {
                                      width: 100,
                                      height: 100,
                                      margin: 1,
                                    }
                                  : {
                                      display: 'none',
                                    }
                              }
                            />
                            <CardMedia
                              component="img"
                              sx={
                                imageSkeleton
                                  ? {
                                      display: 'none',
                                    }
                                  : {
                                      width: 100,
                                    }
                              }
                              image={oneNeed.img}
                              alt="Need image"
                              onLoad={() => setImageSkeleton(false)}
                            />
                          </Card>
                        </Grid>
                        <Grid
                          item
                          container
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ marginTop: 5, padding: 2, textAlign: 'center' }}
                        >
                          <Grid item xs={9}>
                            <Divider sx={{ width: '95%' }} />
                          </Grid>
                          <Grid item xs={3}>
                            <Typography variant="subtitle2">
                              {t('needPage.payTitle')}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item sx={{ margin: 1 }}>
                          <Typography variant="body2">
                            {t('needPage.payContent')}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Checkbox
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
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
