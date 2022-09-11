/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import DaoDocs from '../../components/DAO/DaoDocs';
import DaoPortal from '../../components/DAO/DaoPortal';
import DaoMint from '../../components/DAO/DaoMint';
import DaoMileStone from '../../components/DAO/DaoMileStone';
import { setActiveMode } from '../../redux/actions/themeAction';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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

export default function DAO() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(setActiveMode('dark'));
    return () => {
      dispatch(setActiveMode('light'));
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Portal" {...a11yProps(0)} />
          <Tab label="MileStone" {...a11yProps(1)} />
          <Tab label="Mint" {...a11yProps(2)} />
          <Tab label="Docs" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid>
          <DaoPortal />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid>
          <DaoMileStone />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid>
          <DaoMint />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Grid>
          <DaoDocs />
        </Grid>
      </TabPanel>
    </Box>
  );
}
