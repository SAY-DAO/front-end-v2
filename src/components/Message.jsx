import * as React from 'react';
import Alert from '@material-ui/core/Alert';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import contents from '../inputsValidation/Contents';

export default function Message({
  frontError,
  backError,
  variant,
  children,
  severity,
}) {
  const { t } = useTranslation();

  const onRequestCheck = () => {
    if (frontError.status) {
      if (frontError.status === 400) {
        return t(contents.wrongEmail);
      }
      if (frontError.status === 422) {
        return t(contents.emailExists);
      }
      if (frontError.status === 429) {
        return t(contents.manyRequest);
      }
      return t(contents.sthIsWrong);
    }
    if (backError.status) {
      if (frontError.status === 710) {
        return t(contents.wrongUsername);
      }
      if (backError.status === 711) {
        return t(contents.usernameExists);
      }
      if (backError.status === 720) {
        return t(contents.wrongEmail);
      }
      if (backError.status === 721) {
        return t(contents.emailExists);
      }
      if (backError.status === 730) {
        return t(contents.wrongPhone);
      }
      if (backError.status === 731) {
        return t(contents.phoneExists);
      }
      if (backError.status === 400) {
        return t(contents.wrongCode);
      }
      // return t(contents.sthIsWrong);
    }
  };
  return (
    <Alert variant={variant} severity={severity}>
      {children || onRequestCheck()}
    </Alert>
  );
}

Message.propTypes = {
  frontError: PropTypes.object,
  backError: PropTypes.object,
  variant: PropTypes.string.isRequired,
  children: PropTypes.string,
  severity: PropTypes.string.isRequired,
};

Message.defaultProps = {
  frontError: {},
  backError: {},
  children: '',
};
