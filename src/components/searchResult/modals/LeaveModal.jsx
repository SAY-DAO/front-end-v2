import React, { useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { Box, Grid, Link, Modal } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import exitQuote from '../../../apis/quote.json';
import {
  CHILD_RANDOM_SEARCH_RESET,
  CHILD_SEARCH_RESULT_RESET,
} from '../../../constants/childConstants';

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

export default function LeaveModel({ backIsTrue, setBackIsTrue }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLeave = () => {
    dispatch({ type: CHILD_RANDOM_SEARCH_RESET });
    dispatch({ type: CHILD_SEARCH_RESULT_RESET });
    history.push('/search ');
    handleClose();
  };

  useEffect(() => {
    if (backIsTrue) {
      handleOpen();
      setBackIsTrue(false);
    }
  }, [backIsTrue, setBackIsTrue]);

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
              <Grid item xs={12} sx={{ margin: 2 }}>
                <Typography
                  id="transition-modal-title"
                  variant="body2"
                  component="h2"
                >
                  {t(
                    exitQuote.exitQuote[
                      Math.floor(Math.random() * exitQuote.exitQuote.length)
                    ]
                  )}
                </Typography>
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                item
                xs={12}
                spacing={6}
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

LeaveModel.propTypes = {
  backIsTrue: PropTypes.bool.isRequired,
  setBackIsTrue: PropTypes.func,
};
