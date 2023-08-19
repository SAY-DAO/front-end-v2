/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, LinearProgress, Stack } from '@mui/material';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import TollIcon from '@mui/icons-material/Toll';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import { useTranslation } from 'react-i18next';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import HardwareOutlinedIcon from '@mui/icons-material/HardwareOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFamilyMemberAnalytic } from '../../redux/actions/main/daoAction';

const InfoCard = () => {
  const { t } = useTranslation();

  const [awaitingSignature, setAwaitingSignature] = useState();
  const dispatch = useDispatch();

  const readySigningNeeds = useSelector((state) => state.readySigningNeeds);
  const { readyNeeds } = readySigningNeeds;

  const familyAnalytics = useSelector((state) => state.familyAnalytics);
  const { result, success: successFamilyAnalytic } = familyAnalytics;

  const minedCount = 0;
  const difficultyRatio = null;
  const needRatio = null;

  useEffect(() => {
    if (result) {
      setAwaitingSignature(
        result.theUser.fatherCompletePay +
          result.theUser.motherCompletePay +
          result.theUser.amooCompletePay +
          result.theUser.daeiCompletePay +
          result.theUser.khalehCompletePay +
          result.theUser.ammeCompletePay -
          readyNeeds.length,
      );
    }
  }, [result]);

  useEffect(() => {
    if (!successFamilyAnalytic) {
      dispatch(fetchFamilyMemberAnalytic());
    }
  }, []);

  return (
    <Card
      elevation={0}
      sx={{
        padding: '0',
        width: '100%',
        backgroundColor: 'transparent',
      }}
    >
      <div>
        <CardContent
          sx={{
            pt: '12px',
            pb: '0.8rem !important',
          }}
        >
          {/* infos */}
          <Grid container spacing={0}>
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              sx={{
                order: {
                  xs: '2',
                  sm: '2',
                  lg: '1',
                },
              }}
            >
              <Grid
                container
                spacing={0}
                sx={{ mt: { xs: 1 }, mb: { xs: 1 } }}
                justifyContent="center"
              >
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <HourglassTopIcon
                    fontSize="medium"
                    sx={{ mb: 0, color: (theme) => theme.palette.grey.A400 }}
                  />
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    sx={{
                      lineHeight: '1.2',
                      fontSize: 14,
                    }}
                  >
                    {awaitingSignature || (
                      <Stack sx={{ m: 'auto', width: '20%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress sx={{ color: (theme) => theme.palette.primary }} />
                      </Stack>
                    )}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    fontWeight="400"
                    sx={{
                      lineHeight: '1.2',
                      fontSize: 10,
                      mt: 1,
                    }}
                  >
                    {t('dao.signaturesTab.waiting')}
                  </Typography>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <HandshakeOutlinedIcon
                    fontSize="medium"
                    sx={{ mb: 0, color: (theme) => theme.palette.grey.A400 }}
                  />
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    sx={{
                      lineHeight: '1.2',
                      fontSize: 14,
                    }}
                  >
                    {readyNeeds.length >= 0 ? (
                      readyNeeds.length
                    ) : (
                      <Stack sx={{ m: 'auto', width: '20%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress sx={{ color: (theme) => theme.palette.primary }} />
                      </Stack>
                    )}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      lineHeight: '1.2',
                      fontSize: 10,
                      mt: 1,
                    }}
                  >
                    {t('dao.signaturesTab.ready')}
                  </Typography>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <TollIcon
                    fontSize="medium"
                    sx={{ mb: 0, color: (theme) => theme.palette.grey.A400 }}
                  />
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    sx={{
                      lineHeight: '1.2',
                      fontSize: 14,
                    }}
                  >
                    {minedCount >= 0 ? (
                      minedCount
                    ) : (
                      <Stack sx={{ m: 'auto', width: '20%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress sx={{ color: (theme) => theme.palette.primary }} />
                      </Stack>
                    )}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      lineHeight: '1.2',
                      fontSize: 10,
                      mt: 1,
                    }}
                  >
                    {t('dao.signaturesTab.mined')}
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={0}
                sx={{
                  mt: 2,
                  mb: {
                    xs: 1,
                  },
                }}
                justifyContent="center"
              >
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <HardwareOutlinedIcon
                    fontSize="medium"
                    sx={{ mb: 0, color: (theme) => theme.palette.grey.A400 }}
                  />
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    sx={{
                      lineHeight: '1.2',
                      fontSize: 14,
                    }}
                  >
                    {difficultyRatio >= 0 ? (
                      difficultyRatio
                    ) : (
                      <Stack sx={{ m: 'auto', width: '20%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress sx={{ color: (theme) => theme.palette.primary }} />
                      </Stack>
                    )}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    fontWeight="400"
                    sx={{
                      lineHeight: '1.2',
                      fontSize: 10,
                      mt: 1,
                    }}
                  >
                    {t('dao.signaturesTab.difficulty')}
                  </Typography>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <SocialDistanceIcon
                    fontSize="medium"
                    sx={{ mb: 0, color: (theme) => theme.palette.grey.A400 }}
                  />
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    sx={{
                      lineHeight: '1.2',
                      fontSize: 14,
                    }}
                  >
                    {result && result.theUser.distanceRatio.avg ? (
                      result.theUser.distanceRatio.avg.toFixed(2)
                    ) : (
                      <Stack sx={{ m: 'auto', width: '20%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress sx={{ color: (theme) => theme.palette.primary }} />
                      </Stack>
                    )}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      lineHeight: '1.2',
                      fontSize: 10,
                      mt: 1,
                    }}
                  >
                    {t('dao.signaturesTab.distance')}
                  </Typography>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <InterestsOutlinedIcon
                    fontSize="medium"
                    sx={{ mb: 0, color: (theme) => theme.palette.grey.A400 }}
                  />
                  <Typography
                    variant="h4"
                    fontWeight="600"
                    sx={{
                      lineHeight: '1.2',
                      fontSize: 14,
                    }}
                  >
                    {needRatio >= 0 ? (
                      needRatio
                    ) : (
                      <Stack sx={{ m: 'auto', width: '20%', color: 'grey.500' }} spacing={2}>
                        <LinearProgress sx={{ color: (theme) => theme.palette.primary }} />
                      </Stack>
                    )}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      lineHeight: '1.2',
                      fontSize: 10,
                      mt: 1,
                    }}
                  >
                    {t('dao.signaturesTab.needRatio')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </div>
    </Card>
  );
};

export default InfoCard;
