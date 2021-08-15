import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

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

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation value={value} onChange={handleChange}>
          <BottomNavigationAction
            value="profile"
            icon={
              <img
                src={
                  value === 'profile'
                    ? '/images/appBar/profileActive.svg'
                    : '/images/appBar/profile.svg'
                }
                alt="Profile Icon"
                style={{ maxWidth: '30px', position: 'absolute' }}
              />
            }
          />
          <BottomNavigationAction
            value="cart"
            icon={
              <img
                src={
                  value === 'cart'
                    ? '/images/appBar/cartActive.svg'
                    : '/images/appBar/cart.svg'
                }
                alt="Cart Icon"
                style={{ maxWidth: '30px', position: 'absolute' }}
              />
            }
          />
          <BottomNavigationAction
            value="search"
            icon={
              <img
                src={
                  value === 'search'
                    ? '/images/appBar/searchActive.svg'
                    : '/images/appBar/search.svg'
                }
                alt="Search Icon"
                style={{ maxWidth: '30px', position: 'absolute' }}
              />
            }
          />
          <BottomNavigationAction
            value="home"
            icon={
              <img
                src={
                  value === 'home'
                    ? '/images/appBar/homeActive.svg'
                    : '/images/appBar/home.svg'
                }
                alt="Home Icon"
                style={{ maxWidth: '30px', position: 'absolute' }}
              />
            }
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
