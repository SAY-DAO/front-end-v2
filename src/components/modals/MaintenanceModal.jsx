import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Box, Grid, Link, Modal, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'rgba(255, 255, 255, .7)',
  border: '1px solid transparent',
  borderRadius: '3%',
  boxShadow: 24,
  p: 4,
};

export default function MaintenanceModal({ isOpen }) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log(isOpen);
    if (isOpen) {
      handleOpen();
    }
  }, [isOpen]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Grid item xs={12}>
                <img src="/images/maintenance.png" alt="icon" style={{ maxWidth: '45px' }} />
              </Grid>
              <Grid item xs={12} sx={{ mt: 2, mb: 2, color: 'black' }}>
                <Typography>
                  متاسفانه چند روزی است که درگاه پرداخت قطع شده است. و این اشکال از سمت شرکت خدمات
                  دهنده (ID PAY) برای تمام کاربران‌شان به‌ وجود آماده است. پیگیر رفع این مشکل هستیم
                  و از شما بابت این موضوع عذرخواهی می‌کنیم.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Link sx={{ fontSize: '0.9rem', fontWeight: 'bolder' }} onClick={handleClose}>
                  {t('button.understand')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

MaintenanceModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};
