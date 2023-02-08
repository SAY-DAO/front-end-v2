import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Link,
  Modal,
  Typography,
  Backdrop,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';
import Fade from '@mui/material/Fade';
import copy from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { inviteToMyFamily } from '../../actions/familyAction';
import Share from '../ShareButton';
import CopyModal from './CopyModal';

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

const roles = [
  'family.roles.father',
  'family.roles.mother',
  'family.roles.uncle',
  'family.roles.aunt',
  'family.roles.daei',
  'family.roles.ame',
];
const rolesRelative = [
  'family.rolesRelative.e',
  'family.rolesRelative.e',
  'family.rolesRelative.ye',
  'family.rolesRelative.ye',
  'family.rolesRelative.e',
  'family.rolesRelative.ye',
];

export default function GrowFamilyModal({ menuOpen, setMenuOpen, theChild }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [inviteRole, setInviteRole] = useState('');
  const [selectableRoles, setSelectableRoles] = useState({});
  const [rolesOption, setRolesOption] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [shareText, setShareText] = useState('');
  const [shareUrl, setShareUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const invite = useSelector((state) => state.invite);
  const { theInvite, success, loading, error } = invite;

  const handleOpen = () => {
    setOpen(true);
    setSubmitDisabled(true);
  };
  const handleClose = () => {
    setOpen(false);
    setMenuOpen(false);
    setInviteRole('');
    setShareText('');
  };

  // Remove Father or Mother role from selectable roles option if they are already taken.
  const handleSelectableRoles = () => {
    const onceRoles = [];
    const selectableRolesObj = { ...roles };
    const family = Object.assign(
      [],
      Object.values(theChild.childFamilyMembers)
    );

    for (let f = 0; f < family.length; f += 1) {
      const member = family[f];
      if (!member.isDeleted) {
        if (member.role === 0 || member.role === 1) {
          onceRoles.push(member.role);
        }
      }
    }
    for (let i = 0; i < onceRoles.length; i += 1) {
      delete selectableRolesObj[onceRoles[i]];
    }
    setSelectableRoles(selectableRolesObj);
  };

  const handleInviteRole = (event) => {
    setInviteRole(event.target.value);
    setSubmitDisabled(true);
  };

  // Copy link and text to clipboard in case sharing doesn't support
  const handleCopy = () => {
    copy(shareText + shareUrl);
    setSubmitDisabled(true);
    setIsCopied(true);
    handleClose();
    console.log('text copied!');
  };

  useEffect(() => {
    if (menuOpen) {
      handleOpen();
      setMenuOpen(false);
      handleSelectableRoles();
    }
  }, [menuOpen, setMenuOpen]);

  // Generate menu items in select invite role
  useEffect(() => {
    const options = [];
    Object.keys(selectableRoles).forEach((key, index) => {
      options.push(
        <MenuItem key={index} value={key}>
          {t(selectableRoles[key])}
        </MenuItem>
      );
    });
    setRolesOption(options);
  }, [selectableRoles]);

  // Generate invite text
  useEffect(() => {
    if (inviteRole) {
      setShareText(
        t('childPage.growFamilyModal.share.text', {
          roles: t(roles[theChild.userRole]),
          rolesRelative: t(rolesRelative[theChild.userRole]),
          childSayName: theChild.sayName,
          inviteRoles: t(roles[inviteRole]),
          inviteRolesRelative: t(rolesRelative[inviteRole]),
        })
      );
      dispatch(inviteToMyFamily(theChild.familyId, inviteRole));
    }
  }, [inviteRole]);

  useEffect(() => {
    if (success) {
      setShareUrl(theInvite.link);
      setSubmitDisabled(false);
    }
  }, [theInvite, success]);

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
              <Grid item xs={12}>
                <img
                  src="/images/icons/family.svg"
                  alt="icon"
                  style={{ minWidth: '45px' }}
                />
              </Grid>
              <Grid item xs={12} sx={{ margin: 2, textAlign: 'center' }}>
                <Typography
                  id="transition-modal-title"
                  variant="body2"
                  component="h2"
                >
                  {t('childPage.selectRoleModalDesc')}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ marginBottom: 2, textAlign: 'center' }}>
                <FormControl
                  fullWidth
                  variant="standard"
                  sx={{ minWidth: 150 }}
                >
                  <InputLabel id="role-label">
                    {t('search-result.tab2')}
                  </InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    value={inviteRole}
                    label="Role"
                    onChange={handleInviteRole}
                  >
                    {rolesOption}
                  </Select>
                </FormControl>
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
                  <Share
                    config={{
                      params: {
                        title: t('childPage.growFamilyModal.share.title'),
                        text: shareText,
                        url: shareUrl,
                      },
                      /* tslint:disable-next-line:no-console */
                      onShareSuccess: () => handleClose,
                      /* tslint:disable-next-line:no-console */
                      onShareError: (error) => {},
                    }}
                    text={t('button.inviteRoleSelect.yes')}
                    disabled={submitDisabled}
                    copyFunc={handleCopy}
                  />
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
                    {t('button.inviteRoleSelect.no')}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
      {isCopied && <CopyModal isCopied={isCopied} setIsCopied={setIsCopied} />}
    </div>
  );
}

GrowFamilyModal.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func,
  theChild: PropTypes.object,
};
