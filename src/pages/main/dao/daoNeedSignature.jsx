import { Avatar, Card, Divider, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { grey } from '@mui/material/colors';
import { useAccount, useConnect, useNetwork, useSignMessage, useWalletClient } from 'wagmi';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import HardwareOutlinedIcon from '@mui/icons-material/HardwareOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { fetchOneReadySignNeed, signTransaction } from '../../../redux/actions/main/daoAction';
import { apiDao } from '../../../env';
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
import { SAYPlatformRoles } from '../../../utils/types';
import { SAY_DAPP_ID } from '../../../utils/configs';

export default function DaoNeedSignature() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { needId } = useParams();

  const [openWallets, setOpenWallets] = useState(false);
  const [theNeed, setTheNeed] = useState();
  const [images, setImages] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { isLoading, pendingConnector } = useConnect();
  const { chain } = useNetwork();
  const { reset } = useSignMessage();

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  const readySigningNeeds = useSelector((state) => state.readySigningNeeds);
  const { readyNeeds } = readySigningNeeds;

  const readySigningOneNeed = useSelector((state) => state.readySigningOneNeed);
  const { oneReadyNeed } = readySigningOneNeed;

  useEffect(() => {
    if (readyNeeds) {
      setTheNeed(readyNeeds.find((n) => n.id === needId));
    } else {
      dispatch(fetchOneReadySignNeed(needId));
    }
  }, [readyNeeds]);

  useEffect(() => {
    if (oneReadyNeed) {
      setTheNeed(oneReadyNeed);
    }
  }, [oneReadyNeed]);

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

  return (
    <Grid container direction="column" sx={{ bgcolor: 'white' }}>
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
      {theNeed && (
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
                  ? `url(${`${apiDao}/midjourney/images/${theNeed.midjourneyImage}`})`
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
                      ? `${apiDao}/midjourney/images/${theNeed.midjourneyImage}`
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
                  <Grid item xs={7} container direction="column" spacing={2} alignItems="flex-end">
                    <Grid item sx={{ width: '100%' }}>
                      <Typography sx={{ pl: 3, fontWeight: 600 }}>{t('roles.all')}</Typography>
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                      <Divider sx={{ width: '80%', m: 'auto' }} />
                    </Grid>
                    {/*  Social worker */}
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
                    <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                      <Divider sx={{ width: '65%', ml: 3 }} />
                    </Grid>
                    {/*  Auditor */}
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
                    <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                      <Divider sx={{ width: '65%', ml: 3 }} />
                    </Grid>
                    {/*  Purchaser */}
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
                    <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                      <Divider sx={{ width: '65%', ml: 3 }} />
                    </Grid>
                    {/*  Family */}
                    {theNeed.verifiedPayments.map(
                      (p) =>
                        p.needAmount > 0 && (
                          <div key={p.flaskId} style={{ width: '100%', paddingRight: 16 }}>
                            <Grid item container sx={{ pt: '10px !important', mt: 1, mb: 1 }}>
                              <Grid item xs={2}>
                                <Avatar
                                  alt="virtual family"
                                  src={prepareUrl(p.familyMember.avatarUrl)}
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
                                  {t(`roles.${getSAYRoleString(SAYPlatformRoles.FAMILY)}`)}
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
                          src={prepareUrl(theNeed.child.awakeAvatarUrl)}
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
                        <Typography>{theNeed.child.ngo.name}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item sx={{ width: '100%', pt: '5px !important' }}>
                      <Divider sx={{ width: '65%', ml: 3 }} />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={5}
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
                          {theNeed.verifiedPayments
                            .find((p) => p.flaskUserId === SAY_DAPP_ID && p.needAmount > 0)
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
                          ) &&
                            theNeed.verifiedPayments
                              .find((p) => p.flaskUserId === SAY_DAPP_ID && p.needAmount < 0)
                              .creditAmount.toLocaleString()}
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
                          %{(theNeed.purchaseCost / theNeed.cost) * 100}
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
                          {!theNeed.verifiedPayments.find((p) => p.flaskUserId === SAY_DAPP_ID)
                            ? t('need.delivery')
                            : `%${
                                (theNeed.verifiedPayments.find((p) => p.flaskUserId === SAY_DAPP_ID)
                                  .needAmount /
                                  theNeed.cost) *
                                100
                              }`}
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
                          {
                            theNeed.verifiedPayments.find((p) => p.flaskUserId === SAY_DAPP_ID)
                              .gatewayTrackId
                          }
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
                    sx={{ height: 80 }}
                  >
                    <Grid item xs={3} sx={{ textAlign: 'center' }}>
                      <Card sx={{ p: 1 }}>
                        <AccessTimeIcon
                          sx={{ mb: 0, color: (theme) => theme.palette.grey.A400, fontSize: 30 }}
                        />

                        <Typography
                          variant="h4"
                          fontWeight="600"
                          sx={{
                            lineHeight: '1.2',
                            fontSize: 14,
                          }}
                        >
                          {moment(theNeed.childDeliveryDate).diff(
                            moment(theNeed.created),
                            'days',
                          ) || '-'}{' '}
                          {t('dao.signaturesTab.timeLine.days')}{' '}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          fontWeight="200"
                          sx={{
                            lineHeight: '1.2',
                            fontSize: 10,
                            mt: 1,
                          }}
                        >
                          {t('dao.signaturesTab.timeLine.duration')}
                        </Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: 'center' }}>
                      <Card sx={{ p: 1 }}>
                        <HardwareOutlinedIcon
                          sx={{ mb: 0, color: (theme) => theme.palette.grey.A400, fontSize: 30 }}
                        />
                        <Typography
                          variant="h4"
                          fontWeight="600"
                          sx={{
                            lineHeight: '1.2',
                            fontSize: 14,
                          }}
                        >
                          0
                        </Typography>
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
                    <Grid item xs={3} sx={{ textAlign: 'center' }}>
                      <Card sx={{ p: 1 }}>
                        <Diversity3Icon
                          sx={{ mb: 0, color: (theme) => theme.palette.grey.A400, fontSize: 30 }}
                        />
                        <Typography
                          variant="h4"
                          fontWeight="600"
                          sx={{
                            lineHeight: '1.2',
                            fontSize: 14,
                          }}
                        >
                          {theNeed.verifiedPayments.filter(
                            (p) => p.flaskUserId !== SAY_DAPP_ID && p.needAmount > 0,
                          ).length === 1
                            ? 1
                            : (theNeed.verifiedPayments.filter(
                                (p) => p.flaskUserId !== SAY_DAPP_ID && p.needAmount > 0,
                              ).length -
                                1) *
                              1.1}
                        </Typography>
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
      )}
      <WalletDialog openWallets={openWallets} setOpenWallets={setOpenWallets} />
    </Grid>
  );
}
