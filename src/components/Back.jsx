import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { changeVerifyStep } from '../actions/userAction';
import { USER_VERIFY_RESET } from '../constants/main/userConstants';

const Back = ({ step, to, isOrange, handleClickOverride }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // check for language on browser reload dir="" needs to change according to lang
  useEffect(() => {
    const getLanguage = () =>
      i18next.language || window.localStorage.i18nextLng;

    if (document.getElementById('direction')) {
      const currentLang = getLanguage();
      const elem = document.getElementById('direction');

      if (currentLang) {
        if (currentLang === 'fa') {
          elem.setAttribute('dir', 'rtl');
        } else {
          elem.setAttribute('dir', 'ltr');
        }
      }
    }
  }, [i18next.language || window.localStorage.i18nextLng]);

  const clickHandle = () => {
    if (!handleClickOverride) {
      dispatch(changeVerifyStep(step));
      dispatch({ type: USER_VERIFY_RESET });
      history.push(to);
    } else {
      handleClickOverride();
    }
  };

  return (
    <Link to={to} onClick={clickHandle}>
      {isOrange ? (
        <img
          src="/images/back_orange.svg"
          alt="back"
          style={{
            top: 0,
            left: 'calc(10%  - 30px )',
            width: '24px',
            margin: '18px',
            position: 'absolute',
            zIndex: 10,
          }}
        />
      ) : (
        <img
          src="/images/back.svg"
          alt="back"
          style={{
            top: 0,
            left: 'calc(10%  - 30px )',
            width: '24px',
            margin: '18px',
            position: 'fixed',
            zIndex: 10,
          }}
        />
      )}
    </Link>
  );
};

Back.propTypes = {
  step: PropTypes.string,
  to: PropTypes.string,
  isOrange: PropTypes.bool.isRequired,
  handleClickOverride: PropTypes.func,
};

Back.defaultProps = {
  step: '',
  to: '#',
};
export default Back;
