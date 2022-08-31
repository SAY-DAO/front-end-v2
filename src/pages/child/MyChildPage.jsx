import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
// import Weather from 'simple-react-weather';
import { useNavigate, useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Message from '../../components/Message';
import MyChildTabs from '../../components/child/MyChildTabs';
import { fetchMyChildById } from '../../actions/childAction';
import { fetchMyHome } from '../../actions/main/homeAction';
import Back from '../../components/Back';
import { CHILD_ONE_NEED_RESET } from '../../constants/childConstants';
import LeaveFamilyModal from '../../components/modals/LeaveFamilyModal ';
import { fetchUserDetails } from '../../actions/userAction';

const ITEM_HEIGHT = 20;

const MyChildPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { childId } = useParams();

  const [weatherDisplay, setWeatherDisplay] = useState(false);
  const [myChildrenIdList, setMyChildrenIdList] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null); // Menu
  const open = Boolean(anchorEl); // Menu

  const myHome = useSelector((state) => state.myHome);
  const { children, success: successHome } = myHome;

  const leftFamily = useSelector((state) => state.leftFamily);
  const { success: successLeft } = leftFamily;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  const myChild = useSelector((state) => state.myChild);
  const {
    theChild,
    loading: loadingMyChild,
    error: errorMyChild,
    success: successMyChild,
  } = myChild;

  const userDetails = useSelector((state) => state.userDetails);
  const { error: errorUserDetails } = userDetails;

  // login
  useEffect(() => {
    dispatch(fetchUserDetails());
    if (errorUserDetails) {
      navigate('/auth/login?redirect=main/home');
    }
  }, [userInfo, successLogin, errorUserDetails, dispatch]);

  // left the family
  useEffect(() => {
    if (successLeft && children && children[0]) {
      navigate('/main/home');
    }
  }, [successLeft, dispatch, children]);

  // we get the home date ahead to get our children's ids
  useEffect(() => {
    if (!successHome) {
      dispatch(fetchMyHome());
    }
  }, [successHome, dispatch]);

  useEffect(() => {
    if (children) {
      for (let i = 0; i < children.length; i += 1) {
        myChildrenIdList.push(children[i].id);
      }
    }
  });

  // when the child is not adopted by user and route to the child's page
  useEffect(() => {
    dispatch({ type: CHILD_ONE_NEED_RESET });
    if (
      successMyChild &&
      myChildrenIdList &&
      !myChildrenIdList.includes(Number(childId))
    ) {
      navigate('/main/home');
    } else {
      dispatch(fetchMyChildById(childId));
    }
  }, [childId, myChildrenIdList, dispatch]);

  // weather display
  useEffect(() => {
    if (successMyChild) {
      setTimeout(function () {
        setWeatherDisplay(true);
      }, 500);
    }
  }, [weatherDisplay, successMyChild]);

  // clear all intervals
  useEffect(() => {
    // Get a reference to the last interval + 1
    const intervalId = window.setInterval(function () {},
    Number.MAX_SAFE_INTEGER);
    // Clear any timeout/interval up to that id
    for (let i = 1; i < intervalId; i += 1) {
      window.clearInterval(i);
    }
  });

  // Age
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

  // Menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLeave = () => {
    setMenuOpen(true);
  };

  return (
    <>
      {loadingMyChild ? (
        <CircularProgress />
      ) : (
        <Grid container direction="column" sx={{}}>
          <Back isOrange={false} to="/main/home" />
          <Grid
            item
            container
            xs={12}
            sx={{
              top: 0,
              left: 0,
              right: 0,
              minHeight: window.innerWidth < 350 ? '300px' : '350px',
              backgroundRepeat: 'round',
              backgroundImage: 'url("/images/child/background.png")',
              margin: 0,
              padding: 0,
            }}
          >
            <Grid item xs={12} sx={{ direction: 'ltr' }}>
              <IconButton
                aria-label="more"
                sx={{ color: 'white' }}
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 5.5,
                  },
                }}
              >
                <MenuItem
                  disabled
                  onClick={handleClose}
                  sx={{ minHeight: '15px', margin: 1 }}
                >
                  <Typography variant="body2" sx={{ color: '#fe8896' }}>
                    {t('childPage.more.growFamily')}
                  </Typography>
                </MenuItem>
                <Grid item xs={12}>
                  <Divider sx={{ width: '80%', margin: 'auto' }} />
                </Grid>
                <MenuItem
                  onClick={handleLeave}
                  sx={{ minHeight: '20px', margin: 1 }}
                >
                  <Typography variant="body2" sx={{ color: '#fe8896' }}>
                    {t('childPage.more.leaveFamily')}
                  </Typography>
                </MenuItem>
              </Menu>
            </Grid>
            <Grid item xs={12}>
              {theChild && theChild.sayName && (
                <>
                  <div style={{ minHeight: '20px' }} />

                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      top: '20%',
                      left: '50%',
                      position: 'absolute',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: '#f9d6af',
                      boxShadow: '4px 4px 10px rgba(0,0,0,.09)',
                    }}
                    alt={`${theChild.sayName}`}
                    src={theChild.avatarUrl}
                  />
                  <Typography
                    sx={{
                      color: 'white',
                      top: '32%',
                      left: '50%',
                      position: 'absolute',
                      transform: 'translate(-50%, -50%)',
                    }}
                    variant="subtitle1"
                  >
                    {theChild.sayName}
                  </Typography>
                  <Typography
                    sx={{
                      color: 'white',
                      top: '35%',
                      left: '50%',
                      position: 'absolute',
                      transform: 'translate(-50%, -50%)',
                    }}
                    variant="subtitle2"
                  >
                    {getAge(theChild.birthDate) + t('assets.age')}
                  </Typography>
                  {/* <Box id="weather">
                    <Weather
                      unit="C"
                      city="Karaj"
                      appid="ed56fab00ca239bf1003eee32c78057b"
                      style={{ display: !weatherDisplay && 'none' }}
                    />
                  </Box> */}
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
        {errorMyChild && (
          <Message
            backError={errorMyChild}
            variant="standard"
            severity="error"
          />
        )}
      </Grid>
      {theChild && (
        <LeaveFamilyModal
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
          theChild={theChild}
          // role={userRole}
          // rolesRelative={`${t(roles.rolesRelative[userRole])}`}
        />
      )}
    </>
  );
};

export default MyChildPage;
