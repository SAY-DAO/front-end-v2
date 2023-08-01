import { LoadingButton } from '@mui/lab';
import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { safeFamilyMint } from '../../../redux/actions/main/daoAction';
import { fetchMyHome } from '../../../redux/actions/main/homeAction';

const useStyles = makeStyles({
  root: {
    background: 'transparent',
    padding: '1rem',
    border: 'none !important',
    color: '#00FF80 !important',
    position: 'relative !important',
    backgroundColor: '#0c1016 !important',
  },
});

export default function DaoMint() {
  const dispatch = useDispatch();

  const myHome = useSelector((state) => state.myHome);
  const { success: successHome } = myHome;

  const userDetails = useSelector((state) => state.userDetails);
  const { theUser } = userDetails;

  const signature = useSelector((state) => state.signature);
  const { signature: signatureData } = signature;

  useEffect(() => {
    if (!successHome) {
      dispatch(fetchMyHome());
    }
  }, []);

  const HandleMint = () => {
    dispatch(safeFamilyMint(signatureData.voucher));
  };

  const classes = useStyles();

  return (
    <Grid>
      {!theUser ? (
        <CircularProgress />
      ) : (
        <Card sx={{ maxWidth: '95%', m: 'auto' }}>
          <Box
            sx={{
              width: 300,
              height: 100,
              backgroundColor: 'primary.dark',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
              textAlign: 'center',
            }}
          >
            <Typography gutterBottom variant="h5" sx={{ color: 'white', margin: 'auto' }}>
              {signatureData && signatureData.voucher.needTitle}
            </Typography>
          </Box>
          <CardContent>
            <Grid container direction="column">
              <Grid item>
                <Typography gutterBottom variant="h5" component="div">
                  {!signatureData ? 'Please sign your need' : 'Ready to mint'}
                </Typography>
              </Grid>
              <Grid item>
                {signatureData && (
                  <LoadingButton onClick={HandleMint} className={classes.root}>
                    Mint
                  </LoadingButton>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </Grid>
  );
}
