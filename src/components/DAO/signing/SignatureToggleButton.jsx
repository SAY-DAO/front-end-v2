import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import { useTranslation } from 'react-i18next';
import { ToggleButtonGroup } from '@mui/material';
import PropTypes from 'prop-types';

export default function SignatureToggleButton({ alignment, setAlignment }) {
  const { t } = useTranslation();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      sx={{ justifyContent: 'center', width: '100%', height: 35 }}
    >
      <ToggleButton value="ready" sx={{ width: '35%', borderRadius: 10 }}>
        {t('dao.signaturesTab.ready')}
      </ToggleButton>
      <ToggleButton value="signed" sx={{ width: '35%', borderRadius: 10 }}>
        {t('dao.signaturesTab.signed')}
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

SignatureToggleButton.propTypes = {
  alignment: PropTypes.string,
  setAlignment: PropTypes.func,
};
