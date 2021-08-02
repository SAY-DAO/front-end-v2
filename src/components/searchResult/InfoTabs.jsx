/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Link, Box, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Stack from '@material-ui/core/Stack';
import { makeStyles } from '@material-ui/core/styles';
import roles from '../../apis/roles';

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

export default function InfoTabs({
  theChild,
  father,
  mother,
  isFather,
  isMother,
  openPopup,
}) {
  console.log(isFather);
  const { t } = useTranslation();
  const [value, setValue] = useState(0);

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
          centered
        >
          <Tab
            label={
              <Typography variant="body1">{t('search-result.tab1')}</Typography>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <Typography variant="body1">{t('search-result.tab2')}</Typography>
            }
            {...a11yProps(1)}
          />
          {/* <Tab
            label={<Typography variant="body1">Child Stats</Typography>}
            {...a11yProps(1)}
          /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {theChild.childFamilyMembers.map((member) => (
          <Chip
            key={member.username}
            avatar={
              <Avatar alt={member.username} src="/static/images/avatar/1.jpg" />
            }
            sx={{
              textAlign: 'center',
            }}
            label={
              <Typography variant="subtitle2">
                {`${t(roles.roles[member.role])} - ${member.username}`}
              </Typography>
            }
            size="medium"
          />
        ))}
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
                      {t('family.roles.father')}
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
      {/* <TabPanel value={value} index={2}>
        Item Three
      </TabPanel> */}
    </Box>
  );
}

InfoTabs.propTypes = {
  theChild: PropTypes.object,
  openPopup: PropTypes.func,
  father: PropTypes.string,
  mother: PropTypes.string,
  isFather: PropTypes.bool,
  isMother: PropTypes.bool,
};
