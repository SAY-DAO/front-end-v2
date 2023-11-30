import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import { Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';

export default function PaymentModal({ open, setOpen, handlePayment }) {
  const shaparakGate = useSelector((state) => state.shaparakGate);
  const { loading: loadingShaparakGate } = shaparakGate;

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (gateWayNumber) => {
    handlePayment(gateWayNumber);
  };

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <IconButton sx={{ position: 'absolute' }} onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
        <Grid container sx={{ p: 2, mt: 4 }}>
          <Grid item xs={6}>
            <DialogActions sx={{ m: 'auto', display: 'block', textAlign: 'center' }}>
              <LoadingButton
                loading={loadingShaparakGate || false}
                onClick={() => handleClick(2)}
                sx={{ border: '1px solid', height: 120, width: 120 }}
                autoFocus
              >
                <img
                  src="/images/payments/zibal.png"
                  alt="idpay"
                  width="80px"
                  style={{ bac: 'black' }}
                />
              </LoadingButton>
              <Typography sx={{ color: 'black', mt: 1 }}>پرداخت با زیبال</Typography>
              <Typography sx={{ color: 'black', mt: 1 }}>(در حال تعمیر)</Typography>
            </DialogActions>
          </Grid>
          <Grid item xs={6}>
            <DialogActions sx={{ m: 'auto', display: 'block', textAlign: 'center' }}>
              <LoadingButton
                loading={loadingShaparakGate || false}
                onClick={() => handleClick(1)}
                // disabled
                sx={{ border: '1px solid', height: 120, width: 120 }}
                autoFocus
              >
                <img
                  src="/images/payments/idpay.png"
                  alt="idpay"
                  width="80px"
                  style={{
                    opacity: 0.2,
                  }}
                />
              </LoadingButton>
              <Typography sx={{ color: 'black', mt: 1 }}>پرداخت با آی‌دی‌پی</Typography>
              <Typography sx={{ color: 'black', mt: 1 }}>(غیر فعال)</Typography>
            </DialogActions>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

PaymentModal.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handlePayment: PropTypes.func,
};
