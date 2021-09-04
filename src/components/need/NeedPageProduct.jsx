import React, { useState } from 'react';
import {
  Grid,
  Typography,
  CardContent,
  CardMedia,
  Skeleton,
  Card,
  Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  progressBar: {
    width: '100%',
    margin: 2,
  },
  percentage: {
    color: '#f05a31',
    fontWeight: 500,
    fontSize: '12px',
    padding: '10px',
  },
  theCard1: {
    margin: 1,
    width: '75%',
    textAlign: 'center',
    padding: 5,

    borderRadius: 5,
  },
  theCard2: {
    textAlign: 'center',
    width: '23%',
    padding: 5,
    borderRadius: 5,
  },
});
export default function NeedPageProduct({ oneNeed }) {
  const [imageSkeleton, setImageSkeleton] = useState(true);

  return (
    <>
      <Grid item>
        <Card
          sx={{
            display: 'flex',
            marginLeft: 2,
            marginRight: 2,
          }}
        >
          <CardMedia
            component="img"
            sx={
              imageSkeleton
                ? {
                    display: 'none',
                  }
                : {
                    width: 100,
                  }
            }
            image={oneNeed.img}
            alt="Need image"
            onLoad={() => setImageSkeleton(false)}
          />
          <Skeleton
            sx={
              imageSkeleton
                ? {
                    width: 100,
                    height: 100,
                    margin: 1,
                  }
                : {
                    display: 'none',
                  }
            }
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography variant="subtitle2" sx={{ minWidth: '150px' }}>
                {oneNeed.title}
              </Typography>
              <Typography variant="subtitle2">{oneNeed.cost}</Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </>
  );
}

NeedPageProduct.propTypes = {
  oneNeed: PropTypes.object,
};
