/* eslint-disable no-case-declarations */
import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_REMOVE_ITEMS,
  CART_ADD_FAIL,
} from '../constants/cartConstants';

export default (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_REQUEST:
      return { loading: true, ...state };
    case CART_ADD_SUCCESS:
      const item = action.payload;
      // return object or nothing
      const existItem = state.cartItems.find((x) => x.needId === item.needId);
      if (existItem) {
        return {
          ...state,
          loading: false,
          cartItems: state.cartItems.map((x) =>
            x.needId === existItem.needId ? item : x
          ),
        };
      }
      return {
        ...state,
        loading: false,
        cartItems: [...state.cartItems, item],
      };

    case CART_ADD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CART_REMOVE_ITEMS:
      return { cartItems: [] };
    default:
      return state;
  }
};
