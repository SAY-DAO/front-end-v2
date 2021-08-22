import React, { useState, useEffect } from 'react';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import Message from '../../Message';
import MyChildTabs from './MyChildTabs';
import { fetchMyChildById } from '../../../actions/childAction';
import Back from '../../Back';

const useStyles = makeStyles({
  root: {
    top: 0,
    left: 0,
    right: 0,
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url("/images/child/background.png")',
    margin: 0,
    padding: 0,
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
});

const MyChildPage = ({ setContent, myChildId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [readMore, setReadMore] = useState(false);
  const [readLess, setReadLess] = useState(true);

  const myChild = useSelector((state) => state.myChild);
  const {
    theChild,
    loading: loadingMyChild,
    error: errorSearchResult,
    success: successMyChild,
  } = myChild;

  useEffect(() => {
    if (!successMyChild) {
      dispatch(fetchMyChildById(myChildId));
    }
  }, [successMyChild]);

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

  const classes = useStyles();
  return (
    <>
      {loadingMyChild ? (
        <CircularProgress />
      ) : (
        <Grid container direction="column">
          <Grid item xs={12} className={classes.root}>
            <Back
              isOrange={false}
              to="/main/dashboard"
              handleClickOverride={() => setContent('dashboard')}
            />
            <Grid item xs={12}>
              {theChild && theChild.sayName && (
                <>
                  <div style={{ minHeight: '250px' }} />

                  <Avatar
                    className={classes.childAvatar}
                    alt={`${theChild.sayName}`}
                    src={theChild.avatarUrl}
                  />
                  <Typography
                    className={classes.childSayName}
                    variant="subtitle1"
                  >
                    {theChild.sayName}
                  </Typography>
                  <Typography className={classes.childAge} variant="subtitle2">
                    {getAge(theChild.birthDate) + t('assets.age')}
                  </Typography>
                </>
              )}
            </Grid>
          </Grid>
          <Grid sx={{ maxWidth: '100% !important' }}>
            {theChild && <MyChildTabs theChild={theChild} />}
          </Grid>
        </Grid>
      )}
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
  myChildId: PropTypes.number,
};
