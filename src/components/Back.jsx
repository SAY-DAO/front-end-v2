import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { changeVerifyStep } from '../actions/userAction';
import { USER_VERIFY_RESET } from '../constants/userConstants';

const Back = ({ step, to }) => {
  const dispatch = useDispatch();

  const clickHandle = () => {
    dispatch(changeVerifyStep(step));
    dispatch({ type: USER_VERIFY_RESET });
  };

  return (
    <Link to={to || '#'} onClick={clickHandle}>
      <img
        src="/images/back_orange.svg"
        alt="back"
        style={{
          top: 0,
          left: 0,
          width: '24px',
          margin: '18px',
          position: 'absolute',
          zIndex: 10,
        }}
      />
    </Link>
  );
};

Back.propTypes = {
  step: PropTypes.string,
  to: PropTypes.string,
};

Back.defaultProps = {
  step: '',
  to: '#',
};
export default Back;
