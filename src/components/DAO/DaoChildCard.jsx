import React from 'react';
import { Card, CardContent, Typography, Box, Fab, Button } from '@mui/material';
import imgsvg from '../../resources/dao-card-background.svg';

const DaoChildCard = () => (
  <Card
    elevation={0}
    // sx={{
    //   position: 'relative',
    //   backgroundColor: (theme) =>
    //     `${theme.palette.mode === 'dark' ? '#32363e' : ''}`,
    //   '&:before': {
    //     content: `""`,
    //     position: 'absolute',
    //     left: (theme) => `${theme.direction === 'rtl' ? 'unset' : '0'}`,
    //     right: (theme) => `${theme.direction === 'rtl' ? '0' : 'unset'}`,
    //     width: '100%',
    //     height: '100%',
    //     background: `url(${imgsvg})`,
    //     backgroundRepeat: 'no-repeat',
    //     backgroundSize: 'cover',
    //     transform: (theme) =>
    //       `${theme.direction === 'rtl' ? 'scaleX(-1)' : 'unset'}`,
    //     backgroundPosition: (theme) =>
    //       `${
    //         theme.direction === 'rtl' ? 'right 19px center' : 'left 70px center'
    //       }`,
    //   },

    //   borderWidth: '0px',
    // }}
  >
    <CardContent>
      <Box display="flex" alignItems="center">
        <Box>
          <Typography fontWeight="700" variant="h4" color="textSecondary">
            Earnings
          </Typography>
          <Typography variant="h3">$63,438.78</Typography>
        </Box>
        <Box
          sx={{
            ml: 'auto',
          }}
        >
          <Fab
            elevation="0"
            color="secondary"
            aria-label="dollar"
            sx={{
              color: '#fff',
              width: '48px',
              height: '48px',
            }}
          >
            {/* <FeatherIcon icon="dollar-sign" width="24" height="24" /> */}
          </Fab>
        </Box>
      </Box>
      <Button
        sx={{
          marginTop: '15px',
        }}
        variant="contained"
        color="primary"
      >
        Download
      </Button>
    </CardContent>
  </Card>
);

export default DaoChildCard;
