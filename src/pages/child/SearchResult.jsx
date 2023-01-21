import React, { useState, useEffect } from 'react';
import { Link, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import { useHistory, useLocation } from 'react-router';
import queryString from 'query-string';
import Message from '../../components/Message';
import VoiceBar from '../../components/searchResult/VoiceBar';
import InfoTabs from '../../components/searchResult/InfoTabs';
import Back from '../../components/Back';
import LeaveModel from '../../components/modals/LeaveModal';
import { CHILD_RANDOM_SEARCH_RESET } from '../../constants/childConstants';
import { fetchUserDetails } from '../../actions/userAction';
import { fetchChildByToken } from '../../actions/childAction';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundRepeat: 'round',
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
  const { search } = useLocation();
  const qsValues = queryString.parse(search);

  const [readMore, setReadMore] = useState(false);
  const [readLess, setReadLess] = useState(true);
  const [imageHeight, setImageHeight] = useState('375px');
  const [backIsTrue, setBackIsTrue] = useState(false);
  const [invitationToken, setInvitationToken] = useState(null);
  const [searchedChild, setSearchedChild] = useState({});

  const childRandomSearch = useSelector((state) => state.childRandomSearch);
  const {
    theChild,
    error: errorRandomSearch,
    success: successRandomSearch,
  } = childRandomSearch;

  const childByToken = useSelector((state) => state.childByToken);
  const {
    child,
    error: errorChildByToken,
    success: successChildByToken,
  } = childByToken;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: errorUserDetails } = userDetails;

  useEffect(() => {
    if (qsValues.token) {
      setInvitationToken(qsValues.token);
      console.log('there is a token');
    } else {
      console.log('there is noo token');
    }
  }, []);

  useEffect(() => {
    if (invitationToken) {
      dispatch(fetchChildByToken(invitationToken));
    }
  }, [invitationToken]);

  // login
  useEffect(() => {
    dispatch(fetchUserDetails());
    if (errorUserDetails) {
      history.push(`/login?redirect=search-result`);
    }
  }, [userInfo, successLogin, errorUserDetails]);

  useEffect(() => {
    if (!successRandomSearch && !qsValues.token) {
      dispatch({ type: CHILD_RANDOM_SEARCH_RESET });
      history.push('/main/search');
    } else if (successRandomSearch) {
      setSearchedChild(theChild);
      console.log('success random');
    } else if (successChildByToken) {
      setSearchedChild(child);
      console.log('success by token');
    }
  }, [successRandomSearch, successChildByToken, qsValues]);

  // child age
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

  // child story more/less
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
          {!successRandomSearch && !successChildByToken ? (
            <CircularProgress />
          ) : (
            <>
              <div
                className={classes.root}
                style={{ minHeight: imageHeight }}
              />

              <Avatar
                className={classes.childAvatar}
                alt={`${searchedChild.sayName}`}
                src={searchedChild.avatarUrl}
              />
              <Typography className={classes.childSayName} variant="subtitle1">
                {searchedChild.sayName}
              </Typography>
              <Typography className={classes.childAge} variant="subtitle2">
                {getAge(searchedChild.birthDate) + t('assets.age')}
              </Typography>
              <Box>
                <Grid className={classes.bioSummary}>
                  <Grid sx={{ marginLeft: 6, marginRight: 6 }}>
                    <Typography variant="body2">
                      {readLess && searchedChild.bioSummary}
                      {readMore && searchedChild.bio}
                      <br />
                      <Link href="#" onClick={handleMoreOrLess}>
                        {readMore
                          ? t('assets.readMore.less')
                          : t('assets.readMore.more')}
                      </Link>
                    </Typography>
                  </Grid>

                  <Grid sx={{ marginLeft: 6, marginRight: 6 }}>
                    {searchedChild && searchedChild.voiceUrl && (
                      <VoiceBar url={searchedChild.voiceUrl} />
                    )}
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 4 }}>
                    <InfoTabs
                      theChild={searchedChild}
                      isInvite={Boolean(invitationToken)}
                    />
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
        {errorRandomSearch && (
          <Message
            backError={errorRandomSearch}
            variant="standard"
            severity="error"
          />
        )}
      </Grid>
    </>
  );
};

export default SearchResult;
