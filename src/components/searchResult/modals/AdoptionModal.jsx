import React, { useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { Box, Grid, Link, Modal } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { joinMyFamily } from '../../../actions/familyAction';

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
  successLogin,
  roleSelecting,
  setRoleSelecting,
  selectedRole,
  family,
  userRole,
  childSayName,
  roles,
  rolesRelative,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [adoptText, setAdoptText] = useState('');
  const [authWarnText, setAuthWarnText] = useState('');

  const childRandomSearch = useSelector((state) => state.childRandomSearch);
  const { theChildToken } = childRandomSearch;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    if (!successLogin) {
      console.log(roles);
      setContent(authWarnText);
    } else {
      setContent(adoptText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childSayName, roles, rolesRelative, roleSelecting]);

  useEffect(() => {
    if (roleSelecting) {
      handleOpen();
      setRoleSelecting(false);
    }
  }, [roleSelecting, setRoleSelecting, childSayName]);

  const handleJoin = () => {
    if (
      userRole != null &&
      userRole === selectedRole &&
      successLogin &&
      theChildToken
    ) {
      dispatch(joinMyFamily(theChildToken.token));
    } else if (!successLogin) {
      history.push('/login');
    } else {
      const formData = new FormData();
      formData.set('family_id', family.id);
      formData.set('role', selectedRole);
      // api
      //   .request({
      //     url: '/invitations/',
      //     method: 'POST',
      //     data: formData,
      //   })
      //   .then((res) => {
      //     const result = res.data;
      //     this.setState(
      //       {
      //         invitationToken: result.token,
      //       },
      //       isLoggedIn() ? this.addToFamily : this.saveToken
      //     );
      // })
      // .catch((err) => {
      //   // TODO: error handling
      //   // 404 = family not found, when child gone for example
      //   // this condition may happen in get child by token
      //   // 500 error
      // });
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
              <Grid item xs={12} sx={{ marginTop: 2 }}>
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
                spacing={6}
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
                    {t('button.accept.yes')}
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
  successLogin: PropTypes.bool,
  roleSelecting: PropTypes.bool.isRequired,
  setRoleSelecting: PropTypes.func,
  selectedRole: PropTypes.number,
  family: PropTypes.array.isRequired,
  userRole: PropTypes.number,
  childSayName: PropTypes.string.isRequired,
  roles: PropTypes.string.isRequired,
  rolesRelative: PropTypes.string.isRequired,
};
