/* eslint-disable react/prop-types */
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

const CoverCard = () => {
  const { t } = useTranslation();

  const [height, setHeight] = useState(306.8);

  const dispatch = useDispatch();

  const signingNeeds = useSelector((state) => state.signingNeeds);
  const { readyNeeds } = signingNeeds;

  const familyAnalytics = useSelector((state) => state.familyAnalytics);
  const {
    paidNeedsCount,
    minedCount,
    difficultyRatio,
    distanceRatio,
    needRatio,
    success: successFamilyAnalytic,
  } = familyAnalytics;

  useEffect(() => {
    if (!successFamilyAnalytic) {
      dispatch(fetchFamilyMemberAnalytic());
    }
  }, []);

  const scrollFunction = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      setHeight(120);
    } else {
      setHeight(306.8);
    }
  };

  window.addEventListener('scroll', scrollFunction);
  return (
    <Card
      elevation={0}
      sx={{
        padding: '0',
        width: '100%',
        backgroundColor: 'transparent',
      }}
    >
      <div
        style={{
          display: height < 250 && 'none',
          transition: '0.8s',
        }}
      >
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
                sx={{
                  mt: {
                    xs: 1,
                  },
                  mb: {
                    xs: 1,
                  },
                }}
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
                    {paidNeedsCount - readyNeeds.length >= 0 ? (
                      paidNeedsCount - readyNeeds.length
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
                    {distanceRatio >= 0 ? (
                      distanceRatio
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

export default CoverCard;
