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
  const [selectedRole, setSelectedRole] = useState('');
  const [selectableRoles, setSelectableRoles] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLeave = () => {
    dispatch(leaveFamily(theChild.familyId));
    handleClose();
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
    setSelectableRoles(Object.assign([], Object.values(selectableRolesObj)));
  };
  const handleSelectedRole = (event) => {
    setSelectedRole(event.target.value);
  };

  useEffect(() => {
    handleSelectableRoles();
  }, []);

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
                    value={selectedRole}
                    label="Role"
                    onChange={handleSelectedRole}
                  >
                    {selectableRoles.map((role, index) => (
                      <MenuItem key={index} value={index}>
                        {t(role)}
                      </MenuItem>
                    ))}
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
                  <Link
                    href="#"
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 'bolder',
                    }}
                    onClick={handleLeave}
                  >
                    {t('button.inviteRoleSelect.yes')}
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
                    {t('button.inviteRoleSelect.no')}
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

GrowFamilyModal.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func,
  theChild: PropTypes.object,
};
