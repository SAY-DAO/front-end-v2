import React, { useState, useEffect } from 'react';
import { Grid, Divider, Typography } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { fetchRandomChild } from '../../actions/childAction';
import Message from '../Message';

const useStyles = makeStyles({
  root: {
    // width: '100%',
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    maxHeight: '320px',
  },
});

const Search = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const childRandomSearch = useSelector((state) => state.childRandomSearch);
  const {
    theChildToken,
    loading: loadingRandomSearch,
    error: errorRandomSearch,
    success: successRandomSearch,
  } = childRandomSearch;

  const localToken = localStorage.getItem('randomChildToken');

  // loading button
  useEffect(() => {
    if (loadingRandomSearch || localToken) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingRandomSearch, localToken]);

  // when user is not logged in and try to join a virtual family, we need the token to not search new child
  useEffect(() => {
    if (successRandomSearch) {
      history.push(
        `/search-result?token=${theChildToken.token}&redirect=/main/search`
      );
    }
    if (localToken) {
      history.push(`/search-result?token=${localToken}&redirect=/main/search`);
    }
  }, [successRandomSearch, history, theChildToken]);

  const handleClick = () => {
    dispatch(fetchRandomChild());
  };
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      maxWidth
    >
      <Grid item xs={12}>
        <img
          width="100%"
          src="/images/child/searchChild.png"
          className={classes.root}
          alt="register"
        />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        item
        sx={{ direction: 'ltr' }}
      >
        <Grid item xs={2}>
          <Typography align="center" variant="subtitle1">
            {t('search.title')}
          </Typography>
          <Typography
            align="center"
            variant="body1"
            sx={{ paddingLeft: 4, paddingRight: 4 }}
          >
            {t('search.content')}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: 4 }}>
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={handleClick}
            loading={isLoading}
            sx={{ bottom: 5 }}
          >
            {t('search.randomSearch')}
          </LoadingButton>
        </Grid>
        <Divider sx={{ marginTop: 4, marginBottom: 4, width: '100%' }}>
          <Typography variant="subtitle1">{t('divider.register')}</Typography>
        </Divider>
        <Grid item xs={12} sx={{ marginTop: 2 }}>
          <LoadingButton
            variant="contained"
            color="primary"
            disabled
            sx={{ bottom: 5 }}
          >
            {t('search.brainSearch')}
          </LoadingButton>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          {errorRandomSearch && (
            <Message
              backError={errorRandomSearch}
              variant="filled"
              severity="error"
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Search;