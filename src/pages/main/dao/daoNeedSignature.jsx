import {
  Avatar,
  Card,
  CircularProgress,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { grey } from '@mui/material/colors';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSignMessage,
  useWalletClient,
} from 'wagmi';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HardwareOutlinedIcon from '@mui/icons-material/HardwareOutlined';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import { round } from 'lodash';
import { SiweMessage } from 'siwe';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  fetchFamilyMemberDistanceRatio,
  fetchEcoFamilyRolesCompletePays,
  fetchNeedCoefficients,
  fetchNonce,
  fetchOneReadySignNeed,
  fetchWalletInformation,
  signTransaction,
  walletVerify,
} from '../../../redux/actions/main/daoAction';
import DurationTimeLine from '../../../components/DAO/signing/DurationTimeLine';
import {
  changePersianNumbersToEnglish,
  getSAYRoleString,
  prepareUrl,
} from '../../../utils/helpers';
import WalletButton from '../../../components/WalletButton';
import WalletDialog from '../../../components/modals/WalletDialog';
import {
  FAMILY_DISTANCE_RATIO_REST,
  FAMILY_ECOSYSTEM_PAYS_REST,
  ONE_NEED_COEFFS_RESET,
  READY_TO_SIGN_ONE_NEED_RESET,
  SIGNATURE_RESET,
  SIGNATURE_VERIFICATION_RESET,
  WALLET_INFORMATION_RESET,
  WALLET_VERIFY_RESET,
} from '../../../redux/constants/daoConstants';
import DaoSignatureMenu from '../../../components/DAO/signing/DaoSignatureMenu';
import { SAYPlatformRoles, VirtualFamilyRole } from '../../../utils/types';
import { SAY_DAPP_ID } from '../../../utils/configs';
import Message from '../../../components/Message';
import MessageWallet from '../../../components/MessageWallet';
import CommentModal from '../../../components/modals/CommentModal';
import CommentDrawer from '../../../components/DAO/signing/CommentDrawer';

