/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, LinearProgress, Stack, Tooltip } from '@mui/material';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import TollIcon from '@mui/icons-material/Toll';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFamilyMemberDistanceRatio,
  fetchFamilyRolesCompletePays,
} from '../../redux/actions/main/daoAction';

const InfoCard = () => {
  const { t } = useTranslation();

  const [awaitingSignature, setAwaitingSignature] = useState(0);
  const dispatch = useDispatch();

  const readySigningNeeds = useSelector((state) => state.readySigningNeeds);
  const { readyNeeds } = readySigningNeeds;

  const familyRolesEco = useSelector((state) => state.familyRolesEco);
  const { userResult, success: successFamilyAnalytic } = familyRolesEco;

  const minedCount = 0;

  useEffect(() => {
    if (userResult) {
      setAwaitingSignature(
        userResult.theUser.fatherCompletePay +
          userResult.theUser.motherCompletePay +
          userResult.theUser.amooCompletePay +
          userResult.theUser.daeiCompletePay +
          userResult.theUser.khalehCompletePay +
          userResult.theUser.ammeCompletePay -
          readyNeeds.length,
      );
    }
  }, [userResult]);

  useEffect(() => {
    if (!successFamilyAnalytic) {
      dispatch(fetchFamilyRolesCompletePays());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchFamilyMemberDistanceRatio());
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
            <Grid item lg={4} sm={12} xs={12} sx={{ order: { xs: '2', sm: '2', lg: '1' } }}>
              <Grid
                container
                spacing={0}
                sx={{ mt: { xs: 1 }, mb: { xs: 1 } }}
                justifyContent="center"
              >
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <Tooltip
                    title={
                      <Typography sx={{ fontSize: 12 }}>
                        {t('dao.signaturesTab.tooltip.waiting')}
                      </Typography>
                    }
                  >
                    <div>
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
                    </div>
                  </Tooltip>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <Tooltip
                    title={
                      <Typography sx={{ fontSize: 12 }}>
                        {t('dao.signaturesTab.tooltip.ready')}
                      </Typography>
                    }
                  >
                    <div>
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
                    </div>
                  </Tooltip>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <Tooltip
                    title={
                      <Typography sx={{ fontSize: 12 }}>
                        {t('dao.signaturesTab.tooltip.mined')}
                      </Typography>
                    }
                  >
                    <div>
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
                    </div>
                  </Tooltip>
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
