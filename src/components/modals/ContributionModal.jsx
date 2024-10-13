import React from 'react';
import { Box, Grid, Link, Modal } from '@mui/material';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ContributionModal({ open, setOpen, data }) {
  const { t } = useTranslation();

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Grid item xs={12}>
               <WorkOutlineIcon/>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 2, textAlign: 'center' }}>
                <Typography id="transition-modal-title" variant="body2" component="h2">
                  {data.title}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginTop: 2 }}>
                <Typography
                  id="transition-modal-title"
                  variant="body2"
                  component="h2"
                  sx={{
                    maxHeight: 300,
                    overflow: 'scroll',
                    mb: 2,
                  }}
                >
                  {data.description}
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

ContributionModal.propTypes = {
  data: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
