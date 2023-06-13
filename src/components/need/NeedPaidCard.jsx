import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Avatar,
  AvatarGroup,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';
import FlipIcon from '@mui/icons-material/Flip';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import NeedStepper from './NeedStepper';
import { fetchChildOneNeed } from '../../redux/actions/childAction';
import {
  connectWallet,
  signTransaction,
} from '../../redux/actions/main/daoAction';

const useStyles = makeStyles(() => ({
  imageUrl: {
    width: 45,
    height: 45,
    backgroundColor: '#FDE1C1',
    margin: 'auto',
  },
  needCost: {
    fontWeight: 'normal',
    fontSize: '11px',
    color: '#f05a31',
    marginBottom: '2px',
    marginTop: '4px',
  },
  needName: {
    padding: 5,
    marginTop: '5px',
  },
  actionArea: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
  progressBar: {
    marginTop: '5px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  percentage: {
    color: '#f05a31',
    fontWeight: 500,
    fontSize: '12px',
  },
}));

export default function NeedPaidCard({ need }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [flip, setFlip] = useState(false);
  const [needId, setNeedId] = useState();

  const wallet = useSelector((state) => state.wallet);
  const { myWallet, loading: loadingWallet } = wallet;

  const childOneNeed = useSelector((state) => state.childOneNeed);
  const { oneNeed, loading: loadingOneNeed } = childOneNeed;

  useEffect(() => {
    if (myWallet && needId) {
      dispatch(signTransaction(needId));
    }
  }, [needId, myWallet]);

  const handleFlip = (theNeed) => {
    setFlip(!flip);
    setNeedId(theNeed.id);
  };

  const handleVFamilySignature = (theNeed) => {
    dispatch(connectWallet());
    setNeedId(theNeed.id);
  };

  const classes = useStyles();
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div className={`card ${flip ? 'flip' : ''}`}>
      {need && (
        <Grid
          container
          item
          direction="row"
          justifyContent="space-between"
          className="front"
        >
          <Grid item xs={2}>
            <Avatar src={need.imageUrl} className={classes.imageUrl} />
          </Grid>
          <Grid
            item
            xs={6}
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item>
              <Typography variant="subtitle2" className={classes.needName}>
                {need.name}
              </Typography>
            </Grid>
            <Grid item container direction="row">
              <Grid item xs={10}>
                <LinearProgress
                  variant="determinate"
                  value={need && parseInt(need.progress)}
                  className={classes.progressBar}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle2" className={classes.percentage}>
                  %{need.progress}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            xs={3}
          >
            <Grid item container direction="column" sx={{ display: 'flex' }}>
              <Grid item xs>
                <AvatarGroup
                  max={3}
                  sx={{ margin: 'auto', direction: 'ltr !important' }}
                >
                  {need.participants.map((user, index) => (
                    <Avatar
                      key={index}
                      alt="user image"
                      src={user.user_avatar}
                      sx={{
                        border: '1px solid #968c8c !important',
                      }}
                    />
                  ))}
                </AvatarGroup>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignContent="flex-start"
            textAlign="left"
            sx={{ p: 1 }}
          >
            <Grid item xs={12}>
              <Typography component="span">
                <strong>وضعیت</strong>
              </Typography>
              <Typography component="span">: خرید شده</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="span">
                <strong>زمان رسیدن</strong>
              </Typography>
              <Typography component="span">: 1 mehr</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography component="span">
                <strong> SAY همراهی</strong>
              </Typography>
              <Typography component="span">: 1000 T</Typography>
            </Grid>
          </Grid>
          <LoadingButton
            sx={{ m: 'auto' }}
            variant="outlined"
            color="secondary"
            onClick={() => handleVFamilySignature(need)}
          >
            Sign
          </LoadingButton>
        </Grid>
      )}
      <div className="back">
        <Grid container>
          <Grid item>
            <NeedStepper oneNeed={oneNeed} />
          </Grid>
        </Grid>
      </div>
      {loadingOneNeed ? (
        <CircularProgress size="small" />
      ) : (
        <IconButton
          onClick={() => handleFlip(need)}
          sx={{ position: 'absolute', bottom: 0, right: 0 }}
        >
          <FlipIcon />
        </IconButton>
      )}
    </div>
  );
}

NeedPaidCard.propTypes = {
  need: PropTypes.object.isRequired,
};
