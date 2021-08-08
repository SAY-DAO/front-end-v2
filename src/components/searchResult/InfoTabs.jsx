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
import { makeStyles } from '@material-ui/core/styles';
import roles from '../../apis/roles';
import { fetchChildResult } from '../../actions/childAction';
import ChildModal from './modals/ChildModal';
import LeaveModel from './modals/LeaveModal';

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
  const [currentMember, setCurrentMember] = useState([]);
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

  const childSearchResult = useSelector((state) => state.childSearchResult);
  const { theChild } = childSearchResult;

  useEffect(() => {
    if (!theChild) {
      let token = history.location.search;
      token = token.split('?token=')[1].split('&')[0];
      dispatch(fetchChildResult(token));
    }
    if (theChild) {
      if (theChild.userRole === 0) {
        setIsFather(true);
      }
      if (theChild.userRole === 1) {
        setIsMother(true);
      }
    }
    return () => {
      setIsFather(false);
      setIsMother(false);
    };
  }, [theChild, history, dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const userId = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : {};

    if (theChild && userId) {
      setFamily(theChild.childFamilyMembers);
      setUserRole(theChild.userRole);

      if (family) {
        for (let f = 0; f < family.length; f += 1) {
          const member = family[f];
          if (member.isDeleted) {
            if (member.user_id !== null) {
              if (member.user_id === userId) {
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

          if (userId && userId === member.user_id) {
            setAlreadyInFamily(true);
          }
        }
      }
    }
  }, [theChild, currentMember, family, previousRole, userRole]);

  const openPopup = (r) => {
    console.log(r);
    if (previousRole !== null && r !== previousRole) {
      setPreviousRole(roles[previousRole]);
      setWarnText(t('error.adoption.backToPrevRole'));
      setChildName(theChild.sayName);
    }
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
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
          <Stack direction="column" spacing={1}>
            {theChild.childFamilyMembers.map((member) => (
              <Chip
                key={member.username}
                avatar={
                  <Avatar
                    alt={member.username}
                    src="/static/images/avatar/1.jpg"
                    style={{ width: '30px', height: '30px' }}
                  />
                }
                sx={{
                  textAlign: 'left',
                  minHeight: 40,
                }}
                label={
                  <Typography variant="subtitle2" sx={{ minWidth: 220 }}>
                    <span>{`${t(roles.roles[member.role])}`}</span>
                    <span style={{ marginLeft: 50, marginRight: 50 }} />
                    <span> {`${member.username}`}</span>
                  </Typography>
                }
                size="medium"
              />
            ))}
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* Father */}
          <Stack direction="column" spacing={1}>
            {!isFather ? (
              <Chip
                sx={{ width: '100%' }}
                variant="outlined"
                label={
                  <Grid container direction="row">
                    <Grid item xs={6}>
                      <Typography sx={{ padding: 2 }} variant="subtitle1">
                        {t('family.roles.father')}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Link onClick={() => openPopup(0)}>
                        <Typography
                          sx={{ padding: 2, fontWeight: 600 }}
                          variant="body2"
                          color="primary"
                        >
                          {t('search-result.getRole')}
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                }
              />
            ) : (
              <Chip
                sx={{ width: '100%' }}
                variant="outlined"
                label={
                  <Grid container direction="row">
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
            {/* Mother */}
            {!isMother ? (
              <Chip
                sx={{ width: '100%' }}
                variant="outlined"
                label={
                  <Grid container direction="row">
                    <Grid item xs={6}>
                      <Typography sx={{ padding: 2 }} variant="subtitle1">
                        {t('family.roles.mother')}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Link onClick={() => openPopup(1)}>
                        <Typography
                          sx={{ padding: 2, fontWeight: 600 }}
                          variant="body2"
                          color="primary"
                        >
                          {t('search-result.getRole')}
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                }
              />
            ) : (
              <Chip
                sx={{ width: '100%' }}
                variant="outlined"
                label={
                  <Grid container direction="row">
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
            <Chip
              sx={{ width: '100%' }}
              variant="outlined"
              label={
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <Typography sx={{ padding: 2 }} variant="subtitle1">
                      {t('family.roles.uncle')}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Link onClick={() => openPopup(2)}>
                      <Typography
                        sx={{ padding: 2, fontWeight: 600 }}
                        variant="body2"
                        color="primary"
                      >
                        {t('search-result.getRole')}
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              }
            />
            <Chip
              sx={{ width: '100%' }}
              variant="outlined"
              label={
                <Grid container direction="row">
                  <Grid item xs={6}>
                    <Typography sx={{ padding: 2 }} variant="subtitle1">
                      {t('family.roles.aunt')}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Link onClick={() => openPopup(0)}>
                      <Typography
                        sx={{ padding: 2, fontWeight: 600 }}
                        variant="body2"
                        color="primary"
                      >
                        {t('search-result.getRole')}
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              }
            />
          </Stack>
        </TabPanel>
      </Box>
      {/* Leave warn popup */}
      <ChildModal
        childSayName={theChild.sayName}
        roles={`${t(roles.roles[userRole])}`}
        rolesRelative={`${t(roles.rolesRelative[userRole])}`}
      />
      {/* Leave warn popup */}
      <LeaveModel />
      {/* Adoption popup */}
    </>
  );
}
