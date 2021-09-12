import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
  CART_BADGE_REQUEST,
  CART_BADGE_FAIL,
  CART_BADGE_SUCCESS,
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
