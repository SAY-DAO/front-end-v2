import { publicApi } from '../apis/sayBase';
import {
  SHAPARAK_PAYMENT_REQUEST,
  SHAPARAK_PAYMENT_SUCCESS,
  SHAPARAK_PAYMENT_FAIL,
} from '../constants/paymentConstants';

export const makePayment =
  (method, needId, amount, donate, useCredit) => async (dispatch, getState) => {
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
      formData.append('method', method); // TODO: blockChain, Shaparak, PayPal, ...
      formData.append('userId', userInfo && userInfo.user.id);
      formData.append('needId', needId);
      formData.append('amount', amount);
      formData.append('donate', donate);
      formData.append('useCredit', useCredit);

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
