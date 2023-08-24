import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { isResolved } from '../../../utils/helpers';

export default function DaoSignatureMenu({ handleComment }) {
  const { t } = useTranslation();

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
        <MenuItem disabled={oneReadyNeed && !isResolved(oneReadyNeed)} onClick={handleComment}>
          {oneReadyNeed && isResolved(oneReadyNeed)
            ? t('comment.report')
            : t('comment.investigating')}
        </MenuItem>
      </Menu>
    </div>
  );
}

DaoSignatureMenu.propTypes = {
  handleComment: PropTypes.func,
};
