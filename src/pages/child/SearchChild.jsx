import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { fetchRandomChild } from '../../actions/childAction';
import Message from '../../components/Message';
import AppBarBottom from '../../components/main/AppBarBottom';
import { CHILD_RANDOM_SEARCH_RESET } from '../../constants/childConstants';

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

const SearchChild = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const childRandomSearch = useSelector((state) => state.childRandomSearch);
  const {
    loading: loadingRandomSearch,
    error: errorRandomSearch,
    success: successRandomSearch,
  } = childRandomSearch;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  useEffect(() => {
    dispatch({ type: CHILD_RANDOM_SEARCH_RESET });

    if (!userInfo && !successLogin) {
      history.push('/login?redirect=main/search');
    }
  }, [userInfo, successLogin, history, dispatch]);

  // loading button
  useEffect(() => {
    if (loadingRandomSearch) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loadingRandomSearch]);

  // when user is not logged in and try to join a virtual family, we need the token to not search new child
  useEffect(() => {
    if (successRandomSearch) {
      history.push(`/search-result`);
    }
  }, [successRandomSearch, history]);

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
      sx={{
        margin: 'auto',
        paddingLeft: '10px !important',
        paddingRight: '10px !important',
        paddingBottom: 10,
      }}
      maxWidth="lg"
    >
      <Grid item xs={12}>
        <img
          width="100%"
          src="/images/child/searchChild.png"
          className={classes.root}
          alt="searchChild"
        />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        item
        spacing={1}
      >
        <Grid item xs={12}>
          <Typography align="center" variant="subtitle1">
            {t('search.title')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
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
            {t('search.randomSearch')}
          </LoadingButton>
        </Grid>
        {/* <Divider sx={{ marginTop: 4, marginBottom: 4, width: '100%' }}>
          <Typography variant="subtitle1">{t('divider.register')}</Typography>
        </Divider> */}
        {/* <Grid item xs={12} sx={{ marginTop: 2 }}>
          <LoadingButton
            variant="contained"
            color="primary"
            disabled
            sx={{ bottom: 5 }}
          >
            {t('search.brainSearch')}
          </LoadingButton>
        </Grid> */}
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          {errorRandomSearch && (
            <Message
              backError={errorRandomSearch}
              variant="standard"
              severity="error"
            />
          )}
        </Grid>
      </Grid>
      <AppBarBottom path="search" />
    </Grid>
  );
};

export default SearchChild;
