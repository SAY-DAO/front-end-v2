import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Box, CircularProgress, Grid, Link, Modal } from '@mui/material';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { joinVirtualFamily } from '../../redux/actions/familyAction';
import { fetchMyHome } from '../../redux/actions/main/homeAction';

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

export default function AdoptionModal({
  adoption,
  setAdoption,
  selectedRole,
  familyId,
  userRole,
  childSayName,
  roles,
  rolesRelative,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [adoptText, setAdoptText] = useState('');
  const [authWarnText, setAuthWarnText] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setAdoption(false);
    setOpen(false);
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success: successLogin } = userLogin;

  const joinResult = useSelector((state) => state.joinResult);
  const { loading: loadingJoin, success: successJoin } = joinResult;

  const myHome = useSelector((state) => state.myHome);
  const { success: successHome } = myHome;

  // redirect after joining
  useEffect(() => {
    if (successJoin) {
      dispatch(fetchMyHome());
    }
    if (successJoin && successHome) {
      navigate('/main/home');
    }
  }, [successJoin, successHome, dispatch]);

  // modal contents when selecting a role
  useEffect(() => {
    setAuthWarnText(
      t('search-result.authWarn.desc', {
        childSayName,
        roles,
        rolesRelative,
      })
    );
    setAdoptText(
      t('search-result.adoptModal.desc', {
        childSayName,
        roles,
        rolesRelative,
      })
    );
    if (!userInfo && !successLogin) {
      setContent(authWarnText);
    } else {
      setContent(adoptText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childSayName, roles, rolesRelative, selectedRole, open]);

  useEffect(() => {
    if (adoption && selectedRole) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [selectedRole, adoption]);

  const handleJoin = () => {
    if (userRole === null && userInfo && selectedRole) {
      dispatch(joinVirtualFamily(selectedRole, familyId));
    } else if (!userInfo && !successLogin) {
      navigate('/auth/login');
    }
  };

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
                  {content}
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
                    onClick={handleJoin}
                  >
                    {!loadingJoin ? (
                      t('button.accept.yes')
                    ) : (
                      <CircularProgress size={30} />
                    )}
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 'bolder',
                      color: '#7e7e7e !important',
                    }}
                    onClick={handleClose}
                  >
                    {t('button.accept.no')}
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

AdoptionModal.propTypes = {
  adoption: PropTypes.bool,
  setAdoption: PropTypes.func,
  selectedRole: PropTypes.number.isRequired,
  familyId: PropTypes.number.isRequired,
  userRole: PropTypes.number,
  childSayName: PropTypes.string.isRequired,
  roles: PropTypes.string.isRequired,
  rolesRelative: PropTypes.string.isRequired,
};
