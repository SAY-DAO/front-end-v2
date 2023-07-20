/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  useMediaQuery,
  Skeleton,
  LinearProgress,
  Stack,
} from '@mui/material';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import TollIcon from '@mui/icons-material/Toll';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import { useTranslation } from 'react-i18next';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import HardwareIcon from '@mui/icons-material/Hardware';
import { useDispatch, useSelector } from 'react-redux';
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
  useSignMessage,
} from 'wagmi';
import LogoutIcon from '@mui/icons-material/Logout';
// import { SiweMessage } from 'siwe';
import spring from '../../resources/images/cover/spring.jpeg';
import summer from '../../resources/images/cover/summer.jpeg';
import autumn from '../../resources/images/cover/autumn.jpeg';
import winter from '../../resources/images/cover/winter.jpeg';
import { FlaskUserTypesEnum } from '../../utils/types';
import {
  persianDay,
  persianMonth,
  persianMonthString,
  persianYear,
} from '../../utils/persianToEnglish';
import WalletDialog from '../modals/WalletDialog';
import {
  fetchNonce,
  fetchWalletInformation,
  walletVerify,
} from '../../redux/actions/blockchainAction';
import WalletButton from '../wallet/WalletButton';
import MessageWallet from '../MessageWallet';
import { WALLET_INFORMATION_RESET, WALLET_VERIFY_RESET } from '../../redux/constants/daoConstants';
import { daysDifference } from '../../utils/helpers';

