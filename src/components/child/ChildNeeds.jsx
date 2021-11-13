/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, CircularProgress, Chip, Box } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { fetchChildNeeds } from '../../actions/childAction';
import NeedCard from '../need/NeedCard';

const useStyles = makeStyles(() => ({
  chip: {
    color: '#666',
    maxWidth: '180px',
    height: '30px',
    border: 0,
    backgroundColor: 'white',
    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: '#FFDFC1 !important',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#bfeeff !important',
    },
  },
  chipActive: {
    maxWidth: '180px',
    height: '30px',
    border: 0,
    backgroundColor: '#FFDFC1',
    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
    '&:focusVisible': {
      backgroundColor: 'red',
    },
    '&:hover': {
      backgroundColor: '#FFDFC1 !important',
      color: '#f59e39',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#bfeeff !important',
    },
  },
}));

export default function ChildNeedCard({ theChild }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  // [[urgent], [growth], ...]
  const [needsArray, setNeedsArray] = useState([[], [], [], [], [], []]);
  const [category, setCategory] = useState();
  const [activeCat, setActiveCat] = useState();

  const childNeeds = useSelector((state) => state.childNeeds);
  const { theNeeds, success, loading } = childNeeds;

  useEffect(() => {
    if (!success) {
      dispatch(fetchChildNeeds(theChild.id));
    }
  }, [dispatch, success, theChild]);

  useEffect(() => {
    if (success) {
      const sortedNeeds = theNeeds.needs.sort((a, b) => {
        if (!a.isDone && !b.isDone) {
          // Sorts needs by create date Ascending
          return new Date(a.created) - new Date(b.created);
        }
        // Sorts needs by done date Ascending
        return new Date(b.doneAt) - new Date(a.doneAt);
      });

      // [[urgent], [growth], ...]
      const allNeeds = [[], [], [], [], [], []];

      for (let i = 0; i < sortedNeeds.length; i++) {
        if (sortedNeeds[i].isDone) {
          allNeeds[5].push(sortedNeeds[i]);
        } else if (sortedNeeds[i].isUrgent) {
          allNeeds[0].push(sortedNeeds[i]);
        } else {
          allNeeds[sortedNeeds[i].category + 1].push(sortedNeeds[i]);
        }
      }
      setNeedsArray(allNeeds);
    }
    // Cleans up when leaves the page
    return () => {
      setNeedsArray([[], [], [], [], [], []]);
    };
  }, [success]);

  // To set the first available category to the active one
  useEffect(() => {
    if (!category) {
      if (needsArray[0][1]) {
        setCategory(0);
        setActiveCat(0);
      } else if (needsArray[1][1]) {
        setCategory(1);
        setActiveCat(1);
      } else if (needsArray[2][1]) {
        setCategory(2);
        setActiveCat(2);
      } else if (needsArray[3][1]) {
        setCategory(3);
        setActiveCat(3);
      } else if (needsArray[4][1]) {
        setCategory(4);
        setActiveCat(4);
      } else if (needsArray[5][1]) {
        setCategory(5);
        setActiveCat(5);
      }
    }
  }, [needsArray, category]);

  const handleNeedCardClick = (needId, childId) => {
    history.push(`/child/${childId}/needs/${needId}`);
  };

  const handleClick = (index) => {
    if (needsArray) {
      setCategory(index);
      setActiveCat(index);
    }
  };

  const classes = useStyles();

  const renderNeedsByCategory = () => (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        paddingLeft: 2,
        paddingRight: 2,
        textAlign: 'center',
        width: '100%',
      }}
    >
      {/* TODO: pagination is needed here */}
      {needsArray[category].map((need) => (
        <NeedCard
          key={need.id}
          handleNeedCardClick={handleNeedCardClick}
          need={need}
          childId={theChild.id}
        />
      ))}
    </Stack>
  );

  return (
    <>
      {loading || !success ? (
        <CircularProgress />
      ) : (
        <>
          {needsArray && category && (
            <Grid sx={{ width: '100%' }}>
              <Box
                sx={{
                  overflowX: 'scroll',
                  paddingLeft: 2,
                  paddingRight: 2,
                  height: '50px',
                }}
              >
                <Stack direction="row" spacing={1}>
                  {needsArray[0][1] && (
                    <Chip
                      label={t('childData.needCategory.urgent')}
                      className={
                        activeCat !== 0 ? classes.chip : classes.chipActive
                      }
                      variant="outlined"
                      onClick={() => handleClick(0)}
                    />
                  )}
                  {needsArray[1][1] && (
                    <Chip
                      label={t('childData.needCategory.growth')}
                      className={
                        activeCat !== 1 ? classes.chip : classes.chipActive
                      }
                      variant="outlined"
                      onClick={() => handleClick(1)}
                    />
                  )}
                  {needsArray[2][1] && (
                    <Chip
                      label={t('childData.needCategory.joy')}
                      className={
                        activeCat !== 2 ? classes.chip : classes.chipActive
                      }
                      variant="outlined"
                      onClick={() => handleClick(2)}
                    />
                  )}
                  {needsArray[3][1] && (
                    <Chip
                      label={t('childData.needCategory.health')}
                      className={
                        activeCat !== 3 ? classes.chip : classes.chipActive
                      }
                      variant="outlined"
                      onClick={() => handleClick(3)}
                    />
                  )}
                  {needsArray[4][1] && (
                    <Chip
                      label={t('childData.needCategory.surroundings')}
                      onClick={() => handleClick(4)}
                      variant="outlined"
                      className={
                        activeCat !== 4 ? classes.chip : classes.chipActive
                      }
                    />
                  )}

                  {needsArray[5][1] && (
                    <Chip
                      label={t('childData.needCategory.done')}
                      onClick={() => handleClick(5)}
                      variant="outlined"
                      className={
                        activeCat !== 5 ? classes.chip : classes.chipActive
                      }
                    />
                  )}
                </Stack>
              </Box>
              {renderNeedsByCategory()}
            </Grid>
          )}
        </>
      )}
    </>
  );
}

ChildNeedCard.propTypes = {
  theChild: PropTypes.object.isRequired,
};
