import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Paper, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { changeCartBadgeNumber } from '../redux/actions/main/cartAction';
import { CART_BADGE_RESET, CART_UPDATE_BACK_RESET } from '../redux/constants/main/cartConstants';
import { fetchMyHome } from '../redux/actions/main/homeAction';
import { SHAPARAK_RESET } from '../redux/constants/paymentConstants';
import { fetchUserDetails } from '../redux/actions/userAction';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '440 4px',
    color: 'white',
  },
}));

export default function AppBarBottom() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  const [value, setValue] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  const cartBadge = useSelector((state) => state.cartBadge);
  const { badgeNumber } = cartBadge;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const myHome = useSelector((state) => state.myHome);
  const { children, success: successHome, loading: loadingHome, error: errorHome } = myHome;

  const themeOptions = useSelector((state) => state.themeOptions);
  const { activeMode } = themeOptions;

  useEffect(() => {
    dispatch(fetchUserDetails());
  }, [value]);

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
  }, [successHome, userInfo, isDisabled, children, errorHome, loadingHome, dispatch]);

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
    } else if (value === 'daoPortal') {
      navigate('/main/dao/portal');
      setValue();
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
          zIndex: 1000,
        }}
        elevation={0}
      >
        <BottomNavigation showLabels value={path} onChange={handleChange} sx={{ height: '45px' }}>
          {!isDisabled && (
            <BottomNavigationAction
              value="home"
              label={path === '/main/home' && t('userLayout.home')}
              sx={{
                '& .Mui-selected': {
                  position: 'absolute',
                },
                maxWidth: path === '/main/home' ? '180px' : '25px',
                minWidth: '70px',
                borderRadius: '25px',
                backgroundColor: path === '/main/home' ? '#ffdfc1' : 'transparent',
                '& .MuiBottomNavigationAction-label': {
                  color: 'rgb(251, 181, 99)',
                },
              }}
              icon={
                <img
                  src={
                    path === '/main/home'
                      ? '/images/appBar/homeActive.svg'
                      : '/images/appBar/home.svg'
                  }
                  alt="Home Icon"
                  style={{
                    maxWidth: '22px',
                    position: 'absolute',
                    right: path === '/main/home' ? 8 : 35,
                    bottom: 10,
                  }}
                />
              }
            />
          )}
          {!isDisabled && (
            <BottomNavigationAction
              value="cart"
              label={path === '/main/cart' && t('userLayout.cart')}
              sx={{
                '& .Mui-selected': {
                  position: 'absolute',
                },
                maxWidth: path === '/main/cart' ? '180px' : '25px',
                minWidth: '65px',
                borderRadius: '25px',
                backgroundColor: path === '/main/cart' ? '#ffdfc1' : 'transparent',
                '& .MuiBottomNavigationAction-label': {
                  color: 'rgb(251, 181, 99)',
                },
              }}
              icon={
                <StyledBadge
                  badgeContent={badgeNumber}
                  color="primary"
                  style={{
                    position: 'absolute',
                    right: path === '/main/cart' ? 8 : 35,
                    bottom: 10,
                  }}
                >
                  <img
                    src={
                      path === '/main/cart'
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
            label={path === '/main/search' && t('userLayout.search')}
            sx={{
              '& .Mui-selected': {
                position: 'absolute',
              },
              maxWidth: path === '/main/search' ? '180px' : '25px',
              minWidth: '60px',
              borderRadius: '25px',
              backgroundColor: path === '/main/search' ? '#ffdfc1' : 'transparent',
              '& .MuiBottomNavigationAction-label': {
                color: 'rgb(251, 181, 99)',
              },
            }}
            icon={
              <img
                src={
                  path === '/main/search'
                    ? '/images/appBar/searchActive.svg'
                    : '/images/appBar/search.svg'
                }
                alt="Search Icon"
                style={{
                  maxWidth: '22px',
                  position: 'absolute',
                  right: path === '/main/search' ? 8 : 30,
                  bottom: 10,
                }}
              />
            }
          />
          <BottomNavigationAction
            value="profile"
            label={path === '/main/profile' && t('userLayout.profile')}
            sx={{
              '& .Mui-selected': {
                position: 'absolute',
              },
              maxWidth: path === '/main/profile' ? '180px' : '25px',
              minWidth: '70px',
              borderRadius: '25px',
              backgroundColor: path === '/main/profile' ? '#ffdfc1' : 'transparent',
              '& .MuiBottomNavigationAction-label': {
                color: 'rgb(251, 181, 99)',
              },
            }}
            icon={
              <img
                src={
                  path === '/main/profile'
                    ? '/images/appBar/profileActive.svg'
                    : '/images/appBar/profile.svg'
                }
                alt="Profile Icon"
                style={{
                  maxWidth: '22px',
                  position: 'absolute',
                  right: path === '/main/profile' ? 8 : 30,
                  bottom: 10,
                }}
              />
            }
          />
          {userInfo && userInfo.user && userInfo.user.id === 115 && (
            <BottomNavigationAction
              value="daoPortal"
              label={path === '/main/dao' && t('userLayout.dao')}
              sx={{
                '& .Mui-selected': {
                  position: 'absolute',
                },
                maxWidth: path === '/main/dao/portal' ? '180px' : '25px',
                minWidth: '70px',
                borderRadius: '25px',
                backgroundColor: path === '/main/dao/portal' ? '#ffdfc1' : 'transparent',
                '& .MuiBottomNavigationAction-label': {
                  color: activeMode === 'dark' ? '#282C34' : 'rgb(251, 181, 99)',
                },
              }}
              icon={
                path !== '/main/dao/portal' && (
                  <Typography variant="subtitle2">{t('userLayout.dao')}</Typography>
                )
              }
            />
          )}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
