/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable prefer-destructuring */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, Grid, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import { fetchChildResult } from '../../actions/childAction';
import Message from '../../components/Message';
import VoiceBar from '../../components/searchResult/VoiceBar';
import InfoTabs from '../../components/searchResult/InfoTabs';
import Back from '../../components/Back';
import LeaveModel from '../../components/searchResult/modals/LeaveModal';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundRepeat: 'no-repeat',
    backgroundImage:
      'linear-gradient(to bottom,rgba(255, 255, 255, 0) 60%, #f7f7f7 100%),url("/images/child/background.png")',
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
    width: '100%',
    marginLeft: 2,
    marginRight: 2,
  },
});

const SearchResult = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [readMore, setReadMore] = useState(false);
  const [readLess, setReadLess] = useState(true);
  const [imageHeight, setImageHeight] = useState('375px');
  const [backIsTrue, setBackIsTrue] = useState(false);

  const childSearchResult = useSelector((state) => state.childSearchResult);
  const {
    theChild,
    loading: loadingSearchResult,
    error: errorSearchResult,
    success: successSearchResult,
  } = childSearchResult;

  useEffect(() => {
    if (!theChild) {
      try {
        let token = history.location.search;
        token = token.split('?token=')[1].split('&')[0];
        dispatch(fetchChildResult(token));
      } catch (e) {
        console.log(e);
      }
    }
  }, [theChild]);

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
  const handleBack = () => {
    // leave modal pops up
    setBackIsTrue(true);
  };

  const classes = useStyles();
  return (
    <>
      <Grid container sx={{ marginTop: 36 }}>
        <Back isOrange={false} handleClickOverride={handleBack} />

        <Grid item xs={12}>
          {theChild && theChild.sayName && (
            <>
              <div
                className={classes.root}
                style={{ minHeight: imageHeight }}
              />

              <Avatar
                className={classes.childAvatar}
                alt={`${theChild.sayName}`}
                src={theChild.avatarUrl}
              />
              <Typography className={classes.childSayName} variant="subtitle1">
                {theChild.sayName}
              </Typography>
              <Typography className={classes.childAge} variant="subtitle2">
                {getAge(theChild.birthDate) + t('assets.age')}
              </Typography>
              <Box>
                <Grid className={classes.bioSummary}>
                  <Grid sx={{ marginLeft: 6, marginRight: 6 }}>
                    <Typography variant="body2">
                      {readLess && theChild.bioSummary}
                      {readMore && theChild.bio}
                      <br />
                      <Link href="#" onClick={handleMoreOrLess}>
                        {readMore
                          ? t('assets.readMore.less')
                          : t('assets.readMore.more')}
                      </Link>
                    </Typography>
                  </Grid>

                  <Grid sx={{ marginLeft: 6, marginRight: 6 }}>
                    {theChild && <VoiceBar url={theChild.voiceUrl} />}
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 4 }}>
                    <InfoTabs />
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Grid>
        {/* Leave warn popup */}
        <LeaveModel setBackIsTrue={setBackIsTrue} backIsTrue={backIsTrue} />
      </Grid>
      <Grid item xs={10} sx={{ textAlign: 'center' }}>
        {errorSearchResult && (
          <Message
            backError={errorSearchResult}
            variant="filled"
            severity="error"
          />
        )}
      </Grid>
    </>
  );
};

export default SearchResult;
