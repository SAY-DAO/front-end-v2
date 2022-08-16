import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { Paper, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { makeStyles, styled } from '@mui/styles';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { changeCartBadgeNumber } from '../../actions/main/cartAction';
import {
  CART_BADGE_RESET,
  CART_UPDATE_BACK_RESET,
} from '../../constants/main/cartConstants';
import { fetchMyHome } from '../../actions/main/homeAction';
import { SHAPARAK_RESET } from '../../constants/paymentConstants';

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
  const navigate = useNavigate();

  const [value, setValue] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  const cartBadge = useSelector((state) => state.cartBadge);
  const { badgeNumber } = cartBadge;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const myHome = useSelector((state) => state.myHome);
  const {
    children,
    success: successHome,
    loading: loadingHome,
    error: errorHome,
  } = myHome;

  // we get the home date ahead to get our children's ids / for users with no children
  useEffect(() => {
    if (!successHome && !loadingHome) {
      dispatch(fetchMyHome());
    }
    if (userInfo && children && !children[0]) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [
    successHome,
    userInfo,
    isDisabled,
    children,
    errorHome,
    loadingHome,
    dispatch,
  ]);

  useEffect(() => {
    if (value === 'profile') {
      navigate('/main/profile');
    } else if (value === 'cart') {
      dispatch({ type: SHAPARAK_RESET });
      dispatch({ type: CART_UPDATE_BACK_RESET });
      navigate('/main/cart');
    } else if (value === 'search') {
      navigate('/main/search');
    } else if (value === 'home') {
      navigate('/main/home');
    } else if (value === 'dao') {
      navigate('/main/dao');
    }
    const cartItems = localStorage.getItem('SAY-cartItems')
      ? JSON.parse(localStorage.getItem('SAY-cartItems'))
      : null;
    if (cartItems) {
      dispatch(changeCartBadgeNumber(cartItems.length));
    } else if (!cartItems) {
      dispatch({ type: CART_BADGE_RESET });
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          {!isDisabled && (
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
          )}
          {!isDisabled && (
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
          )}

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
          <BottomNavigationAction
            value="dao"
            label={t('userLayout.dao')}
            className={classes.root}
            sx={{
              maxWidth: path === 'dao' ? '180px' : '25px',
              minWidth: '70px',
              borderRadius: '25px',
              backgroundColor: path === 'dao' ? '#ffdfc1' : 'transparent',
            }}
            icon={<Typography variant="subtitle2">DAO</Typography>}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

AppBarBottom.propTypes = {
  path: PropTypes.string,
};
