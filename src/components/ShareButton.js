import * as React from 'react';
import webShare from 'react-web-share-api';
import PropTypes from 'prop-types';
import { Link } from '@mui/material';

const Share = ({ share, isSupported, copyFunc, text, disabled }) =>
  isSupported ? (
    <Link
      href="#"
      sx={{
        fontSize: '0.8rem',
        fontWeight: 'bolder',
      }}
      onClick={share}
      disabled={disabled}
    >
      {text}
    </Link>
  ) : (
    <Link
      href="#"
      sx={{
        fontSize: '0.8rem',
        fontWeight: 'bolder',
      }}
      onClick={copyFunc}
      disabled={disabled}
    >
      {text}
    </Link>
  );

export default webShare()(Share);

Share.propTypes = {
  share: PropTypes.func,
  isSupported: PropTypes.bool,
  copyFunc: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool,
};
