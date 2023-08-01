/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid, tabsClasses } from '@mui/material';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import DaoDocs from './DaoDocs';
import DaoSignature from './DaoSignature';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
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

export default function DaoTabs({ tabSelected }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [value, setValue] = useState(0);
  const [, setFixTabDirection] = useState(false); // the arrow button

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { theUser } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      navigate('/auth/login?redirect=main/dao');
    }
  }, [userInfo]);

  useEffect(() => {
    setValue(tabSelected);
  }, [tabSelected]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // check for language on browser reload dir="" needs to change according to lang
  useEffect(() => {
    const getLanguage = () => i18next.language || window.localStorage.i18nextLng;

    if (document.getElementById('direction')) {
      const currentLang = getLanguage();

      if (currentLang) {
        if (currentLang === 'fa') {
          setFixTabDirection(true);
        } else {
          setFixTabDirection(false);
        }
      }
    }
  }, [i18next.language || window.localStorage.i18nextLng]);

  return (
    <>
      {theUser && (
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              flexGrow: 1,
              bgcolor: 'background.paper',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs"
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.1 },
                  // transform: fixTabDirection && 'scaleX(-1)',
                  display: 'flex',
                  flexDirection: 'row-reverse',
                },
                display: 'flex',
                flexDirection: 'row-reverse',
              }}
              TabScrollButtonProps={{ disabled: false }}
            >
              <Tab label={t('dao.tabs.signatures')} {...a11yProps(4)} />
              <Tab label={t('dao.tabs.mintables')} {...a11yProps(3)} />
              <Tab label={t('dao.tabs.proposals')} {...a11yProps(2)} />
              <Tab label={t('dao.tabs.contributes')} {...a11yProps(1)} />
              <Tab label={t('dao.tabs.docs')} {...a11yProps(0)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <DaoSignature />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid>{/* <DaoMileStone /> */}</Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid>{/* <DaoMint /> */}</Grid>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Grid>{/* <DaoMint /> */}</Grid>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Grid>
              <DaoDocs />
            </Grid>
          </TabPanel>
        </Box>
      )}
    </>
  );
}

DaoTabs.propTypes = {
  tabSelected: PropTypes.number.isRequired,
};
