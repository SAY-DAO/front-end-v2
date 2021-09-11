/* eslint-disable no-case-declarations */
import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_REMOVE_ITEMS,
  CART_ADD_FAIL,
  CART_BADGE_REQUEST,
  CART_BADGE_FAIL,
  CART_BADGE_SUCCESS,
} from '../constants/main/cartConstants';

export const cartAddReducer = (state = { cartItems: [] }, action) => {
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
          loading: true,
          success: false,
          cartItems: state.cartItems.map((x) =>
            x.needId === existItem.needId ? item : x
          ),
        };
      }
      return {
        ...state,
        loading: false,
        success: true,
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

export const cartBadgeReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_BADGE_REQUEST:
      return { loading: true, ...state };
    case CART_BADGE_SUCCESS:
      return { loading: false, badgeNumber: action.payload };
    case CART_BADGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
