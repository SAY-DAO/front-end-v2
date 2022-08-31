import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Slider,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signTransaction } from '../../actions/dao/DaoAction';
import { fetchMyHome } from '../../actions/main/homeAction';
import { fetchAlleeds } from '../../actions/needAction';
import DaoChildCard from './DaoChildCard';

const useStyles = makeStyles({
  root: {
    background: 'transparent',
    padding: '1rem',
    border: 'none !important',
    color: '#00FF80 !important',
    position: 'relative !important',
    backgroundColor: '#0c1016 !important',
  },
});

export default function DaoPortal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [gov, setGov] = useState(0);

  const myHome = useSelector((state) => state.myHome);
  const { user, children, loading: loadingHome, success: successHome } = myHome;

  const userDetails = useSelector((state) => state.userDetails);
  const { theUser, success: successUserDetails } = userDetails;

  useEffect(() => {
    if (!successHome) {
      dispatch(fetchMyHome());
    }
  }, []);

  const handleSignature = () => {
    dispatch(signTransaction(1, 'needTitle', 'needImage', 2, gov));
  };

  const handleChange = (event, newValue) => {
    setGov(newValue);
  };

  const handleClick = () => {
    dispatch(fetchAlleeds());
  };

  const classes = useStyles();

  return (
    <Grid>
      {!theUser ? (
        <CircularProgress />
      ) : (
        <Card sx={{ maxWidth: '95%', m: 'auto' }}>
          <Box
            sx={{
              width: 300,
              height: 100,
              backgroundColor: 'primary.dark',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
              textAlign: 'center',
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              sx={{ color: 'white', margin: 'auto' }}
            >
              {theUser.done_needs_count}
            </Typography>
          </Box>
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                <Typography gutterBottom variant="h5" component="div">
                  Please sign your need
                </Typography>
              </Grid>
              <Grid item>
                <Box sx={{ width: '100%' }}>
                  <Stack
                    spacing={2}
                    sx={{ mb: 1 }}
                    direction="row"
                    alignItems="center"
                  >
                    <Typography sx={{ p: 1, m: 1 }}>
                      Token {theUser.done_needs_count - gov}
                    </Typography>
                    <Slider
                      aria-label="Small"
                      defaultValue={Math.round(theUser.done_needs_count / 2)}
                      step={20}
                      marks
                      min={0}
                      max={theUser.done_needs_count}
                      sx={{
                        '& .muirtl-okr1mu-MuiSlider-thumb': {
                          transform: 'translate(-0%, -50%)',
                        },
                        m: 1,
                      }}
                      value={gov}
                      onChange={handleChange}
                    />
                    <Typography sx={{ p: 1, m: 1 }}>GOV {gov}</Typography>
                  </Stack>
                </Box>
              </Grid>

              <Grid item>
                <LoadingButton
                  onClick={handleSignature}
                  className={classes.root}
                >
                  Sign
                </LoadingButton>
              </Grid>
              <Grid item>
                <LoadingButton onClick={handleClick} className={classes.root}>
                  Fetch Needs
                </LoadingButton>
              </Grid>
            </Grid>
          </CardContent>
          <DaoChildCard />
        </Card>
      )}
    </Grid>
  );
}
