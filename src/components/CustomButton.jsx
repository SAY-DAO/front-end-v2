import { Button } from '@mui/material';
import { PropTypes } from 'prop-types';
import React from 'react';
import { withStyles } from '@mui/styles';
import { withTranslation } from 'react-i18next';

const styles = {
  root: {
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
};

const CustomButton = ({ color, children }) => (
  <Button variant="contained" color={color}>
    {children}
  </Button>
);

CustomButton.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

// withTranslation to load i18n before - HOC
export default withTranslation()(withStyles(styles)(CustomButton));
