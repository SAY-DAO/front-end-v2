import * as React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { Alert, Snackbar } from '@mui/material';
import '../i18n';

export default function MessageWallet({
  severity,
  walletError,
  walletToastOpen,
  handleCloseWalletToast,
}) {
  const { t } = useTranslation();
  const onRequestCheck = () => {
    if (walletError.code === -32002) {
      return t('error.wallet.32002');
    }
    if (walletError.code === 4001) {
      return t('error.wallet.4001');
    }
    if (walletError.code === "ACTION_REJECTED") {
      return t('error.wallet.4001');
    }
    if (typeof walletError === 'string') {
      return walletError;
    }
    if (walletError.code === -32603) {
      return t('error.wallet.32603');
    }
    
    return t('error.wallet.0');
  };

  return (
    <Snackbar open={walletToastOpen} autoHideDuration={6000} onClose={handleCloseWalletToast}>
      <Alert
        onClose={handleCloseWalletToast}
        variant="filled"
        severity={severity}
        sx={{ width: '100%' }}
      >
        {onRequestCheck()}
      </Alert>
    </Snackbar>
  );
}

MessageWallet.propTypes = {
  walletError: PropTypes.any,
  handleCloseWalletToast: PropTypes.func,
  walletToastOpen: PropTypes.bool,
  severity: PropTypes.string,
};