const CoverCard = ({
  theUser,
  needCount,
  childCount,
  signatureCount,
  swInfo,
  arrivals,
  skeleton,
  setSkeleton,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [cover, setCover] = useState(null);
  const [openWallets, setOpenWallets] = useState(false);
  const [values, setValues] = useState();
  const [walletToastOpen, setWalletToastOpen] = useState(false);
  // const [dateList, setDateList] = useState();
  const [height, setHeight] = useState(306.8);
  // // wallet
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { reset, status, error: errorSignIn, isSuccess, signMessageAsync } = useSignMessage();
  const { data: ensAvatar } = useEnsAvatar({ address });
  const { data: ensName } = useEnsName({ address });
  const { disconnect } = useDisconnect();

  // const walletNonce = useSelector((state) => state.walletNonce);
  // const { nonceData, error: errorWalletNonce } = walletNonce;

  // const { verifiedNonce, error: errorVerify } = useSelector((state) => state.walletVerify);

  // const { error: errorWalletInformation } = useSelector((state) => state.walletInformation);

  // const { error: errorSignature } = useSelector((state) => state.signature);

  // fetch nonce for the wallet siwe
  // useEffect(() => {
  //   if (swInfo) {
  //     dispatch(fetchNonce());
  //   }
  // }, [swInfo]);

  // // toast
  // useEffect(() => {
  //   if (errorSignIn || errorSignature || errorVerify) {
  //     setWalletToastOpen(true);
  //   }
  // }, [errorSignIn, errorSignature, errorVerify]);

  // // after sign in get sign-in information
  // useEffect(() => {
  //   // Check client and server nonce
  //   const localData = JSON.parse(localStorage.getItem('say-siwe'));
  //   if (nonceData && nonceData.nonce === (localData && localData.nonce)) {
  //     dispatch(fetchWalletInformation());
  //   }
  // }, [verifiedNonce]);

  // useEffect(() => {
  //   if (!errorSignIn && isConnected && nonceData && nonceData.nonce) {
  //     setOpenWallets(false);
  //     const chainId = chain?.id;

  //     if (status === 'loading' || !address || !chainId) return;
  //     // Check client and server nonce
  //     const localData = JSON.parse(localStorage.getItem('say-siwe'));
  //     if (nonceData.nonce === (localData && localData.nonce)) {
  //       return;
  //     }
  //     // Create SIWE message with pre-fetched nonce and sign with wallet
  //     const message = new SiweMessage({
  //       domain: window.location.host,
  //       address,
  //       statement: 'Sign in WITH Ethereum Wallet',
  //       uri: window.location.origin,
  //       version: '1',
  //       chainId,
  //       nonce: nonceData.nonce,
  //     });

  //     const myAsync = async () => {
  //       const preparedMessage = message.prepareMessage();

  //       const result = await signMessageAsync({
  //         message: preparedMessage,
  //         onSuccess(data) {
  //           console.log('Success', data);
  //         },
  //       });

  //       localStorage.setItem(
  //         'say-siwe',
  //         JSON.stringify({
  //           'siwe-signature': result,
  //           nonce: nonceData.nonce,
  //         }),
  //       );

  //       setValues({
  //         signature: result,
  //         message,
  //       });
  //     };
  //     myAsync();
  //   }
  // }, [isConnected, nonceData, errorSignIn]);

  // // Verify signature
  // useEffect(() => {
  //   if (!isSuccess) return;
  //   dispatch(walletVerify(values.message, values.signature));
  // }, [values]);

  // // Disconnect if did not sign in
  // useEffect(() => {
  //   if (
  //     errorSignIn ||
  //     errorVerify ||
  //     errorSignature ||
  //     errorWalletInformation ||
  //     errorWalletNonce
  //   ) {
  //     disconnect();
  //     localStorage.removeItem('say-siwe');
  //   }
  // }, [errorSignIn, errorVerify, errorWalletInformation, errorWalletNonce, errorSignature]);

  // seasonal cover
  useEffect(() => {
    const d = new Date();
    const pm = persianMonthString(d);
    if (pm === 'Farvardin' || pm === 'Ordibehesht' || pm === 'Khordad') {
      setCover(spring);
    }
    if (pm === 'Tir' || pm === 'Mordad' || pm === 'Shahrivar') {
      setCover(summer);
    }
    if (pm === 'Mehr' || pm === 'Aban' || pm === 'Azar') {
      setCover(autumn);
    }
    if (pm === 'Dey' || pm === 'Bahman' || pm === 'Esfand') {
      setCover(winter);
    }
  }, []);

  useEffect(() => {
    if (cover) {
      setSkeleton(false); // cover image skeleton
    }
  }, [cover]);

  const onDisconnect = () => {
    localStorage.removeItem('say-siwe');
    dispatch({ type: WALLET_INFORMATION_RESET });
    dispatch({ type: WALLET_VERIFY_RESET });
    disconnect();
  };

  const handleWalletButton = () => {
    setOpenWallets(true);
    reset();
    dispatch({ type: WALLET_VERIFY_RESET });
    dispatch({ type: WALLET_INFORMATION_RESET });
  };

  // close toast
  const handleCloseWalletToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setWalletToastOpen(false);
  };

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const scrollFunction = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      setHeight(120);
    } else {
      setHeight(306.8);
    }
  };

  // useEffect(() => {
  //   if (document.getElementById('coverImage')) {
  //     scrollFunction();
  //   }
  //   return () => {
  //     window.removeEventListener('scroll', scrollFunction);
  //   };
  // }, [window.onscroll]);

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
      {/* <Grid
        sx={{
          transition: '0.4s',
        }}
      >
        {skeleton ? (
          <Skeleton sx={{ height, m: 'auto' }} animation="wave" variant="rectangular" />
        ) : (
          cover && (
            <img
              id="coverImage"
              style={{ transition: '0.4s', opacity: height < 300 && 0.3 }}
              srcSet={`${cover} 1x, ${cover} 2x`}
              alt="cover"
              width="100%"
            />
          )
        )}
      </Grid> */}
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
                    {needCount >= 0 ? (
                      needCount
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
                    {childCount >= 0 ? (
                      childCount
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
                    {signatureCount >= 0 ? (
                      signatureCount
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
                  <HardwareIcon
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
                    {needCount >= 0 ? (
                      needCount
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
                    {childCount >= 0 ? (
                      childCount
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
                    {signatureCount >= 0 ? (
                      signatureCount
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
            <Grid
              item
              lg={4}
              sm={12}
              xs={12}
              display="flex"
              alignItems="center"
              sx={{
                justifyContent: {
                  sm: 'center',
                  lg: 'flex-end',
                },
                ml: { sm: 4, lg: 0 },
                order: { xs: '3', sm: '3', lg: '3' },
              }}
            >
              <Box
                sx={{
                  display: {
                    sm: 'flex',
                    lg: 'flex',
                    xs: 'block',
                  },
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  textAlign: {
                    xs: 'center',
                  },
                }}
              >
                {/* <Grid container direction="column" spacing={2} sx={{ p: 2 }}>
                <Grid item>
                  <div
                    style={{
                      height: '25px',
                      width: '25px',
                      backgroundColor: '#bbb',
                      borderRadius: '50%',
                      display: 'inline-block',
                      color: 'black',
                      marginTop: 0,
                      textAlign: 'center',
                    }}
                  >
                    S
                  </div>
                </Grid>
              </Grid> */}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </div>

      {/* <WalletDialog openWallets={openWallets} setOpenWallets={setOpenWallets} />
      {(errorVerify || errorWalletInformation || errorSignature || errorSignIn) && (
        <MessageWallet
          walletError={errorVerify || errorWalletInformation || errorSignature || errorSignIn}
          walletToastOpen={walletToastOpen}
          handleCloseWalletToast={handleCloseWalletToast}
          severity={errorSignIn || errorSignature ? 'warning' : 'error'}
        />
      )} */}
    </Card>
  );
};

export default CoverCard;
