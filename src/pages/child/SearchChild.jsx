/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Grid, Divider, Typography } from '@material-ui/core';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { fetchRandomChild } from '../../actions/childAction';
import Message from '../../components/Message';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    maxHeight: '300px',
  },
});

const SearchChild = () => {
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

  // loading button
  useEffect(() => {
    if (loadingRandomSearch) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingRandomSearch]);

  useEffect(() => {
    if (successRandomSearch) {
      history.push(`/search-result?token=${theChildToken.token}`);
    }
  }, [successRandomSearch]);

  const onClick = () => {
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
      sx={{ marginTop: 36 }}
    >
      <Grid item xs={12}>
        <img
          src="/images/searchChild.png"
          width="100%"
          style={{ paddingBottom: '20px' }}
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
            onClick={onClick}
            loading={isLoading}
            sx={{ bottom: 5 }}
          >
            {t('search.childRandomSearch')}
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

export default SearchChild;