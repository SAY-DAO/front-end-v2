import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Grid,
  Avatar,
  Stack,
  CircularProgress,
  Card,
  CardActionArea,
  makeStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChildNeeds } from '../../actions/childAction';

const useStyles = makeStyles(() => ({
  imageUrl: {
    width: 55,
    height: 55,
    backgroundColor: '#FDE1C1',
    margin: 'auto',
  },
  theCard: {
    marginBottom: 10,
    padding: 10,
    minHeight: '70px',
  },
  needName: {
    textAlign: 'right',
    padding: 5,
    margin: 'auto',
  },
  actionArea: {
    width: '100%',
    margin: 0,
    padding: 0,
  },
}));

export default function ChildNeedCard({ theChild }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const childNeeds = useSelector((state) => state.childNeeds);
  const { theNeeds, success, loading } = childNeeds;

  useEffect(() => {
    if (!success) {
      dispatch(fetchChildNeeds(theChild.id));
    }
  }, [dispatch, success, theChild]);

  const handleNeedPage = () => {
    console.log('hi');
  };

  const classes = useStyles();

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack direction="column" spacing={1}>
          {theNeeds &&
            theNeeds.needs.map((need) => (
              <Card key={need.id} elevation={4} className={classes.theCard}>
                <CardActionArea
                  className={classes.actionArea}
                  onClick={() => handleNeedPage(need)}
                >
                  <Grid
                    container
                    item
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Grid
                      container
                      item
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-end"
                      xs={7}
                    >
                      <Grid item xs sx={{ display: 'flex' }}>
                        <Typography variant="body1">{need.cost}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={3} className={classes.needName}>
                      <Typography variant="body1">{need.progress}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Avatar
                        src={need.imageUrl}
                        className={classes.imageUrl}
                      />
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Card>
            ))}
        </Stack>
      )}
    </>
  );
}

ChildNeedCard.propTypes = {
  theChild: PropTypes.object.isRequired,
};
