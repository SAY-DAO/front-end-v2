import {
  Alert,
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
import { useAccount, useDisconnect, useNetwork, useSignMessage, useWalletClient } from 'wagmi';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HardwareOutlinedIcon from '@mui/icons-material/HardwareOutlined';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import { round } from 'lodash';
import { SiweMessage } from 'siwe';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import {
  fetchPersonalRatios,
  fetchEcoFamilyRolesCompletePays,
  fetchNeedCollectiveRatios,
  fetchNonce,
  fetchOneReadySignNeed,
  fetchWalletInformation,
  signTransaction,
  walletVerify,
  prepareSignature,
  verifySocialWorkerSignature,
  createSignature,
} from '../../../redux/actions/main/daoAction';
import DurationTimeLine from '../../../components/DAO/signing/DurationTimeLine';
import {
  changePersianNumbersToEnglish,
  getSAYRoleString,
  getVFamilyRoleString,
  prepareUrl,
} from '../../../utils/helpers';
import WalletButton from '../../../components/WalletButton';
import WalletDialog from '../../../components/modals/WalletDialog';
import {
  FAMILY_ECOSYSTEM_PAYS_REST,
  ONE_NEED_COLLECTIVE_RATIO_RESET,
  ONE_NEED_PERSONAL_RATIO_REST,
  SIGNATURE_CREATE_RESET,
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
import DifficultyTable from '../../../components/DAO/signing/DifficultyTable';
import DistanceRatioTable from '../../../components/DAO/signing/DistanceRatioTable';

export default function DaoNeedSignature() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { needId } = useParams();

  const [connectorLoading, setConnectorLoading] = useState(false);
  const [ratios, setRatios] = useState();
  const [open, setOpen] = useState(false);
  const [variablesOpen, setVariablesOpen] = useState({
    distanceRatio: false,
    difficulty: false,
    collaboration: false,
  });
  const [openDrawer, setOpenDrawer] = useState(false);
  const [loadingEthereumSignature, setLoadingEthereumSignature] = useState(false);
  const [comment, setComment] = useState();
  const [commentOpen, setCommentOpen] = useState(false);
  const [userVRole, setUserVRole] = useState();
  const [openWallets, setOpenWallets] = useState(false);
  const [images, setImages] = useState(false);
  const [values, setValues] = useState();
  const [signatureError, setSignatureError] = useState('');
  const [walletToastOpen, setWalletToastOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState();

  const { ipResult } = useSelector((state) => state.ipLocation);

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

  const { chain } = useNetwork();
  const { disconnect } = useDisconnect();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const readySigningOneNeed = useSelector((state) => state.readySigningOneNeed);
  const { oneReadyNeed, error: errorReadyOne } = readySigningOneNeed;

  const commentResult = useSelector((state) => state.commentResult);
  const { created: commentCreated } = commentResult;

  const needVariables = useSelector((state) => state.needVariables);
  const {
    collectiveResult,
    personalResult,
    success: successOneNeedData,
    error: errorOneNeedData,
  } = needVariables;

  const { nonceData, error: errorWalletNonce } = useSelector((state) => state.walletNonce);
  const { information, loading: loadingInformation } = useSelector(
    (state) => state.walletInformation,
  );
  const { verifiedNonce, error: errorVerify } = useSelector((state) => state.walletVerify);
  const { error: errorWalletInformation } = useSelector((state) => state.walletInformation);
  const {
    swVerifiedAddress,
    loading: loadingVerifiedSwAddress,
    error: errorVerifiedSwAddress,
  } = useSelector((state) => state.signatureVerification);

  const {
    prepared,
    signatureHash,
    createdSignature,
    loading: loadingSignature,
    error: errorSignature,
  } = useSelector((state) => state.signature);

  // reset wallet connection
  useEffect(() => {
    if (nonceData) {
      setConnectorLoading(false);
    }
    return () => {
      if (connectorLoading) {
        reset();
      }
    };
  }, [nonceData]);

  useEffect(() => {
    if (
      oneReadyNeed &&
      oneReadyNeed.members &&
      oneReadyNeed.members.find((m) => m.id_user === userInfo.user.id)
    ) {
      setUserVRole(
        Number(oneReadyNeed.members.find((m) => m.id_user === userInfo.user.id).flaskFamilyRole),
      );
    }
  }, [oneReadyNeed]);

  // set ratios
  useEffect(() => {
    if (personalResult && personalResult.distanceRatio && collectiveResult && oneReadyNeed) {
      const theNeedVariables = oneReadyNeed.variables.find(
        (v) => v.flaskUserId === userInfo.user.id && v.needFlaskId === oneReadyNeed.flaskId,
      );
      if (userVRole >= 0 && (!oneReadyNeed.variables || !theNeedVariables)) {
        const theRatio =
          userVRole === VirtualFamilyRole.FATHER
            ? personalResult.distanceRatio.fatherQGrant
            : userVRole === VirtualFamilyRole.MOTHER
            ? personalResult.distanceRatio.motherQGrant
            : userVRole === VirtualFamilyRole.AMOO
            ? personalResult.distanceRatio.amooQGrant
            : userVRole === VirtualFamilyRole.KHALEH
            ? personalResult.distanceRatio.khalehQGrant
            : userVRole === VirtualFamilyRole.DAEI
            ? personalResult.distanceRatio.daeiQGrant
            : userVRole === VirtualFamilyRole.AMME && personalResult.distanceRatio.ammeQGrant;
        setRatios({
          distanceRatio: theRatio,
          difficultyRatio: collectiveResult.difficultyRatio,
          contributionRatio: collectiveResult.contributionRatio,
        });
      } else if (oneReadyNeed.variables && oneReadyNeed.variables[0]) {
        const { distanceRatio, difficultyRatio, contributionRatio } = theNeedVariables;
        setRatios({
          distanceRatio,
          difficultyRatio,
          contributionRatio,
        });
      }
    }
  }, [personalResult, collectiveResult, oneReadyNeed, userVRole]);

  useEffect(() => {
    if (oneReadyNeed && chain && !errorSignature) {
      if (swVerifiedAddress && !prepared) {
        dispatch(prepareSignature(oneReadyNeed.id, address, chain.id, ratios));
      }
      if (swVerifiedAddress && prepared && !signatureHash) {
        dispatch(signTransaction(walletClient, prepared));
      }
      if (signatureHash && prepared) {
        dispatch(createSignature(oneReadyNeed.flaskId, signatureHash, prepared));
      }
    }
  }, [prepared, signatureHash, swVerifiedAddress]);

  useEffect(() => {
    if (createdSignature || commentCreated) {
      dispatch(fetchOneReadySignNeed(needId));
    }
  }, [createdSignature, commentCreated]);

  // fetch nonce for the wallet siwe
  useEffect(() => {
    if (userInfo && userInfo.user.id && isConnected) {
      setOpenWallets(false);
      dispatch(fetchNonce());
    }
  }, [userInfo, isConnected]);

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
      errorVerifiedSwAddress ||
      errorSignIn ||
      errorVerify ||
      errorSignature ||
      errorWalletInformation ||
      errorWalletNonce
    ) {
      disconnect();
      localStorage.removeItem('say-siwe');
      dispatch({ type: SIGNATURE_VERIFICATION_RESET });
      dispatch({ type: SIGNATURE_CREATE_RESET });
    }
  }, [errorSignIn, errorVerify, errorWalletInformation, errorWalletNonce, errorSignature]);

  useEffect(() => {
    dispatch(fetchNeedCollectiveRatios(needId));
    dispatch(fetchPersonalRatios());
    return () => {
      dispatch({ type: ONE_NEED_PERSONAL_RATIO_REST });
    };
  }, [needId]);

  useEffect(() => {
    if (!successOneNeedData) {
      dispatch(fetchEcoFamilyRolesCompletePays());
    }
    if (!oneReadyNeed) {
      dispatch(fetchOneReadySignNeed(needId));
    }
  }, [needId]);

  useEffect(() => {
    return () => {
      if (
        errorOneNeedData ||
        errorReadyOne ||
        errorSignIn ||
        errorVerify ||
        errorSignature ||
        errorWalletInformation ||
        errorWalletNonce
      ) {
        dispatch({ type: FAMILY_ECOSYSTEM_PAYS_REST });
        dispatch({ type: SIGNATURE_VERIFICATION_RESET });
      }
      dispatch({ type: ONE_NEED_COLLECTIVE_RATIO_RESET });
    };
  }, [createdSignature]);

  useEffect(() => {
    if (oneReadyNeed) {
      const userPayment = oneReadyNeed.verifiedPayments.find(
        (p) => p.flaskUserId === userInfo.user.id && p.needAmount > 0,
      );
      const creditRefund = oneReadyNeed.verifiedPayments.find(
        (p) => p.flaskUserId === userInfo.user.id && p.creditAmount < 0,
      );
      setPaymentDetails({
        totalAmount: (userPayment.needAmount + userPayment.donationAmount).toLocaleString(),
        creditRefund: creditRefund ? creditRefund.creditAmount : 0,
        userShare:
          userPayment && round((userPayment.needAmount / oneReadyNeed.cost) * 100, 2) > 100
            ? 100
            : round((userPayment.needAmount / oneReadyNeed.cost) * 100, 2),
        donationAmount: userPayment.donationAmount,
        needAmount: userPayment && userPayment.needAmount.toLocaleString(),
        bankAmount:
          userPayment.needAmount + userPayment.donationAmount + creditRefund &&
          creditRefund.creditAmount,
        bankTrackId: userPayment && userPayment.gatewayTrackId,
      });
    }
  }, [oneReadyNeed]);

  const handleWalletButton = () => {
    setOpenWallets(true);
    disconnect();
    reset();
    dispatch({ type: WALLET_VERIFY_RESET });
    dispatch({ type: WALLET_INFORMATION_RESET });
    dispatch({ type: SIGNATURE_CREATE_RESET });
  };

  const handleSignature = async () => {
    const swSignatureEntity = oneReadyNeed.signatures.find(
      (s) => s.role === SAYPlatformRoles.SOCIAL_WORKER,
    );
    dispatch(
      verifySocialWorkerSignature(
        swSignatureEntity.hash,
        swSignatureEntity.signerAddress,
        oneReadyNeed.flaskId,
        chain.id,
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

  const handleVariablesTooltipClose = (variableName) => {
    setVariablesOpen((state) => ({
      ...state,
      [variableName]: false,
    }));
  };

  const handleVariablesTooltipOpen = (variableName) => {
    setVariablesOpen((state) => ({
      ...state,
      [variableName]: true,
    }));
  };
  console.log(connectorLoading);
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
      {oneReadyNeed ? (
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
                  ? `url(${`${process.env.REACT_APP_GITHUB_IMAGE_SERVE}/${oneReadyNeed.midjourneyImage}`})`
                  : `url(${oneReadyNeed.needRetailerImg})`,
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
                      ? `${process.env.REACT_APP_GITHUB_IMAGE_SERVE}/${oneReadyNeed.midjourneyImage}`
                      : oneReadyNeed.needRetailerImg
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
                  {oneReadyNeed.nameTranslations.fa}
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
                  {oneReadyNeed.title}
                </Typography>
              </Grid>
              <Grid item>
                <Card elevation={1} sx={{ width: 'max-content', m: 'auto', borderRadius: 3, p: 2 }}>
                  <DurationTimeLine need={oneReadyNeed} />
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
                    {oneReadyNeed.socialWorker && (
                      <Grid item container sx={{ pt: '10px !important', mt: 1, mb: 1 }}>
                        <Grid item xs={2}>
                          <Avatar
                            alt="social worker"
                            src={prepareUrl(oneReadyNeed.socialWorker.avatarUrl)}
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
                            {oneReadyNeed.socialWorker.firstName}{' '}
                            {oneReadyNeed.socialWorker.lastName}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}

                    <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                      <Divider sx={{ width: '65%', ml: 3 }} />
                    </Grid>
                    {/*  Auditor */}
                    {oneReadyNeed.auditor && (
                      <Grid item container sx={{ pt: '10px !important', mt: 1, mb: 1 }}>
                        <Grid item xs={2}>
                          <Avatar
                            alt="auditor"
                            src={prepareUrl(oneReadyNeed.auditor.avatarUrl)}
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
                            {oneReadyNeed.auditor.firstName} {oneReadyNeed.auditor.lastName}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                    <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                      <Divider sx={{ width: '65%', ml: 3 }} />
                    </Grid>
                    {/*  Purchaser */}
                    {oneReadyNeed.purchaser && (
                      <Grid item container sx={{ pt: '10px !important', mt: 1, mb: 1 }}>
                        <Grid item xs={2}>
                          <Avatar
                            alt="purchaser"
                            src={prepareUrl(oneReadyNeed.purchaser.avatarUrl)}
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
                            {oneReadyNeed.purchaser.firstName} {oneReadyNeed.purchaser.lastName}
                          </Typography>
                        </Grid>
                      </Grid>
                    )}
                    <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                      <Divider sx={{ width: '65%', ml: 3 }} />
                    </Grid>
                    {/*  Family */}
                    {oneReadyNeed.verifiedPayments &&
                      oneReadyNeed.verifiedPayments.map(
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
                                        oneReadyNeed.members &&
                                        oneReadyNeed.members.find(
                                          (m) => m.id_user === p.flaskUserId,
                                        ).flaskFamilyRole
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
                          src={oneReadyNeed.child && prepareUrl(oneReadyNeed.child.awakeAvatarUrl)}
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
                        <Typography>{oneReadyNeed.child.sayNameTranslations.fa}</Typography>
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
                        <Typography>{oneReadyNeed.child && oneReadyNeed.child.ngo.name}</Typography>
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
                            {oneReadyNeed.purchaseCost.toLocaleString()}
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
                            {oneReadyNeed.verifiedPayments.find(
                              (p) => p.flaskUserId === SAY_DAPP_ID,
                            ) &&
                              oneReadyNeed.verifiedPayments
                                .find((p) => p.flaskUserId === SAY_DAPP_ID)
                                .needAmount.toLocaleString()}
                            {oneReadyNeed.verifiedPayments.find(
                              (p) => p.flaskUserId === SAY_DAPP_ID,
                            ) && t('currency.toman')}
                          </Typography>
                          <Typography variant="body1">
                            {oneReadyNeed.verifiedPayments.find(
                              (p) => p.flaskUserId === SAY_DAPP_ID,
                            ) &&
                              `%${round(
                                (oneReadyNeed.verifiedPayments.find(
                                  (p) => p.flaskUserId === SAY_DAPP_ID,
                                ).needAmount /
                                  oneReadyNeed.cost) *
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
                            {changePersianNumbersToEnglish(oneReadyNeed.deliveryCode)}
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
                            <Link to={oneReadyNeed.link} target="_blank">
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
                          <Typography variant="body1">
                            {oneReadyNeed.isUrgent ? 'Yes' : 'No'}
                          </Typography>
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
                    {/* -------------------distanceRatio ------------------------------*/}
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                      <ClickAwayListener
                        onClickAway={() => handleVariablesTooltipClose('distanceRatio')}
                      >
                        <div>
                          <Tooltip
                            title={
                              <>
                                <Typography sx={{ fontSize: 12 }} component="div">
                                  {t('dao.variables.distanceRatio.title')}
                                </Typography>
                                <br />
                                <br />
                                {personalResult && personalResult.paid && userVRole >= 0 ? (
                                  <span style={{ fontWeight: 400, fontSize: 10 }}>
                                    <Trans i18nKey="dao.variables.distanceRatio.body">
                                      {{
                                        paid: personalResult.paid[
                                          `${getVFamilyRoleString(
                                            oneReadyNeed.members &&
                                              oneReadyNeed.members.find(
                                                (m) => m.id_user === userInfo.user.id,
                                              ).flaskFamilyRole,
                                          ).toLowerCase()}CompletePay`
                                        ],
                                        role: t(
                                          `roles.vFamily.${
                                            oneReadyNeed.members &&
                                            oneReadyNeed.members.find(
                                              (m) => m.id_user === userInfo.user.id,
                                            ).flaskFamilyRole
                                          }`,
                                        ),
                                      }}
                                    </Trans>
                                    <DistanceRatioTable />
                                  </span>
                                ) : (
                                  <Stack
                                    sx={{ m: 'auto', width: '20%', color: 'grey.500', mt: 3 }}
                                    spacing={2}
                                  >
                                    <LinearProgress
                                      sx={{ color: (theme) => theme.palette.primary }}
                                    />
                                  </Stack>
                                )}
                              </>
                            }
                            PopperProps={{
                              disablePortal: true,
                            }}
                            open={variablesOpen && variablesOpen.distanceRatio}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                          >
                            <Card sx={{ p: 1 }}>
                              <IconButton
                                onClick={() => handleVariablesTooltipOpen('distanceRatio')}
                              >
                                <SocialDistanceIcon
                                  sx={{
                                    mb: 0,
                                    color: (theme) => theme.palette.grey.A400,
                                    fontSize: 30,
                                  }}
                                />
                              </IconButton>
                              {ratios ? (
                                <Typography
                                  variant="h4"
                                  fontWeight="600"
                                  sx={{
                                    lineHeight: '1.2',
                                    fontSize: 14,
                                  }}
                                >
                                  {ratios.distanceRatio}
                                </Typography>
                              ) : (
                                <Stack
                                  sx={{ m: 'auto', width: '20%', color: 'grey.500' }}
                                  spacing={2}
                                >
                                  <LinearProgress
                                    sx={{ color: (theme) => theme.palette.primary }}
                                  />
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
                          </Tooltip>
                        </div>
                      </ClickAwayListener>
                    </Grid>
                    {/* -------------------difficulty ------------------------------*/}
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                      <ClickAwayListener
                        onClickAway={() => handleVariablesTooltipClose('difficulty')}
                      >
                        <div>
                          <Tooltip
                            title={
                              <>
                                <Typography sx={{ fontSize: 12 }} component="div">
                                  {t('dao.variables.difficulty.title')}
                                </Typography>
                                <br />
                                <br />
                                {paymentDetails && collectiveResult ? (
                                  <span style={{ fontWeight: 400, fontSize: 10 }}>
                                    <Trans i18nKey="dao.variables.difficulty.body">
                                      {{
                                        needConfirm:
                                          collectiveResult.needConfirmDuration.confirmDuration,
                                        needPayment:
                                          collectiveResult.needPaymentDuration.paymentDuration,
                                        needLogistic:
                                          collectiveResult.needLogisticDuration.logisticDuration,
                                        needCost: paymentDetails.totalAmount,
                                      }}
                                    </Trans>
                                    <DifficultyTable />
                                  </span>
                                ) : (
                                  <Stack
                                    sx={{ m: 'auto', width: '20%', color: 'grey.500', mt: 3 }}
                                    spacing={2}
                                  >
                                    <LinearProgress
                                      sx={{ color: (theme) => theme.palette.primary }}
                                    />
                                  </Stack>
                                )}
                              </>
                            }
                            PopperProps={{
                              disablePortal: true,
                            }}
                            open={variablesOpen && variablesOpen.difficulty}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                          >
                            <Card sx={{ p: 1 }}>
                              <IconButton onClick={() => handleVariablesTooltipOpen('difficulty')}>
                                <HardwareOutlinedIcon
                                  sx={{
                                    mb: 0,
                                    color: (theme) => theme.palette.grey.A400,
                                    fontSize: 30,
                                  }}
                                />
                              </IconButton>
                              {ratios ? (
                                <Typography
                                  variant="h4"
                                  fontWeight="600"
                                  sx={{
                                    lineHeight: '1.2',
                                    fontSize: 14,
                                  }}
                                >
                                  {ratios.difficultyRatio}
                                </Typography>
                              ) : (
                                <Stack
                                  sx={{ m: 'auto', width: '20%', color: 'grey.500' }}
                                  spacing={2}
                                >
                                  <LinearProgress
                                    sx={{ color: (theme) => theme.palette.primary }}
                                  />
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
                          </Tooltip>
                        </div>
                      </ClickAwayListener>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                      <ClickAwayListener
                        onClickAway={() => handleVariablesTooltipClose('collaboration')}
                      >
                        <div>
                          <Tooltip
                            title={
                              <Typography sx={{ fontSize: 12 }} component="div">
                                {t('dao.variables.collaboration.title')}
                              </Typography>
                            }
                            PopperProps={{
                              disablePortal: true,
                            }}
                            open={variablesOpen && variablesOpen.collaboration}
                            disableFocusListener
                            disableHoverListener
                            disableTouchListener
                          >
                            <Card sx={{ p: 1 }}>
                              <IconButton
                                onClick={() => handleVariablesTooltipOpen('collaboration')}
                              >
                                <Diversity3Icon
                                  sx={{
                                    mb: 0,
                                    color: (theme) => theme.palette.grey.A400,
                                    fontSize: 30,
                                  }}
                                />
                              </IconButton>
                              {ratios ? (
                                <Typography
                                  variant="h4"
                                  fontWeight="600"
                                  sx={{
                                    lineHeight: '1.2',
                                    fontSize: 14,
                                  }}
                                >
                                  {ratios.contributionRatio}
                                </Typography>
                              ) : (
                                <Stack
                                  sx={{ m: 'auto', width: '20%', color: 'grey.500' }}
                                  spacing={2}
                                >
                                  <LinearProgress
                                    sx={{ color: (theme) => theme.palette.primary }}
                                  />
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
                          </Tooltip>
                        </div>
                      </ClickAwayListener>
                    </Grid>
                  </Grid>
                </Grid>
                {/* Ip Location */}
                {(!ipResult || ipResult.country === 'IR') && (
                  <Grid container sx={{ p: 2 }}>
                    <Alert
                      sx={{ width: '100%', maxWidth: 400, m: 'auto', fontSize: 10 }}
                      severity="warning"
                    >
                      {t('ip.restrictions.title')}
                    </Alert>
                  </Grid>
                )}
                {/* Button */}
                <Typography>ipResult</Typography>
                <Typography>{ipResult && ipResult.country}</Typography>
                {oneReadyNeed.members &&
                !oneReadyNeed.signatures.find((s) => s.flaskUserId === userInfo.user.id) &&
                oneReadyNeed.isResolved ? (
                  <Grid container sx={{ width: '100%', m: 'auto', justifyContent: 'center' }}>
                    {!isConnected ? (
                      <WalletButton
                        loading={connectorLoading}
                        fullWidth
                        variant="outlined"
                        disabled={
                          !ipResult ||
                          ipResult.country === 'IR' ||
                          !ratios ||
                          !personalResult ||
                          !personalResult.distanceRatio.allChildrenCaredFor ||
                          (errorVerify && true) ||
                          (errorWalletInformation && true) ||
                          (errorOneNeedData && true) ||
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
                            !ipResult ||
                            ipResult.country === 'IR' ||
                            !ratios ||
                            !personalResult ||
                            !personalResult.distanceRatio.allChildrenCaredFor ||
                            (errorVerify && true) ||
                            (errorWalletInformation && true) ||
                            (errorSignIn && true) ||
                            (errorOneNeedData && true) ||
                            (errorReadyOne && true)
                          }
                          loading={
                            connectorLoading ||
                            !collectiveResult ||
                            !personalResult ||
                            loadingVerifiedSwAddress ||
                            isLoadingSignIn ||
                            loadingSignature ||
                            loadingInformation ||
                            loadingEthereumSignature
                          }
                          onClick={handleSignature}
                        >
                          {t('button.wallet.sign')}
                        </WalletButton>
                      )
                    )}
                    <Typography sx={{ mb: 4, mt: 1 }}>
                      {loadingVerifiedSwAddress && t('dao.status.verifyingSwSignature')}
                      {loadingSignature && t('dao.status.preparing')}
                    </Typography>
                  </Grid>
                ) : (
                  <Grid container sx={{ width: '100%', m: 'auto', justifyContent: 'center' }}>
                    <Typography>{t('dao.signaturesTab.signed')}</Typography>
                  </Grid>
                )}
                {personalResult &&
                  personalResult.paid &&
                  !personalResult.distanceRatio.allChildrenCaredFor && (
                    <Typography sx={{ p: 2, textAlign: 'center' }}>
                      {t('dao.variables.distanceRatio.zero')}
                    </Typography>
                  )}
                <CommentDrawer
                  open={openDrawer}
                  setOpen={setOpenDrawer}
                  comment={comment}
                  setComment={setComment}
                />
                {!oneReadyNeed.isResolved && (
                  <Typography sx={{ p: 2, textAlign: 'center' }}>
                    {t('comment.disabledWallet')}
                  </Typography>
                )}
              </Card>
            </Grid>
            {(errorOneNeedData || errorReadyOne || errorVerifiedSwAddress) && (
              <Message
                variant="standard"
                severity="error"
                sx={{ justifyContent: 'center' }}
                icon={false}
              >
                {errorOneNeedData || errorReadyOne || errorVerifiedSwAddress}
              </Message>
            )}
            {(signatureError ||
              errorVerify ||
              errorWalletInformation ||
              errorSignature ||
              errorSignIn) && (
              <MessageWallet
                walletError={
                  signatureError ||
                  errorVerify ||
                  errorWalletInformation ||
                  errorSignature ||
                  errorSignIn
                }
                walletToastOpen={walletToastOpen}
                handleCloseWalletToast={handleCloseWalletToast}
                severity={errorSignIn || errorSignature ? 'warning' : 'error'}
              />
            )}
          </Card>
        </>
      ) : (
        <CircularProgress />
      )}
      <WalletDialog
        openWallets={openWallets}
        setOpenWallets={setOpenWallets}
        setConnectorLoading={setConnectorLoading}
      />
      <CommentModal
        open={commentOpen}
        setOpen={setCommentOpen}
        comment={comment}
        setComment={setComment}
      />
    </Grid>
  );
}
