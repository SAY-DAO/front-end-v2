import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { SAY_DAPP_ID } from '../../../utils/configs';

export default function DaoSignatureMenu({ handleComment, setOpenDrawer }) {
  const { t } = useTranslation();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const readySigningOneNeed = useSelector((state) => state.readySigningOneNeed);
  const { oneReadyNeed } = readySigningOneNeed;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawer = () => {
    handleClose();
    setOpenDrawer(true);
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          disabled={
            !oneReadyNeed ||
            (oneReadyNeed && !oneReadyNeed.isResolved) ||
            (oneReadyNeed &&
              oneReadyNeed.signatures.find((s) => s.flaskUserId === userInfo.user.id) != null)
          }
          onClick={handleComment}
        >
          {oneReadyNeed &&
          oneReadyNeed.isResolved &&
          !oneReadyNeed.signatures.find((s) => s.flaskUserId === userInfo.user.id)
            ? t('comment.report')
            : oneReadyNeed &&
              oneReadyNeed.isResolved &&
              oneReadyNeed.signatures.find((s) => s.flaskUserId === userInfo.user.id) &&
              oneReadyNeed.verifiedPayments.filter(
                (p) => p.needAmount > 0 && p.flaskUserId !== SAY_DAPP_ID,
              ).length === 1 // only one family member
            ? t('comment.waitingAuditor')
            : oneReadyNeed &&
              oneReadyNeed.isResolved &&
              oneReadyNeed.signatures.find((s) => s.flaskUserId === userInfo.user.id) &&
              oneReadyNeed.verifiedPayments.filter(
                (p) => p.needAmount > 0 && p.flaskUserId !== SAY_DAPP_ID,
              ).length > 1 // more than one family member
            ? t('comment.waitingFamily')
            : t('comment.investigating')}
        </MenuItem>
        {oneReadyNeed && oneReadyNeed.comments && oneReadyNeed.comments[0] && (
          <MenuItem
            disabled={
              !oneReadyNeed || (oneReadyNeed && oneReadyNeed.comments && !oneReadyNeed.comments[0])
            }
            onClick={handleDrawer}
          >
            {t('comment.signed.history')}
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

DaoSignatureMenu.propTypes = {
  handleComment: PropTypes.func,
  setOpenDrawer: PropTypes.func,
};
