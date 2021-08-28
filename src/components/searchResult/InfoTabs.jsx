/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Link, Box, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';
import { makeStyles } from '@material-ui/styles';
import roles from '../../apis/roles';
import { fetchChildResult } from '../../actions/childAction';
import GoneModal from './modals/GoneModal';
import AdoptModel from './modals/AdoptionModal';
import ChildFamily from '../child/ChildFamily';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
      marginTop: theme.spacing(1),
    },
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className={classes.root}>{children}</div>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function InfoTabs() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isGone, setIsGone] = useState(false);
  const [value, setValue] = useState(0);
  const [userRole, setUserRole] = useState();
  const [isFather, setIsFather] = useState(false);
  const [isMother, setIsMother] = useState(false);
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [family, setFamily] = useState([]);
  const [childId, setChildId] = useState('');
  const [familyId, setFamilyId] = useState('');
  const [previousRole, setPreviousRole] = useState();
  const [backToPrevRole, setBackToPrevRole] = useState(false);
  const [alreadyInFamily, setAlreadyInFamily] = useState(false);
  const [warnText, setWarnText] = useState('');
  const [childName, setChildName] = useState('');
  const [backToPrevRoleIsOpen, setBackToPrevRoleIsOpen] = useState();
  const [adoptPopupIsOpen, setAdoptPopupIsOpen] = useState();
  const [roleSelecting, setRoleSelecting] = useState(false);
  const [selectedRole, setSelectedRole] = useState();

  const childSearchResult = useSelector((state) => state.childSearchResult);
  const { theChild } = childSearchResult;

  const userLogin = useSelector((state) => state.userLogin);
  const { success: successLogin } = userLogin;

  // child is gone
  useEffect(() => {
    if (theChild.is_gone) {
      setIsGone(true);
    }
    return () => {
      setIsGone(false);
    };
  }, [theChild]);

  // check family
  useEffect(() => {
    const currentMember = [];
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;

    if (family) {
      for (let f = 0; f < family.length; f += 1) {
        const member = family[f];
        if (member.isDeleted) {
          if (member.user_id !== null) {
            // user_id from back end / userInfo.user.id from local storage
            if (userInfo && member.user_id === userInfo.user.id) {
              setPreviousRole(member.role);
            }
            if (userRole !== null && userRole !== previousRole) {
              setBackToPrevRole(true);
            }
          }
        }
        currentMember.push(member);

        if (member.role === 0) {
          setFather(member.username);
          setIsFather(true);
        }

        if (member.role === 1) {
          setIsMother(true);
          setMother(member.username);
        }

        if (userInfo && userInfo.user.id === member.user_id) {
          setAlreadyInFamily(true);
        }
      }
    }
  }, [theChild, family, previousRole, userRole]);

  // setFamily, setFather, setMother
  useEffect(() => {
    if (!theChild) {
      let token = history.location.search;
      token = token.split('?token=')[1].split('&')[0];
      dispatch(fetchChildResult(token));
    }
    if (theChild) {
      setUserRole(theChild.userRole);
      setFamily(theChild.childFamilyMembers);

      if (userRole === 0) {
        setIsFather(true);
      }
      if (userRole === 1) {
        setIsMother(true);
      }
    }
    return () => {
      setIsFather(false);
      setIsMother(false);
    };
  }, [userRole, theChild, history, dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectRole = (selectedValue) => {
    if (isGone) {
      setIsGone(false);
      setIsGone(true);
    } else if (previousRole && selectedValue !== previousRole) {
      // setPreviousRole(roles[previousRole]);
      // setWarnText(t('error.adoption.backToPrevRole'));
      // setChildName(theChild.sayName);
    } else {
      setSelectedRole(selectedValue);
      setRoleSelecting(true);
    }
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab
              label={
                <Typography variant="body1">
                  {t('search-result.tab1')}
                </Typography>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Typography variant="body1">
                  {t('search-result.tab2')}
                </Typography>
              }
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ChildFamily theChild={theChild} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* Father */}
          <Stack direction="column" spacing={1}>
            {/* Mother 1 */}
            {!isMother ? (
              <Chip
                variant="outlined"
                label={
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ minWidth: 220 }}
                  >
                    <Grid item xs={6}>
                      <Typography sx={{ padding: 2 }} variant="subtitle1">
                        {t('family.roles.mother')}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      {!isGone && (
                        <Link onClick={() => handleSelectRole(1)}>
                          <Typography
                            sx={{ padding: 2, fontWeight: 600 }}
                            variant="body2"
                            color="primary"
                          >
                            {t('search-result.getRole')}
                          </Typography>
                        </Link>
                      )}
                    </Grid>
                  </Grid>
                }
              />
            ) : (
              <Chip
                variant="outlined"
                label={
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ minWidth: 220 }}
                  >
                    <Grid item xs={6}>
                      <Typography sx={{ padding: 2 }} variant="subtitle1">
                        {t('family.roles.mother')}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ padding: 2 }} variant="subtitle2">
                        @{mother}
                      </Typography>
                    </Grid>
                  </Grid>
                }
              />
            )}
            {/* mother's sister 3 */}
            <Chip
              variant="outlined"
              label={
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ minWidth: 220 }}
                >
                  <Grid item xs={6}>
                    <Typography sx={{ padding: 2 }} variant="subtitle1">
                      {t('family.roles.aunt')}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {!isGone && (
                      <Link onClick={() => handleSelectRole(3)}>
                        <Typography
                          sx={{ padding: 2, fontWeight: 600 }}
                          variant="body2"
                          color="primary"
                        >
                          {t('search-result.getRole')}
                        </Typography>
                      </Link>
                    )}
                  </Grid>
                </Grid>
              }
            />
            {/* mother's brother 4 */}
            <Chip
              variant="outlined"
              label={
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ minWidth: 220 }}
                >
                  <Grid item xs={6}>
                    <Typography sx={{ padding: 2 }} variant="subtitle1">
                      {t('family.roles.daei')}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {!isGone && (
                      <Link onClick={() => handleSelectRole(4)}>
                        <Typography
                          sx={{ padding: 2, fontWeight: 600 }}
                          variant="body2"
                          color="primary"
                        >
                          {t('search-result.getRole')}
                        </Typography>
                      </Link>
                    )}
                  </Grid>
                </Grid>
              }
            />
            {/* father */}
            {!isFather ? (
              <Chip
                variant="outlined"
                label={
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ minWidth: 220 }}
                  >
                    <Typography variant="subtitle1">
                      {t('family.roles.father')}
                    </Typography>
                    {!isGone && (
                      <Link onClick={() => handleSelectRole(0)}>
                        <Typography
                          sx={{ padding: 2, fontWeight: 600 }}
                          variant="body2"
                          color="primary"
                        >
                          {t('search-result.getRole')}
                        </Typography>
                      </Link>
                    )}
                  </Grid>
                }
              />
            ) : (
              <Chip
                variant="outlined"
                label={
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ minWidth: 220 }}
                  >
                    <Grid item xs={6}>
                      <Typography sx={{ padding: 2 }} variant="subtitle1">
                        {t('family.roles.father')}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography sx={{ padding: 2 }} variant="subtitle2">
                        @{father}
                      </Typography>
                    </Grid>
                  </Grid>
                }
              />
            )}
            {/* father's sister  5 */}
            <Chip
              variant="outlined"
              label={
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ minWidth: 220 }}
                >
                  <Grid item xs={6}>
                    <Typography sx={{ padding: 2 }} variant="subtitle1">
                      {t('family.roles.ame')}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {!isGone && (
                      <Link onClick={() => handleSelectRole(5)}>
                        <Typography
                          sx={{ padding: 2, fontWeight: 600 }}
                          variant="body2"
                          color="primary"
                        >
                          {t('search-result.getRole')}
                        </Typography>
                      </Link>
                    )}
                  </Grid>
                </Grid>
              }
            />
            {/* father's brother 2 */}
            <Chip
              variant="outlined"
              label={
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ minWidth: 220 }}
                >
                  <Grid item xs={6}>
                    <Typography sx={{ padding: 2 }} variant="subtitle1">
                      {t('family.roles.uncle')}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {!isGone && (
                      <Link onClick={() => handleSelectRole(2)}>
                        <Typography
                          sx={{ padding: 2, fontWeight: 600 }}
                          variant="body2"
                          color="primary"
                        >
                          {t('search-result.getRole')}
                        </Typography>
                      </Link>
                    )}
                  </Grid>
                </Grid>
              }
            />
          </Stack>
        </TabPanel>
      </Box>
      {/* Gone warn popup */}
      <GoneModal
        isGone={isGone}
        childSayName={theChild.sayName}
        roles={`${t(roles.roles[userRole])}`}
        rolesRelative={`${t(roles.rolesRelative[userRole])}`}
      />

      {/* Adoption popup */}
      <AdoptModel
        successLogin={successLogin}
        roleSelecting={roleSelecting}
        setRoleSelecting={setRoleSelecting}
        selectedRole={selectedRole}
        family={family}
        userRole={userRole}
        childSayName={theChild.sayName}
        roles={`${t(roles.roles[selectedRole])}`}
        rolesRelative={`${t(roles.rolesRelative[selectedRole])}`}
      />
    </>
  );
}
