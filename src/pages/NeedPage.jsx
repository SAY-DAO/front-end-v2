import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  CircularProgress,
  Avatar,
  Box,
  Divider,
  Checkbox,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Back from '../components/Back';
import Message from '../components/Message';
import { fetchChildOneNeed } from '../actions/childAction';
import NeedPageTop from '../components/need/NeedPageTop';
import NeedPageProduct from '../components/need/NeedPageProduct';

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
});

export default function NeedPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { childId, needId } = useParams();

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
                    <Grid container className={classes.needDesc}>
                      <Grid
                        sx={{
                          marginLeft: 3,
                          marginRight: 3,
                        }}
                      >
                        <NeedPageTop oneNeed={oneNeed} />
                      </Grid>
                      <Grid
                        item
                        container
                        direction="row"
                        sx={{ marginTop: 5, padding: 2, textAlign: 'center' }}
                      >
                        <Grid item xs={3}>
                          <Typography variant="subtitle2">
                            {t('needPage.needInfo')}
                          </Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Divider sx={{ width: '95%', margin: 1 }} />
                        </Grid>
                      </Grid>
                      <Grid item>
                        <NeedPageProduct oneNeed={oneNeed} />
                      </Grid>
                      <Grid
                        item
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ marginTop: 5, padding: 2, textAlign: 'center' }}
                      >
                        <Grid item xs={3}>
                          <Typography variant="subtitle2">
                            {t('needPage.payTitle')}
                          </Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Divider sx={{ width: '95%' }} />
                        </Grid>
                      </Grid>
                      <Grid item sx={{ margin: 1 }}>
                        <Typography variant="body2">
                          {t('needPage.payContent')}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Checkbox
                          checked={checked}
                          onChange={handleChange}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <Typography variant="subtitle2">
                          {t('needPage.payAll')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              </Grid>
            </Grid>
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
