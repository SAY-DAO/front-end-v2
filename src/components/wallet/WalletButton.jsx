import { LoadingButton } from '@mui/lab';
import { styled, Typography } from '@mui/material';
import React from 'react';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const WalletButton = styled((props) => (
  <LoadingButton {...props} {...props.register} sx={{ display: 'flex !important' }}>
    <AccountBalanceWalletIcon sx={{ mr: 1 }} />
    <Typography
      sx={{
        fontSize: '12px',
        fontWeight: 'bold',
        textDecoration: 'none',
      }}
    >
      {props.children}
    </Typography>
  </LoadingButton>
))(() => ({
  color: 'black',
  textAlign: 'center',
  // backgroundColor: '#fee6e3',
  display: 'block',
  position: 'relative',
  padding: '8px 14px',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  // textShadow: '0px 1px 1px #000',
  filter: 'dropshadow(color=#000, offx=0px, offy=1px)',
  animation: '1.5s ease infinite alternate running shimmer',
  background: 'linear-gradient(20deg, #FFE27D 90%, #64E3FF 55%, #9192FF 100%)',
  // WebkitBoxShadow: 'inset 0 1px 0 #ffe5c4, 0 10px 0 #915100',
  // MozBoxShadow: 'inset 0 1px 0 #ffe5c4, 0 10px 0 #915100',
  // boxShadow: 'inset 0 1px 0 #ffe5c4, 0 10px 0 #915100',
  WebkitBorderRadius: '15px',
  MozBorderRadius: '15px',
  borderRadius: '15px',
  '&:active': {
    top: '5px',
    background: '#fee6e3',
    WebkitBoxShadow: 'inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100',
    MozBoxShadow: 'inset 0 1px 0 #ffe5c4, inset 0 -3pxpx 0 #915100',
    boxShadow: 'inset 0 1px 0 #ffe5c4, inset 0 -3px 0 #915100',
  },
  '&:after': {
    height: '100%',
    width: '100%',
    padding: '4px',
    position: 'absolute',
    bottom: '-15px',
    left: '-4px',
    zIndex: -1,
    background: '#2b1800',
    WebkitBorderRadius: '5px',
    MozBorderRadius: '5px',
    borderRadius: '5px',
  },
  '&:hover': {
    WebkitBoxShadow: 'inset 0 1px 0 #ffe5c4, 0 10px 0 #767372',
    MozBoxShadow: 'inset 0 1px 0 #ffe5c4, 0 10px 0 #767372',
    boxShadow: 'inset 0 1px 0 #ffe5c4, 0 10px 0 #767372',
  },
}));

export default WalletButton;
