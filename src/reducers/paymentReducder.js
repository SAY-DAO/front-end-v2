import {
  SHAPARAK_PAYMENT_REQUEST,
  SHAPARAK_PAYMENT_SUCCESS,
  SHAPARAK_PAYMENT_FAIL,
} from '../constants/paymentConstants';

export const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case SHAPARAK_PAYMENT_REQUEST:
      return { loading: true };
    case SHAPARAK_PAYMENT_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case SHAPARAK_PAYMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
