/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Link, Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';
import { makeStyles } from '@material-ui/styles';
import roles from '../../apis/roles';
import { fetchRandomChild } from '../../actions/childAction';
import GoneModal from '../modals/GoneModal';
import AdoptModel from '../modals/AdoptionModal';
import PrevRoleModal from '../modals/PrevRoleModal';
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
  const [userRole, setUserRole] = useState(null);
  const [isFather, setIsFather] = useState(false);
  const [isMother, setIsMother] = useState(false);
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [family, setFamily] = useState([]);
  const [previousRole, setPreviousRole] = useState(null);
  const [backToPrevRole, setBackToPrevRole] = useState(false);
  const [adoption, setAdoption] = useState(false);
  const [alreadyInFamily, setAlreadyInFamily] = useState(false);
  const [selectedRole, setSelectedRole] = useState();

  const childRandomSearch = useSelector((state) => state.childRandomSearch);
  const { theChild } = childRandomSearch;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // child is gone
  useEffect(() => {
    if (theChild.is_gone) {
      setIsGone(true);
    }
    return () => {
      setIsGone(false);
    };
  }, [theChild]);

  // setFamily and userRole
  useEffect(() => {
    if (!theChild) {
      history.push('/main/search');
    }
    if (theChild) {
      if (theChild.userRole) {
        setUserRole(theChild.userRole);
      }
      setFamily(theChild.childFamilyMembers);
    }
  }, [userRole, theChild, history, dispatch]);

  // check family members
  useEffect(() => {
    const currentMember = [];
    if (family && userInfo) {
      for (let f = 0; f < family.length; f += 1) {
        const member = family[f];
        if (member.isDeleted) {
          if (member.member_id !== null) {
            // member_id from back end / userInfo.user.id from local storage
            if (member.member_id === userInfo.user.id) {
              setPreviousRole(member.role);
              if (userRole !== null && userRole !== previousRole) {
                setBackToPrevRole(true); // Modal: prevRole - Pops up that you only can go back to your previous role for this family
              }
            }
          }
        } else if (userInfo.user.id === member.member_id) {
          setAlreadyInFamily(true); // route to child page
        }
        currentMember.push(member);
        // father role is taken
        if (member.role === 0) {
          setFather(member.username);
          setIsFather(true);
        }
        // mother role is taken
        if (member.role === 1) {
          setIsMother(true);
          setMother(member.username);
        }
      }
    }
  }, [theChild, family, previousRole, userRole, userInfo]);

  // already in family
  // Goes to the search page and reset the success state
  // it invokes the search page to fetch new random child automatically
  useEffect(() => {
    if (alreadyInFamily) {
      history.push(`main/search`);
    }
  }, [alreadyInFamily, theChild, history]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // selecting role
  const handleSelectRole = async (selectedValue) => {
    if (isGone) {
      setIsGone(false);
      setIsGone(true);
    } else if (previousRole !== null && selectedValue !== previousRole) {
      setBackToPrevRole(true); // Modal: prevRole - Pops up that you only can go back to your previous role for this family
    } else {
      console.log(previousRole, selectedValue);
      setAdoption(true); // Modal: adoption
      setSelectedRole(selectedValue);
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', marginBottom: 4 }}>
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
                    <Grid item xs={6}>
                      <Typography sx={{ padding: 2 }} variant="subtitle1">
                        {t('family.roles.father')}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
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
      {theChild && theChild.sayName && (
        <GoneModal
          isGone={isGone}
          childSayName={theChild.sayName}
          roles={`${t(roles.roles[userRole])}`}
          rolesRelative={`${t(roles.rolesRelative[userRole])}`}
        />
      )}
      {/* Back to Previous Role warn popup */}
      {previousRole && (
        <PrevRoleModal
          backToPrevRole={backToPrevRole}
          setBackToPrevRole={setBackToPrevRole}
          previousRole={`${t(roles.roles[previousRole])}`}
          childSayName={theChild.sayName}
          rolesRelative={`${t(roles.rolesRelative[previousRole])}`}
        />
      )}

      {/* Adoption popup */}
      {selectedRole && (
        <AdoptModel
          adoption={adoption}
          setAdoption={setAdoption}
          selectedRole={selectedRole}
          familyId={theChild.familyId}
          userRole={userRole}
          childSayName={theChild.sayName}
          roles={`${t(roles.roles[selectedRole])}`}
          rolesRelative={`${t(roles.rolesRelative[selectedRole])}`}
        />
      )}
    </>
  );
}
