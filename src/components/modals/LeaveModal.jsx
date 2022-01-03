import React, { useEffect, useState } from 'react';
import { Box, Grid, Link, Modal, Typography, Backdrop } from '@mui/material';
import Fade from '@mui/material/Fade';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import exitQuote from '../../apis/quote.json';
import {
  CHILD_RANDOM_SEARCH_RESET,
  CHILD_BY_TOKEN_RESET,
} from '../../constants/childConstants';

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
  const location = useLocation();
  const history = useHistory();

  const [redirect, setRedirect] = useState();

  useEffect(() => {
    setRedirect(location.search.split('=')[2]);
  }, []);

  const [open, setOpen] = useState(false);
  const [leave, setLeave] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLeave = () => {
    handleClose();
    setLeave(true);
  };

  useEffect(() => {
    if (leave && !open) {
      dispatch({ type: CHILD_RANDOM_SEARCH_RESET });
      dispatch({ type: CHILD_BY_TOKEN_RESET });
      localStorage.removeItem('randomChildToken');
      if (redirect) {
        history.push(redirect);
      } else {
        history.push('/main/search');
      }
    }
  }, [leave, open, dispatch, history, redirect]);

  useEffect(() => {
    if (backIsTrue) {
      handleOpen();
      setBackIsTrue(false);
    }
  }, [backIsTrue, setBackIsTrue]);

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
                spacing={4}
              >
                <Grid item>
                  <Link
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 'bolder',
                      color: '#7e7e7e !important',
                    }}
                    onClick={handleLeave}
                  >
                    {t('button.leave.yes')}
                  </Link>
                </Grid>
                <Grid item>
                  <Link
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
