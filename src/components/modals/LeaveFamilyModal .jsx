import React, { useEffect, useState } from 'react';
import { Box, Grid, Link, Modal, Typography, Backdrop } from '@mui/material';
import Fade from '@mui/material/Fade';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { leaveFamily } from '../../actions/familyAction';

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

export default function LeaveFamilyModal({ menuOpen, setMenuOpen, theChild }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLeave = () => {
    dispatch(leaveFamily(theChild.familyId));
    handleClose();
  };

  useEffect(() => {
    if (menuOpen) {
      handleOpen();
      setMenuOpen(false);
    }
  }, [menuOpen, setMenuOpen]);

  return (
    <div>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
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
              <Grid item xs={12} sx={{ margin: 2, textAlign: 'center' }}>
                <Typography
                  id="transition-modal-title"
                  variant="body2"
                  component="h2"
                >
                  {t('childPage.leaveModalDesc', {
                    childSayName: theChild.sayName,
                  })}
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                item
                xs={12}
                spacing={4}
              >
                <Grid item>
                  <Link
                    href="#"
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 'bolder',
                    }}
                    onClick={handleLeave}
                  >
                    {t('button.leave.yes')}
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 'bolder',
                    }}
                    onClick={handleClose}
                  >
                    {t('button.leave.no')}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

LeaveFamilyModal.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func,
  theChild: PropTypes.object,
};
