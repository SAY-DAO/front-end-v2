/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DaoDocs from './DAO/DaoDocs';
import AppBarBottom from './AppBarBottom';

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

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
          <Tab label="Docs" {...a11yProps(0)} />
          <Tab label="Portal" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Grid>
          <DaoDocs />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid>
          <Card sx={{ maxWidth: '80%', m: 'auto' }}>
            <CardMedia
              component="img"
              height="50"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Grid>
                <LoadingButton variant="contained"> Sign</LoadingButton>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </TabPanel>
      <AppBarBottom path="dao" />
    </Box>
  );
}
