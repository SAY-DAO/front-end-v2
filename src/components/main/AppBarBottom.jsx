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
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { changeCartBadgeNumber } from '../../actions/main/cartAction';
import { CART_BADGE_RESET } from '../../constants/main/cartConstants';

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

export default function AppBarBottom({ path }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [value, setValue] = useState();

  const cartBadge = useSelector((state) => state.cartBadge);
  const { badgeNumber } = cartBadge;

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

    const cartItems = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : null;
    if (cartItems) {
      dispatch(changeCartBadgeNumber(cartItems.length));
    } else {
      dispatch({ type: CART_BADGE_RESET });
    }
  }, [value, history, dispatch]);

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
          value={path}
          onChange={handleChange}
          sx={{ height: '45px' }}
        >
          <BottomNavigationAction
            value="home"
            className={classes.root}
            label={t('userLayout.home')}
            sx={{
              maxWidth: path === 'home' ? '180px' : '25px',
              minWidth: '70px',
              borderRadius: '25px',
              backgroundColor: path === 'home' ? '#ffdfc1' : 'transparent',
            }}
            icon={
              <img
                src={
                  path === 'home'
                    ? '/images/appBar/homeActive.svg'
                    : '/images/appBar/home.svg'
                }
                alt="Home Icon"
                style={{
                  maxWidth: '22px',
                  position: 'absolute',
                  right: path === 'home' ? 8 : 35,
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
              maxWidth: path === 'cart' ? '180px' : '25px',
              minWidth: '65px',
              borderRadius: '25px',
              backgroundColor: path === 'cart' ? '#ffdfc1' : 'transparent',
            }}
            icon={
              <StyledBadge
                badgeContent={badgeNumber}
                color="primary"
                style={{
                  position: 'absolute',
                  right: path === 'cart' ? 8 : 35,
                  bottom: 10,
                }}
              >
                <img
                  src={
                    path === 'cart'
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
              maxWidth: path === 'search' ? '180px' : '25px',
              minWidth: '60px',
              borderRadius: '25px',
              backgroundColor: path === 'search' ? '#ffdfc1' : 'transparent',
            }}
            icon={
              <img
                src={
                  path === 'search'
                    ? '/images/appBar/searchActive.svg'
                    : '/images/appBar/search.svg'
                }
                alt="Search Icon"
                style={{
                  maxWidth: '22px',
                  position: 'absolute',
                  right: path === 'search' ? 8 : 30,
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
              maxWidth: path === 'profile' ? '180px' : '25px',
              minWidth: '70px',
              borderRadius: '25px',
              backgroundColor: path === 'profile' ? '#ffdfc1' : 'transparent',
            }}
            icon={
              <img
                src={
                  path === 'profile'
                    ? '/images/appBar/profileActive.svg'
                    : '/images/appBar/profile.svg'
                }
                alt="Profile Icon"
                style={{
                  maxWidth: '22px',
                  position: 'absolute',
                  right: path === 'profile' ? 8 : 30,
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

AppBarBottom.propTypes = {
  path: PropTypes.string,
};
