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
import { fetchChildResult } from '../../actions/childAction';
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
          src="/images/child/background.png"
          width="100%"
          style={{ paddingBottom: '20px' }}
          className={classes.root}
          alt="register"
        />
      </Grid>
      <Grid>
        {theChild.avatarUrl && (
          <Avatar
            // alt={`${theChild.sayName}`}
            src={theChild.avatarUrl}
            sx={{ width: 56, height: 56 }}
          />
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
