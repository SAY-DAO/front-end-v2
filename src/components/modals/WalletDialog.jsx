/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useAccount, useConnect } from 'wagmi';
import { LoadingButton } from '@mui/lab';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { isBrowser } from 'react-device-detect';
import metamask from '../../resources/images/wallet/metamask.png';
import walletConnect from '../../resources/images/wallet/walletConnect.svg';
import MessageWallet from '../MessageWallet';

function TheDialog(props) {
  const { t } = useTranslation();
  const { onClose, open } = props;

  const [walletToastOpen, setWalletToastOpen] = useState(false);

  const { connect, connectors, isLoading, pendingConnector, error, reset } = useConnect();

  // toast
  useEffect(() => {
    if (error) {
      setWalletToastOpen(true);
    }
    return () => {
      reset();
    };
  }, [error && error.code]);

  useEffect(() => {
    if (isLoading) {
      onClose();
    }
  }, [isLoading]);

  const handleConnect = (connector) => {
    connect({ connector });
  };

  // close toast
  const handleCloseWalletToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setWalletToastOpen(false);
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        '.MuiDialog-paper': {
          pt: 2,
          pb: 5,
          pr: 4,
          pl: 4,
          borderRadius: 5,
        },
      }}
    >
      <DialogTitle>{t('wallet.dialog.title')}</DialogTitle>
      <List>
        {connectors &&
          (!isBrowser ? connectors.filter((c) => c.name !== 'MetaMask') : connectors).map(
            (connector) => (
              <ListItem disableGutters key={connector.id}>
                {!connector.ready ? (
                  <LoadingButton
                    fullWidth
                    variant="outlined"
                    onClick={() => window.open('https://metamask.io/download', connector.name)}
                    sx={{ justifyContent: 'flex-start', ml: 1, mr: 1, border: 0, p: 0 }}
                  >
                    <ListItemAvatar>
                      <img
                        src={isBrowser && connector.name === 'MetaMask' ? metamask : walletConnect}
                        alt={connector.name}
                        style={{ maxWidth: '25px', margin: 1 }}
                      />
                    </ListItemAvatar>
                    {isBrowser && t(`wallet.download`)}
                  </LoadingButton>
                ) : (
                  <LoadingButton
                    fullWidth
                    variant="outlined"
                    loading={isLoading && connector.id === pendingConnector?.id && true}
                    disabled={!connector.ready}
                    onClick={() => handleConnect(connector)}
                    sx={{ justifyContent: 'flex-start', ml: 1, mr: 1, border: 0, p: 0 }}
                  >
                    <ListItemAvatar>
                      <img
                        src={isBrowser && connector.name === 'MetaMask' ? metamask : walletConnect}
                        alt={connector.name}
                        style={{ maxWidth: '25px', margin: 1 }}
                      />
                    </ListItemAvatar>
                    {connector.ready && connector.name}
                  </LoadingButton>
                )}
              </ListItem>
            ),
          )}
      </List>
      <div className="card">
        {connectors && connectors.map((connector) => (
          <button
            disabled={!connector.ready}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            Connect to {connector.name}
            {isLoading && pendingConnector?.id === connector.id && ' (connecting)'}
          </button>
        ))}
        {/* <p>Connected to: {address || 'not connected yet'}</p> */}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Divider variant="middle" sx={{ m: 2 }} />
      <Typography sx={{ fontWeight: 600 }}>{t('wallet.dialog.learn')}</Typography>
      <Typography
        variant="body2"
        sx={{ maxWidth: '230px', pb: 2, pt: 1, fontSize: 14, fontWeight: 300 }}
      >
        {t('wallet.dialog.context')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant="outlined"
            size="small"
            onClick={() => window.open('https://docs.saydao.org/guide/wallet.html', 'learn...')}
            sx={{ maxWidth: 10, borderRadius: 10, pl: 5, pr: 5 }}
          >
            {t('button.wallet.learn')}
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              window.open('https://ethereum.org/en/wallets/find-wallet/', 'More wallets...')
            }
            sx={{ borderRadius: 10 }}
          >
            {t('button.wallet.wallets')}
          </Button>
        </Grid>
      </Grid>
      {error && (
        <MessageWallet
          walletError={error}
          walletToastOpen={walletToastOpen}
          handleCloseWalletToast={handleCloseWalletToast}
        />
      )}
    </Dialog>
  );
}

TheDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function WalletDialog({ openWallets, setOpenWallets }) {
  const { isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      setOpenWallets(false);
    }
  }, [isConnected]);

  const handleClose = () => {
    setOpenWallets(false);
  };

  return <TheDialog open={openWallets} onClose={handleClose} />;
}

WalletDialog.propTypes = {
  setOpenWallets: PropTypes.func.isRequired,
  openWallets: PropTypes.bool.isRequired,
};
