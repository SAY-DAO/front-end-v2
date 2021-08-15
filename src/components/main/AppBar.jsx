import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    color: 'green',
    '&$selected': {
      color: 'red',
    },
  },
  selected: {},
});

export default function FixedBottomNavigation() {
  const history = useHistory();

  const [value, setValue] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 'profile') {
      history.push('/main/profile');
    } else if (value === 'cart') {
      history.push('/main/cart');
    } else if (value === 'search') {
      history.push('/main/search');
    } else if (value === 'home') {
      history.push('/main/home');
    }
  }, [value]);

  const classes = useStyles();

  return (
    <Box>
      <CssBaseline />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction
            value="profile"
            label="home"
            sx={{
              maxWidth: value === 'profile' ? '170px' : '20px',
              backgroundColor: value === 'profile' ? '#ffdfc1' : 'transparent',
            }}
            icon={
              <img
                src={
                  value === 'profile'
                    ? '/images/appBar/profileActive.svg'
                    : '/images/appBar/profile.svg'
                }
                alt="Profile Icon"
                style={{
                  maxWidth: '25px',
                  position: 'absolute',
                  right: value === 'profile' ? 5 : 35,
                  bottom: 15,
                }}
              />
            }
          />
          <BottomNavigationAction
            value="cart"
            label="home"
            sx={{
              maxWidth: value === 'cart' ? '170px' : '20px',
              backgroundColor: value === 'cart' ? '#ffdfc1' : 'transparent',
            }}
            icon={
              <img
                src={
                  value === 'cart'
                    ? '/images/appBar/cartActive.svg'
                    : '/images/appBar/cart.svg'
                }
                alt="Cart Icon"
                style={{
                  maxWidth: '25px',
                  position: 'absolute',
                  right: value === 'cart' ? 5 : 35,
                  bottom: 15,
                }}
              />
            }
          />
          <BottomNavigationAction
            value="search"
            label="home"
            sx={{
              maxWidth: value === 'search' ? '170px' : '20px',
              backgroundColor: value === 'search' ? '#ffdfc1' : 'transparent',
            }}
            icon={
              <img
                src={
                  value === 'search'
                    ? '/images/appBar/searchActive.svg'
                    : '/images/appBar/search.svg'
                }
                alt="Search Icon"
                style={{
                  maxWidth: '25px',
                  position: 'absolute',
                  right: value === 'search' ? 5 : 35,
                  bottom: 15,
                }}
              />
            }
          />
          <BottomNavigationAction
            value="home"
            label="home"
            sx={{
              maxWidth: value === 'home' ? '170px' : '20px',
              backgroundColor: value === 'home' ? '#ffdfc1' : 'transparent',
            }}
            icon={
              <img
                src={
                  value === 'home'
                    ? '/images/appBar/homeActive.svg'
                    : '/images/appBar/home.svg'
                }
                alt="Home Icon"
                style={{
                  maxWidth: '25px',
                  position: 'absolute',
                  right: value === 'home' ? 5 : 35,
                  bottom: 15,
                }}
              />
            }
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
