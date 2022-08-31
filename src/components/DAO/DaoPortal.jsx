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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signTransaction } from '../../redux/actions/dao/DaoAction';
import { fetchMyHome } from '../../redux/actions/main/homeAction';
import { fetchAlleeds } from '../../redux/actions/needAction';
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

  const handleMyChildPage = (child) => {
    // navigate(`/child/${child.id}`);
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
          <Grid
            item
            xs={12}
            sx={{ marginTop: 3, textAlign: 'center', width: '100%' }}
          >
            {children &&
              children.map((child) => (
                <DaoChildCard
                  key={child.id}
                  myChild={child}
                  handleMyChildPage={handleMyChildPage}
                />
              ))}
          </Grid>
        </Card>
      )}
    </Grid>
  );
}
