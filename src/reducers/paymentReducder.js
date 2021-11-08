import {
  SHAPARAK_PAYMENT_REQUEST,
  SHAPARAK_PAYMENT_SUCCESS,
  SHAPARAK_PAYMENT_FAIL,
  SHAPARAK_PAYMENT_RESET,
} from '../constants/paymentConstants';

export const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case SHAPARAK_PAYMENT_REQUEST:
      return { loading: true };
    case SHAPARAK_PAYMENT_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case SHAPARAK_PAYMENT_FAIL:
      return { loading: false, error: action.payload };
    case SHAPARAK_PAYMENT_RESET:
      return {};
    default:
      return state;
  }
};
