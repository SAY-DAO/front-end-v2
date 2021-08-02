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
import { fetchChildResult } from '../../actions/childAction';
import Message from '../../components/Message';
import VoiceBar from '../../components/searchResult/VoiceBar';
import InfoTabs from '../../components/searchResult/InfoTabs';
import roles from '../../apis/roles';

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

  const [userRole, setUserRole] = useState();
  const [isGone, setIsGone] = useState(false);
  const [childId, setChildId] = useState('');
  const [familyId, setFamilyId] = useState('');
  const [family, setFamily] = useState([]);
  const [currentMember, setCurrentMember] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [readLess, setReadLess] = useState(true);
  const [imageHeight, setImageHeight] = useState('375px');
  const [previousRole, setPreviousRole] = useState();
  const [warnText, setWarnText] = useState('');
  const [childName, setChildName] = useState('');
  const [rolesRelative, setRolesRelative] = useState();
  const [backToPrevRoleIsOpen, setBackToPrevRoleIsOpen] = useState();
  const [backToPrevRole, setBackToPrevRole] = useState(false);
  const [adoptPopupIsOpen, setAdoptPopupIsOpen] = useState();
  const [isFather, setIsFather] = useState(false);
  const [isMother, setIsMother] = useState(false);
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [alreadyInFamily, setAlreadyInFamily] = useState(false);

  const childSearchResult = useSelector((state) => state.childSearchResult);
  const {
    theChild,
    loading: loadingSearchResult,
    error: errorSearchResult,
    success: successSearchResult,
  } = childSearchResult;

  useEffect(() => {
    if (theChild) {
      setFamily(theChild.childFamilyMembers);
      setUserRole(theChild.userRole);
      const userId = JSON.parse(localStorage.getItem('userInfo')).user.id;
      if (family) {
        for (let f = 0; f < family.length; f += 1) {
          const member = family[f];
          if (member.isDeleted) {
            if (member.user_id !== null) {
              if (member.user_id === userId) {
                setPreviousRole(member.role);
              }

              if (userRole !== null && userRole !== previousRole) {
                setBackToPrevRole(true);
              }
            }
          }
          currentMember.push(member);

          if (member.role === 0) {
            setFather(member.username);
            setIsFather(true);
          }

          if (member.role === 1) {
            setIsMother(true);
            setMother(member.username);
          }

          if (userId && userId === member.user_id) {
            setAlreadyInFamily(true);
          }
        }
      }
    }
  }, [theChild]);

  useEffect(() => {
    if (!theChild) {
      let token = history.location.search;
      token = token.split('?token=')[1].split('&')[0];
      dispatch(fetchChildResult(token));
    }
    if (theChild) {
      if (theChild.userRole === 0) {
        setIsFather(true);
      }
      if (theChild.userRole === 1) {
        setIsMother(true);
      }
    }
    return () => {
      setIsFather(false);
      setIsMother(false);
    };
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

  const openPopup = (r) => {
    console.log(r);
    if (previousRole !== null && r !== previousRole) {
      setPreviousRole(roles[previousRole]);
      setWarnText(t('error.adoption.backToPrevRole'));
      setChildName(theChild.sayName);
      setRolesRelative(roles.rolesRelative[previousRole]);
    }
  };

  const classes = useStyles();
  return (
    <>
      <Grid container sx={{ marginTop: 36 }}>
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
                    <InfoTabs
                      theChild={theChild}
                      openPopup={openPopup}
                      father={father}
                      mother={mother}
                      isMother={isMother}
                      isFather={isFather}
                    />
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

export default SearchResult;
