/* eslint-disable react/prop-types */
import * as React from 'react';
import Alert from '@material-ui/core/Alert';
import { useTranslation } from 'react-i18next';
import contents from '../inputsValidation/Contents';

export default function Message({
  onRequestFrontError,
  onRequestBackError,
  variant,
  children,
  severity,
}) {
  const { t } = useTranslation();

  const onRequestCheck = () => {
    if (onRequestFrontError) {
      if (onRequestFrontError.status === 400) {
        return t(contents.wrongEmail);
      }
      if (onRequestFrontError.status === 422) {
        return t(contents.emailExists);
      }
      if (onRequestFrontError.status === 429) {
        return t(contents.manyRequest);
      }

      return t(contents.sthIsWrong);
    }
    if (onRequestBackError) {
      if (onRequestBackError.status === 720) {
        return t(contents.wrongEmail);
      }
      if (onRequestBackError.status === 721) {
        return t(contents.emailExists);
      }
      if (onRequestBackError.status === 730) {
        return t(contents.wrongPhone);
      }
      if (onRequestBackError.status === 731) {
        return t(contents.phoneExists);
      }
      return t(contents.sthIsWrong);
    }
  };
  return (
    <Alert variant={variant} severity={severity}>
      {children || onRequestCheck()}
    </Alert>
  );
}
