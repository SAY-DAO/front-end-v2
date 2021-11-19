import { publicApi } from '../apis/sayBase';
import {
  SHAPARAK_PAYMENT_REQUEST,
  SHAPARAK_PAYMENT_SUCCESS,
  SHAPARAK_PAYMENT_FAIL,
} from '../constants/paymentConstants';

export const makePayment =
  (method, needId, amount, donation, useCredit) =>
  async (dispatch, getState) => {
    console.log(method, needId, amount, donation, useCredit);
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
        formData.append('use_credit', useCredit);
      } else if (method === 'cart') {
        formData.append('method', method); // TODO: blockChain, Shaparak, PayPal, ...
        formData.append('amount', amount);
        formData.append('donate', donation);
        formData.append('use_credit', useCredit);
      }

      // back-end use this for test
      if (useCredit > 0) {
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
