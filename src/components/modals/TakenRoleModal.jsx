import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Box, Grid, Link, Modal } from '@mui/material';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'rgba(255, 255, 255, .9)',
  border: '1px solid transparent',
  borderRadius: '3%',
  boxShadow: 24,
  p: 4,
};

export default function TakenRoleModal({
  takenRole,
  setTakenRole,
  childSayName,
  rolesRelative,
  roles,
}) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setTakenRole(false);
    setOpen(false);
  };

  useEffect(() => {
    if (takenRole) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [takenRole]);

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
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={12}>
                <img
                  src="/images/child/gone.svg"
                  alt="icon"
                  style={{ minWidth: '45px' }}
                />
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 2, textAlign: 'center' }}>
                <Typography
                  id="transition-modal-title"
                  variant="body2"
                  component="h2"
                >
                  {t('error.adoption.FaMoTaken', {
                    roles,
                    rolesRelative,
                    childSayName,
                  })}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Link
                  href="#"
                  sx={{ fontSize: '0.9rem', fontWeight: 'bolder' }}
                  onClick={handleClose}
                >
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

TakenRoleModal.propTypes = {
  takenRole: PropTypes.bool.isRequired,
  setTakenRole: PropTypes.func.isRequired,
  childSayName: PropTypes.string.isRequired,
  rolesRelative: PropTypes.string.isRequired,
  roles: PropTypes.string.isRequired,
};
