/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Box, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import GoneModal from '../modals/GoneModal';
import ChildFamily from './ChildFamily';
import ChildStats from './ChildStats';
import ChildNeeds from './ChildNeeds';
import ChildStory from './ChildStory';
import { fetchChildNeeds } from '../../actions/childAction';

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

export default function MyChildTabs({ theChild }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();

  const [isGone, setIsGone] = useState(false);
  const [value, setValue] = useState(0);
  const [userRole, setUserRole] = useState();
  const [needsData, setNeedsData] = useState([]);
  const childNeeds = useSelector((state) => state.childNeeds);
  const { theNeeds, success } = childNeeds;

  // setFamily and userRole
  useEffect(() => {
    if (theChild.userRole) {
      setUserRole(theChild.userRole);
    }
  }, [userRole, theChild]);

  // child is gone
  useEffect(() => {
    if (theChild.is_gone) {
      setIsGone(true);
    }
    return () => {
      setIsGone(false);
    };
  }, [theChild]);

  // fetch child needs
  useEffect(() => {
    dispatch(fetchChildNeeds(theChild.id));
  }, [theChild]);

  useEffect(() => {
    console.log(location);
    if (location.state) {
      console.log(location.state);
      setValue(location.state.childTab);
    }
  }, [dispatch]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // sort needs
  useEffect(() => {
    if (theNeeds) {
      // urgent ==> index 0
      // growth 0 ==> index 1
      // joy 1 ==> index 2
      // health 2 ==> index 3
      // surroundings 3 ==> index 4
      // done ==> index 5
      const needData = [[], [], [], [], [], []];
      const allNeeds = theNeeds.needs.sort((a, b) => {
        if (!a.isDone && !b.isDone) {
          // Sort needs by create date Ascending
          return new Date(a.created) - new Date(b.created);
        }
        // Sort done needs by done date Descending
        return new Date(b.doneAt) - new Date(a.doneAt);
      });

      for (let i = 0; i < allNeeds.length; i += 1) {
        if (allNeeds[i].isDone) {
          needData[5].push(allNeeds[i]);
        } else if (allNeeds[i].isUrgent) {
          needData[0].push(allNeeds[i]);
        } else {
          needData[allNeeds[i].category + 1].push(allNeeds[i]);
        }
      }
      setNeedsData(needData);
    }
  }, [theNeeds]);

  return (
    <>
      {!success || !needsData[0] ? (
        <CircularProgress />
      ) : (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              sx={{ backgroundColor: 'white' }}
            >
              <Tab
                label={
                  <Typography variant="subtitle2">
                    {t('childPage.childTab.stats')}
                  </Typography>
                }
                {...a11yProps(0)}
              />
              <Tab
                label={
                  <Typography variant="subtitle2">
                    {t('childPage.childTab.requirements')}
                  </Typography>
                }
                {...a11yProps(1)}
              />
              <Tab
                label={
                  <Typography variant="subtitle2">
                    {t('childPage.childTab.family')}
                  </Typography>
                }
                {...a11yProps(2)}
              />
              <Tab
                label={
                  <Typography variant="subtitle2">
                    {t('childPage.childTab.story')}
                  </Typography>
                }
                {...a11yProps(3)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ChildStats needsArray={needsData} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ChildNeeds
              theChild={theChild}
              needsArray={needsData}
              setValue={setValue}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ChildFamily theChild={theChild} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ChildStory theChild={theChild} />
          </TabPanel>
        </Box>
      )}
      {/* Gone warn popup */}
      <GoneModal isGone={isGone} childSayName={theChild.sayName} />
    </>
  );
}

MyChildTabs.propTypes = {
  theChild: PropTypes.object,
};
