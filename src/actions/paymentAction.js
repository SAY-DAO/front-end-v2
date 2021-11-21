import { publicApi } from '../apis/sayBase';
import {
  SHAPARAK_PAYMENT_REQUEST,
  SHAPARAK_PAYMENT_SUCCESS,
  SHAPARAK_PAYMENT_FAIL,
  CART_PAYMENT_REQUEST,
  CART_PAYMENT_SUCCESS,
  CART_PAYMENT_FAIL,
} from '../constants/paymentConstants';

export const makePayment =
  (method, needId, amount, donation, isCredit) =>
  async (dispatch, getState) => {
    console.log(method, needId, amount, donation, isCredit);
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
        formData.append('need_id', needId);
        formData.append('amount', amount);
        formData.append('donate', donation);
        formData.append('useCredit', true);
      }

      const { data } = await publicApi.post(`/payment`, formData, config);
      dispatch({
        type: SHAPARAK_PAYMENT_SUCCESS,
        payload: data,
      });
    } catch (e) {
      // check for generic and custom message to return using ternary statement
      dispatch({
        type: SHAPARAK_PAYMENT_FAIL,
        payload: e.response && e.response.status ? e.response : e.message,
      });
    }
  };

export const cartPayment = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_PAYMENT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };

    const cartItems = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];

    let needIds = [];
    if (cartItems[0]) {
      for (let i = 0; i < cartItems.length; i += 1) {
        needIds.push(cartItems[i].needId);
      }
    } else {
      needIds = [];
    }

    console.log({ cartItems });
    const { data } = await publicApi.put(`/mycart`, { needIds }, config);
    dispatch({
      type: CART_PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CART_PAYMENT_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};
