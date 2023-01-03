import { publicApi } from '../apis/sayBase';
import {
  SHAPARAK_PAYMENT_REQUEST,
  SHAPARAK_PAYMENT_SUCCESS,
  SHAPARAK_PAYMENT_FAIL,
  SHAPARAK_CART_PAYMENT_REQUEST,
  SHAPARAK_CART_PAYMENT_FAIL,
  SHAPARAK_CART_PAYMENT_SUCCESS,
  CHECK_CART_PAYMENT_FAIL,
  CHECK_CART_PAYMENT_SUCCESS,
  CHECK_CART_PAYMENT_REQUEST,
} from '../constants/paymentConstants';

export const makePayment =
  (method, needId, amount, donation, isCredit) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: SHAPARAK_PAYMENT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: userInfo && userInfo.accessToken,
        },
      };
      const formData = new FormData();
      if (method === 'payAll' || method === 'paySome') {
        formData.append('method', method); // TODO: blockChain, Shaparak, PayPal, ...
        formData.append('needId', needId);
        formData.append('amount', amount);
        formData.append('donate', donation);
        formData.append('useCredit', isCredit);
      }

      const { data, status } = await publicApi.post(
        `/payment`,
        formData,
        config
      );
      dispatch({
        type: SHAPARAK_PAYMENT_SUCCESS,
        payload: { ...data, status },
      });
    } catch (e) {
      // check for generic and custom message to return using ternary statement
      dispatch({
        type: SHAPARAK_PAYMENT_FAIL,
        payload: e.response && e.response.status ? e.response : e.message,
      });
    }
  };

export const makeCartPayment =
  (donation, isCredit) => async (dispatch, getState) => {
    console.log(donation, isCredit);
    try {
      dispatch({ type: SHAPARAK_CART_PAYMENT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: userInfo && userInfo.accessToken,
        },
      };
      const formData = new FormData();
      formData.append('donate', donation);
      formData.append('useCredit', isCredit);

      const { data, status } = await publicApi.post(
        `/mycart/payment`,
        formData,
        config
      );
      dispatch({
        type: SHAPARAK_CART_PAYMENT_SUCCESS,
        payload: { ...data, status },
      });
    } catch (e) {
      // check for generic and custom message to return using ternary statement
      dispatch({
        type: SHAPARAK_CART_PAYMENT_FAIL,
        payload: e.response && e.response.status ? e.response : e.message,
      });
    }
  };

export const checkCartPayment = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CHECK_CART_PAYMENT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };

    const { data } = await publicApi.get(`/mycart`, config);
    dispatch({
      type: CHECK_CART_PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CHECK_CART_PAYMENT_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};
