import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, LinearProgress } from '@mui/material';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import {
  fetchFamilyMemberDistanceRatio,
  fetchEcoFamilyRolesCompletePays,
} from '../../redux/actions/main/daoAction';
import MessageWallet from '../MessageWallet';
import CustomToolTip from './CustomToolTip';

const SignatureInfoCard = () => {
  const { t } = useTranslation();

  const [walletToastOpen, setWalletToastOpen] = useState(false);

  const dispatch = useDispatch();

  const needVariables = useSelector((state) => state.needVariables);
  const { userResult, success: successOneNeedData, error: errorOneNeedData } = needVariables;

  const paidNeeds = useSelector((state) => state.paidNeeds);
  const { paidNeedsData } = paidNeeds;

  useEffect(() => {
    if (!successOneNeedData) {
      dispatch(fetchEcoFamilyRolesCompletePays());
    }
  }, []);

  useEffect(() => {
    if (!userResult) {
      dispatch(fetchFamilyMemberDistanceRatio());
    }
  }, []);

  // toast
  useEffect(() => {
    if (errorOneNeedData) {
      setWalletToastOpen(true);
    }
  }, [errorOneNeedData]);

  // close toast
  const handleCloseWalletToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setWalletToastOpen(false);
  };
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
                  <CustomToolTip
                    title={t('dao.signaturesTab.waiting')}
                    popup={
                      <>
                        {t('dao.signaturesTab.tooltip.waiting')}
                        <br />
                        <br />
                        {userResult && userResult.theUser ? (
                          <span style={{ fontWeight: 300 }}>
                            <Trans i18nKey="dao.signaturesTab.tooltip.waiting2">
                              {{
                                father: userResult && userResult.theUser.fatherCompletePay,
                                mother: userResult && userResult.theUser.motherCompletePay,
                                amoo: userResult && userResult.theUser.amooCompletePay,
                                khaleh: userResult && userResult.theUser.khalehCompletePay,
                                daei: userResult && userResult.theUser.daeiCompletePay,
                                amme: userResult && userResult.theUser.ammeCompletePay,
                              }}
                            </Trans>
                          </span>
                        ) : (
                          <Stack
                            sx={{ m: 'auto', width: '20%', color: 'grey.500', mt: 3 }}
                            spacing={2}
                          >
                            <LinearProgress sx={{ color: (theme) => theme.palette.primary }} />
                          </Stack>
                        )}
                      </>
                    }
                    icon={
                      <TimerOutlinedIcon
                        fontSize="medium"
                        sx={{ mb: 0, color: (theme) => theme.palette.grey.A400 }}
                      />
                    }
                    which="signWaiting"
                  />
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <CustomToolTip
                    title={t('dao.signaturesTab.ready')}
                    popup={
                      <>
                        {t('dao.signaturesTab.tooltip.ready')}
                        <br />
                        <br />
                        {paidNeedsData && paidNeedsData.readyNeedsList ? (
                          <span style={{ fontWeight: 300 }}>
                            <Trans i18nKey="dao.signaturesTab.tooltip.ready2">
                              {{
                                ready: paidNeedsData.readyNeedsList.length - paidNeedsData.signed,
                              }}
                            </Trans>
                            <br />
                            <br />
                            {t('dao.smartContract')}
                            <Link
                              target="_blank"
                              to="https://etherscan.io/address/0xae9ae5acdad18927bd039ebbfdb8e3be4dbf5de3"
                            >
                              {t('dao.link')}
                            </Link>
                          </span>
                        ) : (
                          <Stack
                            sx={{ m: 'auto', width: '20%', color: 'grey.500', mt: 3 }}
                            spacing={2}
                          >
                            <LinearProgress sx={{ color: (theme) => theme.palette.primary }} />
                          </Stack>
                        )}
                      </>
                    }
                    icon={
                      <AlarmOnIcon
                        fontSize="medium"
                        sx={{ mb: 0, color: (theme) => theme.palette.grey.A400 }}
                      />
                    }
                    which="signReady"
                  />
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <CustomToolTip
                    title={t('dao.signaturesTab.signed')}
                    popup={<>{t('dao.signaturesTab.tooltip.signed')}</>}
                    icon={
                      <HandshakeOutlinedIcon
                        fontSize="medium"
                        sx={{ mb: 0, color: (theme) => theme.palette.grey.A400 }}
                      />
                    }
                    which="signed"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </div>
      {errorOneNeedData && (
        <MessageWallet
          walletError={errorOneNeedData}
          walletToastOpen={walletToastOpen}
          handleCloseWalletToast={handleCloseWalletToast}
          severity="error"
        />
      )}
    </Card>
  );
};

export default SignatureInfoCard;
