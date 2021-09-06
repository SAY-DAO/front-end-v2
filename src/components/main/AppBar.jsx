import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from '@material-ui/core/Paper';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    '& .Mui-selected': {
      position: 'absolute',
    },
  },
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
    color: 'white',
  },
}));

export default function FixedBottomNavigation() {
  const { t } = useTranslation();
  const history = useHistory();

  const [value, setValue] = useState('home');
  const [badgeNumber, setBadgeNumber] = useState();

  const theCart = useSelector((state) => state.theCart);
  const { cartItems } = theCart;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // cart badge number
  useEffect(() => {
    if (cartItems) {
      setBadgeNumber(cartItems.length);
    }
  }, [cartItems]);

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
  }, [value, history]);

  const classes = useStyles();
  return (
    <Box>
      <CssBaseline />
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          pt: 1,
          pb: 1,
        }}
        elevation={0}
      >
        <BottomNavigation
          value={value}
          onChange={handleChange}
          sx={{ height: '45px' }}
        >
          <BottomNavigationAction
            value="home"
            className={classes.root}
            label={t('userLayout.home')}
            sx={{
              maxWidth: value === 'home' ? '180px' : '25px',
              minWidth: '60px',
              borderRadius: '25px',
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
                  maxWidth: '22px',
                  position: 'absolute',
                  right: value === 'home' ? 8 : 35,
                  bottom: 10,
                }}
              />
            }
          />
          <BottomNavigationAction
            value="cart"
            className={classes.root}
            label={t('userLayout.cart')}
            sx={{
              maxWidth: value === 'cart' ? '180px' : '25px',
              minWidth: '65px',
              borderRadius: '25px',
              backgroundColor: value === 'cart' ? '#ffdfc1' : 'transparent',
            }}
            icon={
              <StyledBadge
                badgeContent={badgeNumber}
                color="primary"
                style={{
                  position: 'absolute',
                  right: value === 'cart' ? 8 : 32,
                  bottom: 10,
                }}
              >
                <img
                  src={
                    value === 'cart'
                      ? '/images/appBar/cartActive.svg'
                      : '/images/appBar/cart.svg'
                  }
                  alt="Cart Icon"
                  style={{
                    maxWidth: '22px',
                  }}
                />
              </StyledBadge>
            }
          />
          <BottomNavigationAction
            value="search"
            className={classes.root}
            label={t('userLayout.search')}
            sx={{
              maxWidth: value === 'search' ? '180px' : '25px',
              minWidth: '60px',
              borderRadius: '25px',
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
                  maxWidth: '22px',
                  position: 'absolute',
                  right: value === 'search' ? 8 : 35,
                  bottom: 10,
                }}
              />
            }
          />
          <BottomNavigationAction
            value="profile"
            label={t('userLayout.profile')}
            className={classes.root}
            sx={{
              maxWidth: value === 'profile' ? '180px' : '2px',
              minWidth: '70px',
              borderRadius: '25px',
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
                  maxWidth: '22px',
                  position: 'absolute',
                  right: value === 'profile' ? 8 : 35,
                  bottom: 10,
                }}
              />
            }
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
