/* eslint-disable prefer-destructuring */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Grid, Divider, Typography } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { ParallaxProvider } from 'react-scroll-parallax';
import sayBase from '../../apis/sayBase';
import { fetchChildResult } from '../../actions/childAction';
import Message from '../../components/Message';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '375px',
  },

  childAvatar: {
    width: 100,
    height: 100,
    top: '20%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#f9d6af',
    boxShadow: '4px 4px 10px rgba(0,0,0,.09)',
  },

  childSayName: {
    color: 'white',
    top: '32%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },

  childAge: {
    color: 'white',
    top: '35%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
});

const SearchResult = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const childSearchResult = useSelector((state) => state.childSearchResult);
  const {
    theChild,
    loading: loadingSearchResult,
    error: errorSearchResult,
    success: successSearchResult,
  } = childSearchResult;

  useEffect(() => {
    let token = history.location.search;
    token = token.split('?token=')[1].split('&')[0];
    dispatch(fetchChildResult(token));
  }, []);

  const getAge = (DOB) => {
    const today = new Date();
    const birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age -= 1;
    }
    return age;
  };

  const classes = useStyles();
  return (
    <Grid sx={{ marginTop: 36 }}>
      <Grid
        item
        xs={12}
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {theChild && theChild.sayName && (
          <>
            <img
              className={classes.root}
              src="/images/child/background.png"
              width="100%"
              alt="register"
            />

            <Avatar
              className={classes.childAvatar}
              alt={`${theChild.sayName}`}
              src={`https://sayapp.company${theChild.avatarUrl}`}
            />
            <Typography className={classes.childSayName} variant="subtitle1">
              {theChild.sayName}
            </Typography>
            <Typography className={classes.childAge} variant="subtitle2">
              {getAge(theChild.birthDate) + t('assets.age')}
            </Typography>
          </>
        )}
      </Grid>
      <Grid item xs={12} sx={{ textAlign: 'center' }}>
        {errorSearchResult && (
          <Message
            backError={errorSearchResult}
            variant="filled"
            severity="error"
          />
        )}
      </Grid>
    </Grid>
  );
};

export default SearchResult;
