/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable prefer-destructuring */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, Grid, Typography, Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import Message from './Message';
import VoiceBar from './searchResult/VoiceBar';
import InfoTabs from './searchResult/InfoTabs';
import Back from './Back';

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

const MyChildPage = ({ setContent }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

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
    <>
      <Grid container sx={{ marginTop: 36 }}>
        <Back
          to="/main/dashboard"
          handleClickOverride={() => setContent('dashboard')}
          isOrange
        />

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
                src={`https://sayapp.company${theChild.avatarUrl}`}
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
                    {theChild && (
                      <VoiceBar
                        className={classes.voice}
                        url={theChild.voiceUrl}
                        status="PAUSED"
                        autoLoad={false}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 4 }}>
                    <InfoTabs />
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </Grid>
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

export default MyChildPage;

MyChildPage.propTypes = {
  setContent: PropTypes.func,
};
