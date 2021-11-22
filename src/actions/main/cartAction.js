import { publicApi } from '../../apis/sayBase';
import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
  CART_BADGE_REQUEST,
  CART_BADGE_FAIL,
  CART_BADGE_SUCCESS,
  CART_CHECK_REQUEST,
  CART_CHECK_SUCCESS,
  CART_CHECK_FAIL,
  CART_REMOVE_NA_REQUEST,
  CART_REMOVE_NA_SUCCESS,
  CART_REMOVE_NA_FAIL,
} from '../../constants/main/cartConstants';

export const addToCart =
  (theChild, oneNeed, amount) => async (dispatch, getState) => {
    try {
      dispatch({ type: CART_ADD_REQUEST });

      dispatch({
        type: CART_ADD_SUCCESS,
        payload: {
          childId: theChild.id,
          childSayName: theChild.sayName,
          needId: oneNeed.id,
          id: oneNeed.id,
          name: oneNeed.name,
          title: oneNeed.title,
          img: oneNeed.img,
          cost: oneNeed.cost,
          paid: oneNeed.paid,
          amount: Number(amount),
        },
      });
      // save the item in browser local storage. It needs to be parsed back to an object to be used
      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().theCart.cartItems)
      );
    } catch (e) {
      // check for generic and custom message to return using ternary statement
      dispatch({
        type: CART_ADD_FAIL,
        payload:
          e.response && e.response.oneNeed.detail
            ? e.response.oneNeed.detail
            : e.message,
      });
    }
  };

export const changeCartBadgeNumber = (value) => async (dispatch) => {
  try {
    dispatch({ type: CART_BADGE_REQUEST });
    dispatch({
      type: CART_BADGE_SUCCESS,
      payload: value,
    });
  } catch (e) {
    dispatch({
      type: CART_BADGE_FAIL,
      payload:
        e.response && e.response.oneNeed.detail
          ? e.response.oneNeed.detail
          : e.message,
    });
  }
};

export const checkCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_CHECK_REQUEST });
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
      type: CART_CHECK_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CART_CHECK_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const removeUnavailableItems = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_REMOVE_NA_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };

    dispatch({
      type: CART_REMOVE_NA_SUCCESS,
      // payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CART_REMOVE_NA_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};
