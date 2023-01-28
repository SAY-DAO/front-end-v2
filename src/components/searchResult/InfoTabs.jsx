/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import roles from '../../apis/roles';
import GoneModal from '../modals/GoneModal';
import AdoptModal from '../modals/AdoptionModal';
import PrevRoleModal from '../modals/PrevRoleModal';
import CannotBeMemberModal from '../modals/CannotBeMemberModal';
import ChildFamily from '../child/ChildFamily';
import { CHILD_RANDOM_SEARCH_RESET } from '../../constants/childConstants';
import AvailableRoles from './AvailableRoles';

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

export default function InfoTabs({ theChild, isInvite }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [isGone, setIsGone] = useState(false);
  const [value, setValue] = useState(0);
  const [userRole, setUserRole] = useState(null);
  const [inviteeRole, setInviteeRole] = useState(null);
  const [father, setFather] = useState('');
  const [mother, setMother] = useState('');
  const [family, setFamily] = useState([]);
  const [previousRole, setPreviousRole] = useState(null);
  const [backToPrevRole, setBackToPrevRole] = useState(false);
  const [cannotBeMember, setCannotBeMember] = useState(false);
  const [adoption, setAdoption] = useState(false);
  const [selectedRole, setSelectedRole] = useState();
  const [goToSearch, setGoToSearch] = useState(false);

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
    if (theChild) {
      if (theChild.userRole) {
        setUserRole(theChild.userRole);
      }
      setFamily(theChild.childFamilyMembers);
    }
  }, [userRole, theChild, history, dispatch]);

  useEffect(() => {
    setInviteeRole(userRole);
  }, [userRole]);

  useEffect(() => {
    if (goToSearch) {
      history.push('/main/search');
    }
  }, [goToSearch]);

  // error code: 746
  const handlePreviousRole = (memberRole) => {
    setPreviousRole(memberRole);
    // For invitation. The search case handled in handleSelectRole.
    if (userRole !== null && userRole !== previousRole) {
      localStorage.removeItem('invitationToken');
      setInviteeRole(null);
      setBackToPrevRole(true);
    }
  };

  // error code: 747
  const handleAlreadyInFamily = () => {
    localStorage.removeItem('invitationToken');
    history.push(`/child/${theChild.id}`);
  };

  const handleCannotBeMember = () => {
    const cannotBeFather = Boolean(previousRole === 0 && father);
    const cannotBeMother = Boolean(previousRole === 1 && mother);
    if (cannotBeFather || cannotBeMother) {
      setCannotBeMember(true);
    }
  };

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
              handlePreviousRole(member.role);
            }
          }
        } else if (userInfo.user.id === member.member_id) {
          handleAlreadyInFamily();
        }
        currentMember.push(member);
        // father role is taken
        if (member.role === 0) {
          setFather(member.username);
        }
        // mother role is taken
        if (member.role === 1) {
          setMother(member.username);
        }
      }
      handleCannotBeMember();
    }
  }, [theChild, family, previousRole, userRole, userInfo]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // FIX: won't handle prev role warn, previousRole is null inside the function.
  const handleSelectRole = useCallback(async (selectedValue) => {
    if (isGone) {
      setIsGone(false);
      setIsGone(true);
    } else if (previousRole !== null && selectedValue !== previousRole) {
      console.log('here');
      setBackToPrevRole(true); // Modal: prevRole - Pops up that you only can go back to your previous role for this family
    } else {
      console.log('this: ', previousRole, selectedValue);
      setAdoption(true); // Modal: adoption
      setSelectedRole(selectedValue);
    }
  }, []);

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
          <AvailableRoles
            inviteeRole={inviteeRole}
            father={father}
            mother={mother}
            isGone={isGone}
            handleSelectRole={handleSelectRole}
          />
        </TabPanel>
      </Box>
      {/* Role has been taken popup */}
      {/* Cannot be member anymore popup */}
      {previousRole && (
        <CannotBeMemberModal
          cannotBeMember={cannotBeMember}
          setCannotBeMember={setCannotBeMember}
          previousRole={`${t(roles.roles[previousRole])}`}
          childSayName={theChild.sayName}
          rolesRelative={`${t(roles.rolesRelative[previousRole])}`}
          isInvite={isInvite}
        />
      )}
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
        <AdoptModal
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

InfoTabs.propTypes = {
  theChild: PropTypes.object.isRequired,
  isInvite: PropTypes.bool.isRequired,
};
