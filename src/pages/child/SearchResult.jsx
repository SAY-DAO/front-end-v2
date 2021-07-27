/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable prefer-destructuring */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, Grid, Typography, Box } from '@material-ui/core';
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
// import VoiceBar from '../../components/VoiceBar';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundRepeat: 'no-repeat',
    backgroundImage:
      'linear-gradient(to bottom,rgba(255, 255, 255, 0) 80%, #f7f7f7 100%),url("/images/child/background.png")',
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
  bioSummary: {
    color: '#8c8c8c',
    top: '40%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, 0%)',
    textAlign: 'center',
    width: '80%',
    marginLeft: 2,
    marginRight: 2,
  },
  moreOrLess: {
    color: '#8c8c8c',
    top: '45%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: '100%',
    marginLeft: 2,
    marginRight: 2,
  },
});

const SearchResult = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [readLess, setReadLess] = useState(true);
  const [imageHeight, setImageHeight] = useState('375px');

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

  const handleMoreOrLess = () => {
    if (readLess) {
      setImageHeight('475px');
      setReadMore(true);
      setReadLess(false);
    }
    if (readMore) {
      setImageHeight('375px');
      setReadMore(false);
      setReadLess(true);
    }
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
        <Grid item>
          {theChild && theChild.sayName && (
            <>
              <div
                className={classes.root}
                style={{ minHeight: imageHeight }}
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
              <Box onClick={handleMoreOrLess}>
                <Typography className={classes.bioSummary} variant="body2">
                  {readLess && theChild.bioSummary}
                  {readMore && theChild.bio}
                  <br />
                  <Link href="#">
                    {readMore
                      ? t('assets.readMore.less')
                      : t('assets.readMore.more')}
                  </Link>
                </Typography>
              </Box>
            </>
          )}
        </Grid>
        <Grid item sx={{ marginTop: 10 }}>
          <figure>
            <audio controls src="/media/cc0-audio/t-rex-roar.mp3">
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </figure>
        </Grid>
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
