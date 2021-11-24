import {
  SHAPARAK_PAYMENT_REQUEST,
  SHAPARAK_PAYMENT_SUCCESS,
  SHAPARAK_PAYMENT_FAIL,
  SHAPARAK_PAYMENT_RESET,
  CART_PAYMENT_REQUEST,
  CART_PAYMENT_SUCCESS,
  CART_PAYMENT_FAIL,
  CART_PAYMENT_RESET,
  CHECK_CART_PAYMENT_FAIL,
  CHECK_CART_PAYMENT_SUCCESS,
  CHECK_CART_PAYMENT_REQUEST,
  CHECK_CART_PAYMENT_RESET,
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
    case CART_PAYMENT_REQUEST:
      return { loading: true };
    case CART_PAYMENT_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case CART_PAYMENT_FAIL:
      return { loading: false, error: action.payload };
    case CART_PAYMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const checkCartPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_CART_PAYMENT_REQUEST:
      return { loading: true };
    case CHECK_CART_PAYMENT_SUCCESS:
      return { loading: false, success: true, result: action.payload };
    case CHECK_CART_PAYMENT_FAIL:
      return { loading: false, error: action.payload };
    case CHECK_CART_PAYMENT_RESET:
      return {};
    default:
      return state;
  }
};
