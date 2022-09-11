import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { fetchRandomChild } from '../../redux/actions/childAction';
import Message from '../../components/Message';

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
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [family, setFamily] = useState();

  const childRandomSearch = useSelector((state) => state.childRandomSearch);
  const {
    theChild,
    theToken,
    loading: loadingRandomSearch,
    error: errorRandomSearch,
    success: successRandomSearch,
  } = childRandomSearch;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    theUser,
    success: successUserDetails,
    error: errorUserDetails,
  } = userDetails;

  // login
  useEffect(() => {
    if (errorUserDetails) {
      navigate('/auth/login?redirect=main/search');
    }
  }, [theUser, successUserDetails, errorUserDetails, dispatch]);

  // to check wether the child is already adopted by user
  useEffect(() => {
    if (successRandomSearch) {
      const myList = [];
      setFamily(theChild.childFamilyMembers);
      if (family && theUser) {
        for (let f = 0; f < family.length; f += 1) {
          const member = family[f];
          if (!member.isDeleted) {
            myList.push(member.member_id);
          }
        }
        console.log(theChild.sayName);
        console.log(family);
        if (myList[0] && myList.includes(theUser.id)) {
          setFamily(null);
          dispatch(fetchRandomChild());
        } else {
          navigate(`/child/search-result?=${theToken}`);
          setIsLoading(false);
        }
      }
    }
  }, [family, theChild, successRandomSearch]);

  const onClick = () => {
    setIsLoading(true);
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
    </Grid>
  );
};

export default SearchChild;
