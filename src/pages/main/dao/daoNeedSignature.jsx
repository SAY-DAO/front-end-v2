import {
  Avatar,
  Card,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { grey } from '@mui/material/colors';
import { useAccount, useConnect, useNetwork, useSignMessage, useWalletClient } from 'wagmi';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HardwareOutlinedIcon from '@mui/icons-material/HardwareOutlined';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SocialDistanceIcon from '@mui/icons-material/SocialDistance';
import { round } from 'lodash';
import {
  fetchFamilyMemberDistanceRatio,
  fetchFamilyRolesCompletePays,
  fetchNeedCoefficients,
  fetchOneReadySignNeed,
  signTransaction,
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
  WALLET_INFORMATION_RESET,
  WALLET_VERIFY_RESET,
} from '../../../redux/constants/daoConstants';
import DaoSignatureMenu from '../../../components/DAO/signing/DaoSignatureMenu';
import { SAYPlatformRoles, VirtualFamilyRole } from '../../../utils/types';
import { SAY_DAPP_ID } from '../../../utils/configs';
import Message from '../../../components/Message';
import MessageWallet from '../../../components/MessageWallet';

export default function DaoNeedSignature() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { needId } = useParams();

  const [walletToastOpen, setWalletToastOpen] = useState(false);
  const [userVRole, setUserVRole] = useState('');
  const [openWallets, setOpenWallets] = useState(false);
  const [theNeed, setTheNeed] = useState();
  const [images, setImages] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { isLoading, pendingConnector, error } = useConnect();
  const { chain } = useNetwork();
  const { reset } = useSignMessage();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const readySigningOneNeed = useSelector((state) => state.readySigningOneNeed);
  const { oneReadyNeed, error: errorReadyOne } = readySigningOneNeed;

  const familyRolesEco = useSelector((state) => state.familyRolesEco);
  const {
    coeffsResult,
    userResult,
    success: successFamilyRoles,
    error: errorFamilyRoles,
  } = familyRolesEco;

  useEffect(() => {
    if (!successFamilyRoles) {
      dispatch(fetchFamilyRolesCompletePays());
    }
  }, []);

  useEffect(() => {
    dispatch(fetchOneReadySignNeed(needId));
  }, []);

  useEffect(() => {
    if (oneReadyNeed) {
      setTheNeed(oneReadyNeed);
    }
  }, [oneReadyNeed]);

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

  const handleWalletButton = () => {
    setOpenWallets(true);
    reset();
    dispatch({ type: WALLET_VERIFY_RESET });
    dispatch({ type: WALLET_INFORMATION_RESET });
  };

  const handleSignature = async () => {
    dispatch(
      signTransaction(
        {
          address,
          flaskNeedId: oneReadyNeed.id,
          statuses: oneReadyNeed.status_updates,
          receipts: oneReadyNeed.receipts_,
          payments: oneReadyNeed.payments,
        },
        walletClient,
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
    if (error) {
      setWalletToastOpen(true);
    }
  }, [error]);

  // close toast
  const handleCloseWalletToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setWalletToastOpen(false);
  };

  return (
    <Grid container direction="column">
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <DaoSignatureMenu />
        </Grid>
        <Grid item>
          <IconButton onClick={() => navigate('/main/dao/tabs/signature')}>
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
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      sx={{ textAlign: 'center', mt: 1 }}
                      spacing={2}
                    >
                      <Grid item>
                        <Typography variant="subtitle1" sx={{ fontSize: 10 }}>
                          {t('need.paid')}
                        </Typography>
                        <Typography variant="body1">
                          {theNeed &&
                            theNeed.verifiedPayments.find(
                              (p) => p.flaskUserId === userInfo.user.id && p.needAmount > 0,
                            ) &&
                            theNeed.verifiedPayments
                              .find((p) => p.flaskUserId === userInfo.user.id && p.needAmount > 0)
                              .needAmount.toLocaleString()}
                          {t('currency.toman')}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" sx={{ fontSize: 10 }}>
                          {t('need.credit')}
                        </Typography>
                        <Typography variant="body1">
                          {theNeed.verifiedPayments.find(
                            (p) => p.flaskUserId === SAY_DAPP_ID && p.needAmount < 0,
                          )
                            ? theNeed.verifiedPayments
                                .find((p) => p.flaskUserId === SAY_DAPP_ID && p.needAmount < 0)
                                .creditAmount.toLocaleString()
                            : 0}
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
                        <Typography variant="body1">
                          %
                          {theNeed.verifiedPayments.find(
                            (p) => p.flaskUserId === userInfo.user.id,
                          ) &&
                            round(
                              (theNeed.verifiedPayments.find(
                                (p) => p.flaskUserId === userInfo.user.id,
                              ).needAmount /
                                theNeed.cost) *
                                100,
                              2,
                            )}
                        </Typography>
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
                            `%${round(
                              (theNeed.verifiedPayments.find((p) => p.flaskUserId === SAY_DAPP_ID)
                                .needAmount /
                                theNeed.cost) *
                                100,
                              2,
                            )}`}{' '}
                          + {t('need.delivery')}
                        </Typography>
                      </Grid>
                      <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                        <Divider sx={{ width: '60%', m: 'auto' }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" sx={{ fontSize: 10 }}>
                          {t('report.statusChange.bankTrackId')}
                        </Typography>
                        <Typography variant="body1">
                          {theNeed.verifiedPayments.find(
                            (p) => p.flaskUserId === userInfo.user.id,
                          ) &&
                            theNeed.verifiedPayments.find((p) => p.flaskUserId === userInfo.user.id)
                              .gatewayTrackId}
                        </Typography>
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
                            Link
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
                <Grid container sx={{ width: '100px', m: 'auto', justifyContent: 'center' }}>
                  {!isConnected ? (
                    <WalletButton fullWidth variant="outlined" onClick={handleWalletButton}>
                      {t('button.wallet.connect')}
                    </WalletButton>
                  ) : (
                    isConnected && (
                      <WalletButton
                        fullWidth
                        signbutton="true"
                        variant="outlined"
                        loading={isLoading || pendingConnector}
                        onClick={handleSignature}
                      >
                        {t('button.wallet.sign')}
                      </WalletButton>
                    )
                  )}
                </Grid>
              </Card>
            </Grid>
          </Card>
        </>
      ) : (
        <CircularProgress />
      )}
      <WalletDialog openWallets={openWallets} setOpenWallets={setOpenWallets} />

      {(errorFamilyRoles || errorReadyOne) && (
        <Message variant="standard" severity="error" sx={{ justifyContent: 'center' }} icon={false}>
          {errorFamilyRoles || errorReadyOne}
        </Message>
      )}
      {error && (
        <MessageWallet
          walletError={error}
          walletToastOpen={walletToastOpen}
          handleCloseWalletToast={handleCloseWalletToast}
        />
      )}
    </Grid>
  );
}
