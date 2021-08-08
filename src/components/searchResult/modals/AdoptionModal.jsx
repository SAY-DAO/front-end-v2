import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { Box, Grid, Link, Modal } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
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
  userRole,
  childSayName,
  roles,
  rolesRelative,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { success: successLogin } = userLogin;

  const childRandomRSearch = useSelector((state) => state.childRandomRSearch);
  const { theChildToken } = childRandomRSearch;

  const invite = () => {
    const { selectedRole } = this.state;
    const { familyId } = this.state;

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
      formData.set('family_id', familyId);
      formData.set('role', selectedRole);
      api
        .request({
          url: '/invitations/',
          method: 'POST',
          data: formData,
        })
        .then((res) => {
          const result = res.data;
          this.setState(
            {
              invitationToken: result.token,
            },
            isLoggedIn() ? this.addToFamily : this.saveToken
          );
        })
        .catch((err) => {
          // TODO: error handling
          // 404 = family not found, when child gone for example
          // this condition may happen in get child by token
          // 500 error
        });
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Adopt</Button>
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
                  {t('search-result.adoptModal.desc', {
                    childSayName,
                    roles,
                    rolesRelative,
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
                spacing={6}
              >
                <Grid item>
                  <Link
                    href="#"
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 'bolder',
                    }}
                    onClick={handleClose}
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
  family: PropTypes.array,
  userRole: PropTypes.number,
  childSayName: PropTypes.string,
  roles: PropTypes.string,
  rolesRelative: PropTypes.string,
};
