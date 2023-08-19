import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount, useDisconnect, useNetwork, useSignMessage } from 'wagmi';
import { SiweMessage } from 'siwe';
import {
  fetchNonce,
  fetchWalletInformation,
  walletVerify,
} from '../../../redux/actions/main/daoAction';
import MessageWallet from '../../../components/MessageWallet';

export default function Dao() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [values, setValues] = useState();
  const [signatureError, setSignatureError] = useState('');
  const [tabNumber, setTabNumber] = useState();
  const [walletToastOpen, setWalletToastOpen] = useState(false);

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { status, error: errorSignIn, isSuccess, signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();

  const userDetails = useSelector((state) => state.userDetails);
  const { theUser } = userDetails;
  const { nonceData, error: errorWalletNonce } = useSelector((state) => state.walletNonce);
  const { verifiedNonce, error: errorVerify } = useSelector((state) => state.walletVerify);
  const { information, error: errorWalletInformation } = useSelector(
    (state) => state.walletInformation,
  );
  const { error: errorSignature } = useSelector((state) => state.signature);

  // fetch nonce for the wallet siwe
  useEffect(() => {
    if (theUser) {
      dispatch(fetchNonce());
    }
  }, [theUser]);

  // fetch Wallet Information
  useEffect(() => {
    if (nonceData && !information) {
      dispatch(fetchWalletInformation());
    }
  }, [nonceData, information]);

  // after sign in get sign-in information
  useEffect(() => {
    // Check client and server nonce
    const localData = JSON.parse(localStorage.getItem('say-siwe'));
    if (nonceData && nonceData.nonce === (localData && localData.nonce)) {
      dispatch(fetchWalletInformation());
    }
  }, [verifiedNonce]);

  // toast
  useEffect(() => {
    if (errorSignIn || errorSignature || errorVerify) {
      setWalletToastOpen(true);
    }
  }, [errorSignIn, errorSignature, errorVerify]);

  // siwe
  useEffect(() => {
    if (!errorSignIn && isConnected && nonceData && nonceData.nonce) {
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
        statement: 'Sign in WITH Ethereum Wallet',
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
    if (tabNumber === 0) {
      navigate('/main/dao/tabs/signature');
    }
    if (tabNumber === 1) {
      navigate('/main/dao/tabs/mint');
    }
    if (tabNumber === 2) {
      navigate('/main/dao/tabs/proposals');
    }
    if (tabNumber === 3) {
      navigate('/main/dao/tabs/contribute');
    }
    if (tabNumber === 4) {
      navigate('/main/dao/tabs/docs');
    }
  }, [tabNumber]);

  // close toast
  const handleCloseWalletToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setWalletToastOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1, pb: 10 }}>
      <Grid container spacing={1} sx={{ p: 4 }}>
        <Grid container item spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
              <CardActionArea onClick={() => setTabNumber(0)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/pc.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {t('dao.tabs.signatures')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles,
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
              <CardActionArea onClick={() => setTabNumber(1)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/pc.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {t('dao.tabs.mintables')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles,
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Grid container item spacing={2} sx={{ mb: 1 }}>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
              <CardActionArea onClick={() => setTabNumber(2)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/pc.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {t('dao.tabs.proposals')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles,
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
              <CardActionArea onClick={() => setTabNumber(3)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/pc.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {t('dao.tabs.contributes')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles,
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <Grid container item spacing={2} justifyContent="center">
          <Grid item xs={6}>
            <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
              <CardActionArea onClick={() => setTabNumber(4)}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/images/dao/pc.png"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {t('dao.tabs.docs')}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles,
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
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
          severity={errorSignIn || errorSignature ? 'warning' : 'error'}
        />
      )}
    </Box>
  );
}