export default function DaoNeedSignature() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { needId } = useParams();

  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loadingEthereumSignature, setLoadingEthereumSignature] = useState(false);
  const [comment, setComment] = useState();
  const [commentOpen, setCommentOpen] = useState(false);
  const [userVRole, setUserVRole] = useState('');
  const [openWallets, setOpenWallets] = useState(false);
  const [theNeed, setTheNeed] = useState();
  const [images, setImages] = useState(false);
  const [values, setValues] = useState();
  const [signatureError, setSignatureError] = useState('');
  const [walletToastOpen, setWalletToastOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState();
  const [test, settest] = useState();
  const {
    status,
    isLoading: isLoadingSignIn,
    error: errorSignIn,
    isSuccess,
    signMessageAsync,
    reset,
  } = useSignMessage();

  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { isLoading, pendingConnector } = useConnect();

  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const readySigningOneNeed = useSelector((state) => state.readySigningOneNeed);
  const { oneReadyNeed, error: errorReadyOne } = readySigningOneNeed;

  const commentResult = useSelector((state) => state.commentResult);
  const { created } = commentResult;

  const ecosystemData = useSelector((state) => state.ecosystemData);
  const {
    coeffsResult,
    userResult,
    success: successEcosystem,
    error: errorEcosystem,
  } = ecosystemData;

  const { nonceData, error: errorWalletNonce } = useSelector((state) => state.walletNonce);
  const { information, loading: loadingInformation } = useSelector(
    (state) => state.walletInformation,
  );

  const { loading: loadingVerifiedSwAddress, success: successVerifiedSwAddress } = useSelector(
    (state) => state.signatureVerification,
  );
  const { verifiedNonce, error: errorVerify } = useSelector((state) => state.walletVerify);
  const { error: errorWalletInformation } = useSelector((state) => state.walletInformation);
  const {
    signature,
    loading: loadingSignature,
    error: errorSignature,
  } = useSelector((state) => state.signature);

  // fetch nonce for the wallet siwe
  useEffect(() => {
    if (userInfo && userInfo.user.id) {
      dispatch(fetchNonce());
    }
  }, [userInfo]);

  // after sign in get sign-in information
  useEffect(() => {
    // Check client and server nonce
    const localData = JSON.parse(localStorage.getItem('say-siwe'));
    if (nonceData && nonceData.nonce === (localData && localData.nonce)) {
      dispatch(fetchWalletInformation());
    }
  }, [verifiedNonce]);

  // keep the button loading going when has not sign in and wallet is open
  useEffect(() => {
    if (information) {
      setLoadingEthereumSignature(false);
    }
  }, [information]);

  useEffect(() => {
    if (!errorSignIn && isConnected && nonceData && nonceData.nonce) {
      setOpenWallets(false);
    }
  }, [nonceData, errorSignIn]);

  // siwe
  useEffect(() => {
    if (!errorSignIn && isConnected && nonceData && nonceData.nonce) {
      setOpenWallets(false);
      setLoadingEthereumSignature(false);
      const chainId = chain?.id;

      if (status === 'loading' || !address || !chainId) return;
      // Check client and server nonce
      const localData = JSON.parse(localStorage.getItem('say-siwe'));
      console.log(nonceData.nonce);
      console.log(localData);
      if (nonceData.nonce === (localData && localData.nonce)) {
        return;
      }
      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in Ethereum Wallet',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: nonceData.nonce,
      });
      const myAsync = async () => {
        try {
          const preparedMessage = message.prepareMessage();
          const result = await signMessageAsync({
            message: preparedMessage,
          });

          localStorage.setItem(
            'say-siwe',
            JSON.stringify({
              'siwe-signature': result,
              nonce: nonceData.nonce,
            }),
          );

          setValues({
            signature: result,
            message,
          });
        } catch (e) {
          console.log({
            message: e.details,
            code: e.code,
          });
          setSignatureError({
            message: e.details,
            code: e.code,
          });
          dispatch(fetchNonce());
        }
      };
      myAsync();
    }
  }, [isConnected, nonceData, errorSignIn]);

  // Verify signature
  useEffect(() => {
    if (!isSuccess) return;
    dispatch(walletVerify(values.message, values.signature));
  }, [values]);

  // Disconnect if did not sign in
  useEffect(() => {
    if (
      errorSignIn ||
      errorVerify ||
      errorSignature ||
      errorWalletInformation ||
      errorWalletNonce
    ) {
      disconnect();
      localStorage.removeItem('say-siwe');
    }
  }, [errorSignIn, errorVerify, errorWalletInformation, errorWalletNonce, errorSignature]);

  useEffect(() => {
    if (!successEcosystem) {
      dispatch(fetchEcoFamilyRolesCompletePays());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchOneReadySignNeed(needId));
    return () => {
      dispatch({ type: ONE_NEED_COEFFS_RESET });
      if (
        errorEcosystem ||
        errorReadyOne ||
        errorSignIn ||
        errorVerify ||
        errorSignature ||
        errorWalletInformation ||
        errorWalletNonce
      ) {
        dispatch({ type: FAMILY_ECOSYSTEM_PAYS_REST });
        dispatch({ type: FAMILY_DISTANCE_RATIO_REST });
        dispatch({ type: READY_TO_SIGN_ONE_NEED_RESET });
        dispatch({ type: SIGNATURE_VERIFICATION_RESET });
      }
      dispatch({ type: SIGNATURE_RESET });
    };
  }, [created, signature]);

  useEffect(() => {
    if (oneReadyNeed) {
      setTheNeed(oneReadyNeed);
    }
  }, [oneReadyNeed, created]);

  useEffect(() => {
    if (!userVRole) {
      dispatch(fetchFamilyMemberDistanceRatio());
    }
  }, []);

  useEffect(() => {
    if (theNeed) {
      dispatch(fetchNeedCoefficients(theNeed.id));
    }
    if (theNeed && theNeed.members && theNeed.members.find((m) => m.id_user === userInfo.user.id)) {
      setUserVRole(theNeed.members.find((m) => m.id_user === userInfo.user.id).flaskFamilyRole);
    }
  }, [theNeed]);

  useEffect(() => {
    if (theNeed) {
      const userPayment = theNeed.verifiedPayments.find(
        (p) => p.flaskUserId === userInfo.user.id && p.needAmount > 0,
      );
      const creditRefund = theNeed.verifiedPayments.find(
        (p) => p.flaskUserId === userInfo.user.id && p.creditAmount < 0,
      );
      setPaymentDetails({
        totalAmount: (userPayment.needAmount + userPayment.donationAmount).toLocaleString(),
        creditRefund: creditRefund ? creditRefund.creditAmount : 0,
        userShare:
          userPayment && round((userPayment.needAmount / theNeed.cost) * 100, 2) > 100
            ? 100
            : round((userPayment.needAmount / theNeed.cost) * 100, 2),
        donationAmount: userPayment.donationAmount,
        needAmount: userPayment && userPayment.needAmount.toLocaleString(),
        bankAmount:
          userPayment.needAmount + userPayment.donationAmount + creditRefund &&
          creditRefund.creditAmount,
        bankTrackId: userPayment && userPayment.gatewayTrackId,
      });
    }
  }, [theNeed]);

  const handleWalletButton = () => {
    setOpenWallets(true);
    disconnect();
    reset();
    dispatch({ type: WALLET_VERIFY_RESET });
    dispatch({ type: WALLET_INFORMATION_RESET });
    dispatch({ type: SIGNATURE_RESET });
  };

  const handleSignature = async () => {
    dispatch(
      signTransaction(
        {
          address,
          needId: oneReadyNeed.id,
          flaskNeedId: oneReadyNeed.flaskId,
        },
        walletClient,
        chain.id,
        settest,
      ),
    );
  };

  const handleImageSwipe = () => {
    if (images === true) {
      setImages(false);
    } else {
      setImages(true);
    }
  };

  // toast
  useEffect(() => {
    if (errorSignIn || errorSignature || errorVerify) {
      setWalletToastOpen(true);
    }
  }, [errorSignIn, errorSignature, errorVerify]);

  // close toast
  const handleCloseWalletToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setWalletToastOpen(false);
  };

  const handleComment = () => {
    setCommentOpen(true);
  };

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <Grid container direction="column">
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <DaoSignatureMenu setOpenDrawer={setOpenDrawer} handleComment={handleComment} />
        </Grid>
        <Grid item>
          <IconButton
            onClick={() =>
              navigate('/main/dao/tabs/signature', {
                state: {
                  toggle:
                    oneReadyNeed &&
                    oneReadyNeed.signatures.find((s) => s.flaskUserId === userInfo.user.id)
                      ? 'signed'
                      : 'ready',
                },
              })
            }
          >
            <img
              src="/images/back_orange.svg"
              alt="back"
              style={{
                width: '24px',
                margin: '18px',
                zIndex: 10,
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
      {theNeed ? (
        <>
          <Grid
            item
            sx={{
              position: 'relative',
              width: '100%',
            }}
          >
            <Card
              elevation={3}
              sx={{
                p: 0,
                m: 'auto',
                height: 220,
                width: '60%',
                borderRadius: 10,
                background: !images
                  ? `url(${`${process.env.REACT_APP_GITHUB_IMAGE_SERVE}/${theNeed.midjourneyImage}`})`
                  : `url(${theNeed.needRetailerImg})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 145,
                  left: 'calc(15%  - 0px )',
                  zIndex: 10,
                }}
                onClick={handleImageSwipe}
              >
                <img
                  src={
                    images
                      ? `${process.env.REACT_APP_GITHUB_IMAGE_SERVE}/${theNeed.midjourneyImage}`
                      : theNeed.needRetailerImg
                  }
                  alt="original"
                  style={{
                    padding: !images && 10,
                    boxShadow: 'rgb(157 126 53 / 30%) 0px 3px 5px 2px',
                    backgroundColor: 'white',
                    borderRadius: 100,
                    minHeight: '80px',
                    width: '80px',
                  }}
                />
              </IconButton>
            </Card>
          </Grid>
          <Card
            elevation={0}
            sx={{
              borderTopLeftRadius: 75,
              borderTopRightRadius: 75,
              mt: 4,
              mb: 3,
              bgcolor: '#f7f7f7',
            }}
          >
            <Grid container direction="column" justifyContent="center" sx={{ mt: 3 }}>
              <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
                <Typography sx={{ fontWeight: 400 }} variant="h6">
                  {theNeed.nameTranslations.fa}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 200,
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    maxWidth: '200px',
                    whiteSpace: 'nowrap',
                    m: 'auto',
                  }}
                  variant="body1"
                >
                  {theNeed.title}
                </Typography>
              </Grid>
              <Grid item>
                <Card elevation={1} sx={{ width: 'max-content', m: 'auto', borderRadius: 3, p: 2 }}>
                  <DurationTimeLine need={theNeed} />
                </Card>
              </Grid>
              <Card
                elevation={3}
                sx={{
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                  p: 2,
                  pt: 3,
                  bgcolor: 'white',
                  bottom: 0,
                  mt: 8,
                }}
              >
                <Grid container sx={{ mb: 6 }}>
                  <Grid item xs={6} container direction="column" spacing={2} alignItems="flex-end">
                    <Grid item sx={{ width: '100%' }}>
                      <Typography sx={{ pl: 3, fontWeight: 600 }}>{t('roles.all')}</Typography>
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                      <Divider sx={{ width: '80%', m: 'auto' }} />
                    </Grid>
                    {/*  Social worker */}
                    {theNeed.socialWorker && (
                      <Grid item container sx={{ pt: '10px !important', mt: 1, mb: 1 }}>
                        <Grid item xs={2}>
                          <Avatar
                            alt="social worker"
                            src={prepareUrl(theNeed.socialWorker.avatarUrl)}
                            sx={{
                              bgcolor: grey[300],
                              width: '30px !important',
                              height: '30px !important',
                              borderRadius: 4,
                            }}
                          />
                        </Grid>
                        <Grid item xs={10} sx={{ textAlign: 'center' }}>
                          <Typography sx={{ fontWeight: 400 }}>
                            {t(`roles.${getSAYRoleString(SAYPlatformRoles.SOCIAL_WORKER)}`)}
                          </Typography>
                          <Typography>
                            {theNeed.socialWorker.firstName} {theNeed.socialWorker.lastName}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}

                    <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                      <Divider sx={{ width: '65%', ml: 3 }} />
                    </Grid>
                    {/*  Auditor */}
                    {theNeed.auditor && (
                      <Grid item container sx={{ pt: '10px !important', mt: 1, mb: 1 }}>
                        <Grid item xs={2}>
                          <Avatar
                            alt="auditor"
                            src={prepareUrl(theNeed.auditor.avatarUrl)}
                            sx={{
                              bgcolor: grey[300],
                              width: '30px !important',
                              height: '30px !important',
                              borderRadius: 4,
                            }}
                          />
                        </Grid>
                        <Grid item xs={10} sx={{ textAlign: 'center' }}>
                          <Typography sx={{ fontWeight: 400 }}>
                            {t(`roles.${getSAYRoleString(SAYPlatformRoles.AUDITOR)}`)}
                          </Typography>
                          <Typography>
                            {theNeed.auditor.firstName} {theNeed.auditor.lastName}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                    <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                      <Divider sx={{ width: '65%', ml: 3 }} />
                    </Grid>
                    {/*  Purchaser */}
                    {theNeed.purchaser && (
                      <Grid item container sx={{ pt: '10px !important', mt: 1, mb: 1 }}>
                        <Grid item xs={2}>
                          <Avatar
                            alt="purchaser"
                            src={prepareUrl(theNeed.purchaser.avatarUrl)}
                            sx={{
                              bgcolor: grey[300],
                              width: '30px !important',
                              height: '30px !important',
                              borderRadius: 4,
                            }}
                          />
                        </Grid>
                        <Grid item xs={10} sx={{ textAlign: 'center' }}>
                          <Typography sx={{ fontWeight: 400 }}>
                            {t(`roles.${getSAYRoleString(SAYPlatformRoles.PURCHASER)}`)}
                          </Typography>
                          <Typography>
                            {theNeed.purchaser.firstName} {theNeed.purchaser.lastName}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                    <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                      <Divider sx={{ width: '65%', ml: 3 }} />
                    </Grid>
                    {/*  Family */}
                    {theNeed.verifiedPayments &&
                      theNeed.verifiedPayments.map(
                        (p) =>
                          p.needAmount > 0 &&
                          p.flaskUserId !== SAY_DAPP_ID && (
                            <div key={p.flaskId} style={{ width: '100%', paddingRight: 16 }}>
                              <Grid item container sx={{ pt: '10px !important', mt: 1, mb: 1 }}>
                                <Grid item xs={2}>
                                  <Avatar
                                    alt="virtual family"
                                    src={p.familyMember && prepareUrl(p.familyMember.avatarUrl)}
                                    sx={{
                                      bgcolor: grey[300],
                                      width: '30px !important',
                                      height: '30px !important',
                                      borderRadius: 4,
                                    }}
                                  />
                                </Grid>
                                <Grid item xs={10} sx={{ textAlign: 'center' }}>
                                  <Typography sx={{ fontWeight: 400 }}>
                                    {t(
                                      `roles.vFamily.${
                                        theNeed.members &&
                                        theNeed.members.find((m) => m.id_user === p.flaskUserId)
                                          .flaskFamilyRole
                                      }`,
                                    )}
                                  </Typography>
                                  <Typography>
                                    {p.familyMember.firstName} {p.familyMember.lastName}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                                <Divider sx={{ width: '65%', ml: 3 }} />
                              </Grid>
                            </div>
                          ),
                      )}
                    {/*  Child */}
                    <Grid item container sx={{ pt: '10px !important', mt: 1, mb: 1 }}>
                      <Grid item xs={2}>
                        <Avatar
                          alt="purchaser"
                          src={theNeed.child && prepareUrl(theNeed.child.awakeAvatarUrl)}
                          sx={{
                            bgcolor: grey[300],
                            width: '30px !important',
                            height: '30px !important',
                            borderRadius: 4,
                          }}
                        />
                      </Grid>
                      <Grid item xs={10} sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 400 }}>
                          {t(`roles.${getSAYRoleString(SAYPlatformRoles.CHILD)}`)}
                        </Typography>
                        <Typography>{theNeed.child.sayNameTranslations.fa}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                      <Divider sx={{ width: '65%', ml: 3 }} />
                    </Grid>
                    {/*  NGO */}
                    <Grid item container sx={{ pt: '10px !important', mt: 1, mb: 1 }}>
                      <Grid item xs={2}>
                        <HomeOutlinedIcon
                          sx={{
                            width: '30px !important',
                            height: '30px !important',
                            borderRadius: 4,
                          }}
                        />
                      </Grid>
                      <Grid item xs={10} sx={{ textAlign: 'center' }}>
                        <Typography sx={{ fontWeight: 400 }}>
                          {t(`roles.${getSAYRoleString(SAYPlatformRoles.NGO)}`)}
                        </Typography>
                        <Typography>{theNeed.child && theNeed.child.ngo.name}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                      <Divider sx={{ width: '65%', ml: 3 }} />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    container
                    direction="column"
                    sx={{ borderLeft: '0.1rem solid lightGrey' }}
                  >
                    {paymentDetails && (
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        sx={{ textAlign: 'center', mt: 0 }}
                        spacing={1}
                      >
                        <Grid item>
                          <ClickAwayListener onClickAway={handleTooltipClose}>
                            <div>
                              <Tooltip
                                title={<Typography>{t('need.tooltip.payments')}</Typography>}
                                PopperProps={{
                                  disablePortal: true,
                                }}
                                open={open}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                              >
                                <IconButton onClick={handleTooltipOpen}>
                                  <HelpOutlineIcon />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </ClickAwayListener>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" sx={{ fontSize: 10 }}>
                            {t('need.paid')}
                          </Typography>
                          <Typography variant="body1">
                            {paymentDetails.totalAmount}
                            {t('currency.toman')}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" sx={{ fontSize: 10 }}>
                            {t('need.refund')}
                          </Typography>
                          <Typography variant="body1">
                            {paymentDetails.creditRefund}
                            {t('currency.toman')}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" sx={{ fontSize: 10 }}>
                            {t('need.cost')}
                          </Typography>
                          <Typography variant="body1">
                            {theNeed.purchaseCost.toLocaleString()}
                            {t('currency.toman')}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" sx={{ fontSize: 10 }}>
                            {t('need.userShare')}
                          </Typography>
                          <Typography variant="body1">%{paymentDetails.userShare}</Typography>
                        </Grid>
                        <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                          <Divider sx={{ width: '60%', m: 'auto' }} />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" sx={{ fontSize: 10 }}>
                            {t('need.sayShare')}
                          </Typography>
                          <Typography variant="body1">
                            {theNeed.verifiedPayments.find((p) => p.flaskUserId === SAY_DAPP_ID) &&
                              theNeed.verifiedPayments
                                .find((p) => p.flaskUserId === SAY_DAPP_ID)
                                .needAmount.toLocaleString()}
                            {theNeed.verifiedPayments.find((p) => p.flaskUserId === SAY_DAPP_ID) &&
                              t('currency.toman')}
                          </Typography>
                          <Typography variant="body1">
                            {theNeed.verifiedPayments.find((p) => p.flaskUserId === SAY_DAPP_ID) &&
                              `%${round(
                                (theNeed.verifiedPayments.find((p) => p.flaskUserId === SAY_DAPP_ID)
                                  .needAmount /
                                  theNeed.cost) *
                                  100,
                                2,
                              )}  + `}{' '}
                            {t('need.delivery')}
                          </Typography>
                        </Grid>
                        <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                          <Divider sx={{ width: '60%', m: 'auto' }} />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" sx={{ fontSize: 10 }}>
                            {t('report.statusChange.bankTrackId')}
                          </Typography>
                          <Typography variant="body1">{paymentDetails.bankTrackId}</Typography>
                        </Grid>
                        <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                          <Divider sx={{ width: '60%', m: 'auto' }} />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" sx={{ fontSize: 10 }}>
                            {t('ngo.deliveryCode')}
                          </Typography>
                          <Typography variant="body1">
                            {changePersianNumbersToEnglish(theNeed.deliveryCode)}
                          </Typography>
                        </Grid>
                        <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                          <Divider sx={{ width: '60%', m: 'auto' }} />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" sx={{ fontSize: 10 }}>
                            {t('need.link')}
                          </Typography>
                          <Typography variant="body1">
                            <Link to={theNeed.link} target="_blank">
                              {t('dao.link')}
                            </Link>
                          </Typography>
                        </Grid>
                        <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                          <Divider sx={{ width: '60%', m: 'auto' }} />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle1" sx={{ fontSize: 10 }}>
                            {t('need.isUrgent')}
                          </Typography>
                          <Typography variant="body1">{theNeed.isUrgent ? 'Yes' : 'No'}</Typography>
                        </Grid>
                        <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                          <Divider sx={{ width: '60%', m: 'auto' }} />
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>

                <Grid container sx={{ pl: 2, pr: 2, pt: 0, pb: 4 }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    sx={{ height: 130 }}
                    spacing={2}
                  >
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                      <Card sx={{ p: 1 }}>
                        <SocialDistanceIcon
                          sx={{ mb: 0, color: (theme) => theme.palette.grey.A400, fontSize: 30 }}
                        />
                        {userResult && typeof userVRole === 'number' ? (
                          <Typography
                            variant="h4"
                            fontWeight="600"
                            sx={{
                              lineHeight: '1.2',
                              fontSize: 14,
                            }}
                          >
                            {userVRole === VirtualFamilyRole.FATHER
                              ? userResult.theUser.distanceRatio.fatherQGrant
                              : userVRole === VirtualFamilyRole.MOTHER
                              ? userResult.theUser.distanceRatio.motherQGrant
                              : userVRole === VirtualFamilyRole.AMOO
                              ? userResult.theUser.distanceRatio.amooQGrant
                              : userVRole === VirtualFamilyRole.KHALEH
                              ? userResult.theUser.distanceRatio.khalehQGrant
                              : userVRole === VirtualFamilyRole.DAEI
                              ? userResult.theUser.distanceRatio.daeiQGrant
                              : userVRole === VirtualFamilyRole.AMME &&
                                userResult.theUser.distanceRatio.ammeQGrant}
                          </Typography>
                        ) : (
                          <Stack sx={{ m: 'auto', width: '20%', color: 'grey.500' }} spacing={2}>
                            <LinearProgress sx={{ color: (theme) => theme.palette.primary }} />
                          </Stack>
                        )}

                        <Typography
                          color="textSecondary"
                          fontWeight="200"
                          sx={{
                            lineHeight: '1.2',
                            fontSize: 10,
                            mt: 1,
                          }}
                        >
                          {t('dao.signaturesTab.distance')}
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                      <Card sx={{ p: 1 }}>
                        <HardwareOutlinedIcon
                          sx={{ mb: 0, color: (theme) => theme.palette.grey.A400, fontSize: 30 }}
                        />
                        {coeffsResult ? (
                          <Typography
                            variant="h4"
                            fontWeight="600"
                            sx={{
                              lineHeight: '1.2',
                              fontSize: 14,
                            }}
                          >
                            {coeffsResult.avgGrant}
                          </Typography>
                        ) : (
                          <Stack sx={{ m: 'auto', width: '20%', color: 'grey.500' }} spacing={2}>
                            <LinearProgress sx={{ color: (theme) => theme.palette.primary }} />
                          </Stack>
                        )}

                        <Typography
                          color="textSecondary"
                          fontWeight="200"
                          sx={{
                            lineHeight: '1.2',
                            fontSize: 10,
                            mt: 1,
                          }}
                        >
                          {t('dao.signaturesTab.difficulty')}
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                      <Card sx={{ p: 1 }}>
                        <Diversity3Icon
                          sx={{ mb: 0, color: (theme) => theme.palette.grey.A400, fontSize: 30 }}
                        />
                        {coeffsResult ? (
                          <Typography
                            variant="h4"
                            fontWeight="600"
                            sx={{
                              lineHeight: '1.2',
                              fontSize: 14,
                            }}
                          >
                            {coeffsResult.contributionRatio}
                          </Typography>
                        ) : (
                          <Stack sx={{ m: 'auto', width: '20%', color: 'grey.500' }} spacing={2}>
                            <LinearProgress sx={{ color: (theme) => theme.palette.primary }} />
                          </Stack>
                        )}
                        <Typography
                          color="textSecondary"
                          fontWeight="200"
                          sx={{
                            lineHeight: '1.2',
                            fontSize: 10,
                            mt: 1,
                          }}
                        >
                          {t('dao.signaturesTab.collaboration')}
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Button */}
                {theNeed.members &&
                  !theNeed.signatures.find((s) => s.flaskUserId === userInfo.user.id) &&
                  theNeed.isResolved && (
                    <Grid container sx={{ width: '100%', m: 'auto', justifyContent: 'center' }}>
                      {!isConnected ? (
                        <WalletButton
                          fullWidth
                          variant="outlined"
                          disabled={
                            (signatureError && true) ||
                            (errorVerify && true) ||
                            (errorWalletInformation && true) ||
                            (errorSignature && true) ||
                            (errorSignIn && true) ||
                            (errorEcosystem && true) ||
                            (errorReadyOne && true)
                          }
                          onClick={handleWalletButton}
                        >
                          {t('button.wallet.connect')}
                        </WalletButton>
                      ) : (
                        isConnected && (
                          <WalletButton
                            fullWidth
                            signbutton="true"
                            variant="outlined"
                            disabled={
                              (signatureError && true) ||
                              (errorVerify && true) ||
                              (errorWalletInformation && true) ||
                              (errorSignature && true) ||
                              (errorSignIn && true) ||
                              (errorEcosystem && true) ||
                              (errorReadyOne && true)
                            }
                            loading={
                              successVerifiedSwAddress ||
                              loadingVerifiedSwAddress ||
                              isLoadingSignIn ||
                              loadingSignature ||
                              loadingInformation ||
                              isLoading ||
                              pendingConnector ||
                              loadingEthereumSignature
                            }
                            onClick={handleSignature}
                          >
                            {t('button.wallet.sign')}
                          </WalletButton>
                        )
                      )}
                      <Typography sx={{ mb: 4, mt: 1 }}>
                        {loadingVerifiedSwAddress && 'Verifying the signature...'}
                      </Typography>
                    </Grid>
                  )}
                {
                  <>
                    <CommentDrawer
                      open={openDrawer}
                      setOpen={setOpenDrawer}
                      comment={comment}
                      setComment={setComment}
                    />
                    {!theNeed.isResolved && (
                      <Typography sx={{ p: 2, textAlign: 'center' }}>
                        {t('comment.disabledWallet')}
                      </Typography>
                    )}
                  </>
                }
              </Card>
            </Grid>
          </Card>
        </>
      ) : (
        <CircularProgress />
      )}
      <WalletDialog openWallets={openWallets} setOpenWallets={setOpenWallets} />
      <CommentModal
        open={commentOpen}
        setOpen={setCommentOpen}
        comment={comment}
        setComment={setComment}
      />
      {(errorEcosystem || errorReadyOne) && (
        <Message variant="standard" severity="error" sx={{ justifyContent: 'center' }} icon={false}>
          {errorEcosystem || errorReadyOne}
        </Message>
      )}

      {(signatureError ||
        errorVerify ||
        errorWalletInformation ||
        errorSignature ||
        errorSignIn) && (
        <MessageWallet
          walletError={
            signatureError || errorVerify || errorWalletInformation || errorSignature || errorSignIn
          }
          walletToastOpen={walletToastOpen}
          handleCloseWalletToast={handleCloseWalletToast}
          severity="error"
        />
      )}
      <Typography>{test && test.message}</Typography>
    </Grid>
  );
}
