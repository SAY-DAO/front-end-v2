import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, LinearProgress } from '@mui/material';
import TollIcon from '@mui/icons-material/Toll';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';
import MessageWallet from '../MessageWallet';
import CustomToolTip from './CustomToolTip';

const MintInfoCard = () => {
  const { t } = useTranslation();

  const [walletToastOpen, setWalletToastOpen] = useState(false);

  const ecosystemMintData = useSelector((state) => state.ecosystemMintData);
  const { mintEcoResult, error: errorMintEcosystem } = ecosystemMintData;

  // toast
  useEffect(() => {
    if (errorMintEcosystem) {
      setWalletToastOpen(true);
    }
  }, [errorMintEcosystem]);

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
                    title={t('dao.mintTab.waiting')}
                    popup={
                      <>
                        {t('dao.mintTab.tooltip.waiting')}
                        <br />
                        <br />
                        {mintEcoResult && mintEcoResult.theUser ? (
                          <span style={{ fontWeight: 300 }}>
                            <Trans i18nKey="dao.mintTab.tooltip.waiting2">
                              {{
                                waiting: mintEcoResult.theUser.waiting,
                              }}
                            </Trans>
                            <Link target="_blank" to="https://ipfs.tech/#how">
                              {t('dao.link')}
                            </Link>
                            {t('dao.mintTab.tooltip.waiting3')}
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
                    which="mintWaiting"
                  />
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <CustomToolTip
                    title={t('dao.mintTab.ready')}
                    popup={
                      <>
                        {t('dao.mintTab.tooltip.ready')}
                        <br />
                        <br />
                        {mintEcoResult && mintEcoResult.ecosystem ? (
                          <span style={{ fontWeight: 300 }}>
                            <Trans i18nKey="dao.mintTab.tooltip.ready2">
                              {{
                                ready: mintEcoResult.theUser.ready,
                                paidEco: mintEcoResult.ecosystem.waiting,
                                readyEco: mintEcoResult.ecosystem.mined,
                              }}
                            </Trans>
                            <br />
                            <br />
                            {t('dao.smartContract')}
                            {t('dao.smartContractNotReady')}
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
                    which="mintReady"
                  />
                </Grid>
                <Grid item xs={3} sx={{ textAlign: 'center' }}>
                  <CustomToolTip
                    title={t('dao.mintTab.mined')}
                    popup={<>{t('dao.mintTab.tooltip.mined')}</>}
                    icon={
                      <TollIcon
                        fontSize="medium"
                        sx={{ mb: 0, color: (theme) => theme.palette.grey.A400 }}
                      />
                    }
                    which="mined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </div>
      {errorMintEcosystem && (
        <MessageWallet
          walletError={errorMintEcosystem}
          walletToastOpen={walletToastOpen}
          handleCloseWalletToast={handleCloseWalletToast}
          severity="error"
        />
      )}
    </Card>
  );
};

export default MintInfoCard;
