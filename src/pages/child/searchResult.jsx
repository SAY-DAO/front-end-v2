import React, { useState, useEffect } from 'react';
import { Link, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import Message from '../../components/Message';
import VoiceBar from '../../components/searchResult/VoiceBar';
import InfoTabs from '../../components/searchResult/InfoTabs';
import Back from '../../components/Back';
import LeaveModel from '../../components/modals/LeaveModal';
import {
  CHILD_BY_TOKEN_RESET,
  CHILD_RANDOM_SEARCH_RESET,
} from '../../redux/constants/childConstants';
import { fetchChildByToken } from '../../redux/actions/childAction';

const SearchResult = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const qsValues = queryString.parse(search);

  const [readMore, setReadMore] = useState(false);
  const [readLess, setReadLess] = useState(true);
  const [imageHeight, setImageHeight] = useState('375px');
  const [backIsTrue, setBackIsTrue] = useState(false);
  const [invitationToken, setInvitationToken] = useState(null);
  const [searchedChild, setSearchedChild] = useState({});
  const [fromLocalStorage, setFromLocalStorage] = useState(false);
  const [isInvite, setIsInvite] = useState(false);

  const childRandomSearch = useSelector((state) => state.childRandomSearch);
  const { theChild, error: errorRandomSearch, success: successRandomSearch } = childRandomSearch;

  const childByToken = useSelector((state) => state.childByToken);
  const { child, error: errorChildByToken, success: successChildByToken } = childByToken;

  // Set invitation token if the url contains it
  useEffect(() => {
    if (qsValues.token) {
      setInvitationToken(qsValues.token || localStorage.getItem('invitationToken'));
      localStorage.setItem('invitationToken', qsValues.token);
    }
    if (!qsValues.token && localStorage.getItem('invitationToken')) {
      setFromLocalStorage(true);
    }
  }, [qsValues]);

  useEffect(() => {
    if (invitationToken) {
      dispatch(fetchChildByToken(invitationToken));
      setIsInvite(true);
    }
  }, [invitationToken]);

  useEffect(() => {
    if (successRandomSearch) {
      setSearchedChild(theChild);
    } else if (successChildByToken) {
      setSearchedChild(child);
    }
  }, [successRandomSearch, successChildByToken]);

  useEffect(() => {
    if (errorRandomSearch) {
      dispatch({ type: CHILD_RANDOM_SEARCH_RESET });
      navigate('/main/search');
    } else if (errorChildByToken) {
      dispatch({ type: CHILD_BY_TOKEN_RESET });
      navigate('/main/search');
    }
  }, [qsValues, errorChildByToken, errorRandomSearch]);

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

  return (
    <>
      <Grid container sx={{ marginTop: 36 }}>
        <Back isOrange={false} handleClickOverride={handleBack} />

        <Grid item xs={12}>
          {!successRandomSearch ? (
            <CircularProgress />
          ) : (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  backgroundRepeat: 'round',
                  backgroundImage:
                    'linear-gradient(to bottom,rgba(255, 255, 255, 0) 60%, #f7f7f7 100%),url("/images/child/background.png")',
                  minHeight: imageHeight,
                }}
              />

              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  top: '20%',
                  left: '50%',
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: '#f9d6af',
                  boxShadow: '4px 4px 10px rgba(0,0,0,.09)',
                }}
                alt={theChild.sayName}
                src={theChild.avatarUrl}
              />
              <Typography
                sx={{
                  color: 'white',
                  top: '32%',
                  left: '50%',
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                }}
                variant="subtitle1"
              >
                {theChild.sayName}
              </Typography>
              <Typography
                sx={{
                  color: 'white',
                  top: '35%',
                  left: '50%',
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                }}
                variant="subtitle2"
              >
                {getAge(theChild.birthDate) + t('assets.age')}
              </Typography>
              <Box>
                <Grid
                  sx={{
                    color: '#8c8c8c',
                    top: '40%',
                    position: 'absolute',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  <Grid sx={{ marginLeft: 6, marginRight: 6 }}>
                    <Typography variant="body2">
                      {readLess && theChild.bioSummary}
                      {readMore && theChild.bio}
                      <br />
                      <Link href="#" onClick={handleMoreOrLess}>
                        {readMore ? t('assets.readMore.less') : t('assets.readMore.more')}
                      </Link>
                    </Typography>
                  </Grid>

                  <Grid sx={{ marginLeft: 6, marginRight: 6 }}>
                    {theChild && theChild.voiceUrl && <VoiceBar url={theChild.voiceUrl} />}
                  </Grid>
                  <Grid item xs={12} sx={{ marginTop: 4 }}>
                    <InfoTabs
                      theChild={searchedChild}
                      isInvite={isInvite}
                      setIsInvite={setIsInvite}
                      invitationToken={invitationToken}
                      fromLocalStorage={fromLocalStorage}
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
          <Message backError={errorRandomSearch} variant="standard" severity="error" />
        )}
      </Grid>
    </>
  );
};

export default SearchResult;
