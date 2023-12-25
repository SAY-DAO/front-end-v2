/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, CircularProgress, Chip, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NeedCard from '../need/NeedCard';
import { SHAPARAK_RESET } from '../../redux/constants/paymentConstants';

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
    marginLeft: 2,
    marginRight: 2,
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
    marginLeft: 2,
    marginRight: 2,
  },
}));

export default function ChildNeeds({ theChild, needsArray }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // [[urgent], [growth], ...]
  // const [needsArray, setNeedsArray] = useState([[], [], [], [], [], []]);
  const [category, setCategory] = useState(0);
  const [activeCat, setActiveCat] = useState();
  // const [loadingChip, setLoadingChip] = useState(false);
  const [inCart, setInCart] = useState({});

  const childNeeds = useSelector((state) => state.childNeeds);
  const { success, loading } = childNeeds;

  // To set the first available category to the active one
  useEffect(() => {
    if (!category) {
      if (needsArray[0][0]) {
        setCategory(0); // urgent
        setActiveCat(0);
      } else if (needsArray[1][0]) {
        setCategory(1); // growth 0
        setActiveCat(1);
      } else if (needsArray[2][0]) {
        setCategory(2); // joy 1
        setActiveCat(2);
      } else if (needsArray[3][0]) {
        setCategory(3); // health 2
        setActiveCat(3);
      } else if (needsArray[4][0]) {
        setCategory(4); // surroundings 3
        setActiveCat(4);
      } else if (needsArray[5][0]) {
        setCategory(5); // done
        setActiveCat(5);
      }
    }
  }, [needsArray, category]);

  const handleNeedCardClick = (needId, childId) => {
    dispatch({ type: SHAPARAK_RESET });
    navigate(`/child/${childId}/needs/${needId}`, { childTab: 1 }); // state: to use when going back
  };

  const handleClick = (index) => {
    setCategory(index);
    setActiveCat(index);
  };

  const classes = useStyles();

  const renderNeedsByCategory = () => (
    <>
      {!needsArray ? (
        <CircularProgress />
      ) : (
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
              inCart={inCart}
              setInCart={setInCart}
              key={need.id}
              handleNeedCardClick={handleNeedCardClick}
              need={need}
              childId={theChild.id}
            />
          ))}
        </Stack>
      )}
    </>
  );

  return (
    <>
      {loading || !success || !needsArray[0] ? (
        <CircularProgress />
      ) : (
        <>
          {needsArray && (
            <Grid sx={{ width: '100%' }}>
              <Box
                sx={{
                  overflowX: 'scroll',
                  paddingLeft: 2,
                  paddingRight: 2,
                  height: '50px',
                }}
              >
                <Stack direction="row">
                  {needsArray[0][0] && (
                    <Chip
                      label={t('childData.needCategory.urgent')}
                      className={activeCat !== 0 ? classes.chip : classes.chipActive}
                      variant="outlined"
                      onClick={() => handleClick(0)}
                    />
                  )}
                  {needsArray[1][0] && (
                    <Chip
                      label={t('childData.needCategory.growth')}
                      className={activeCat !== 1 ? classes.chip : classes.chipActive}
                      variant="outlined"
                      onClick={() => handleClick(1)}
                    />
                  )}
                  {needsArray[2][0] && (
                    <Chip
                      label={t('childData.needCategory.joy')}
                      className={activeCat !== 2 ? classes.chip : classes.chipActive}
                      variant="outlined"
                      onClick={() => handleClick(2)}
                    />
                  )}
                  {needsArray[3][0] && (
                    <Chip
                      label={t('childData.needCategory.health')}
                      className={activeCat !== 3 ? classes.chip : classes.chipActive}
                      variant="outlined"
                      onClick={() => handleClick(3)}
                    />
                  )}
                  {needsArray[4][0] && (
                    <Chip
                      label={t('childData.needCategory.surroundings')}
                      onClick={() => handleClick(4)}
                      variant="outlined"
                      className={activeCat !== 4 ? classes.chip : classes.chipActive}
                    />
                  )}
                  {needsArray[5][0] && (
                    <Chip
                      label={t('childData.needCategory.done')}
                      onClick={() => handleClick(5)}
                      variant="outlined"
                      className={activeCat !== 5 ? classes.chip : classes.chipActive}
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

ChildNeeds.propTypes = {
  theChild: PropTypes.object.isRequired,
  needsArray: PropTypes.array.isRequired,
};
