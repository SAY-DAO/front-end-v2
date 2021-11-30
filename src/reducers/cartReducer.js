/* eslint-disable no-case-declarations */
import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_RESET,
  CART_ADD_FAIL,
  CART_BADGE_REQUEST,
  CART_BADGE_FAIL,
  CART_BADGE_SUCCESS,
  CART_BADGE_RESET,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
  CART_UPDATE_FAIL,
  CART_UPDATE_RESET,
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

    case CART_ADD_RESET:
      return { cartItems: [] };
    default:
      return state;
  }
};

export const cartBadgeReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_BADGE_REQUEST:
      return { ...state, loading: true };
    case CART_BADGE_SUCCESS:
      return {
        loading: false,
        success: true,
        badgeNumber: action.payload,
      };
    case CART_BADGE_FAIL:
      return { loading: false, error: action.payload };
    case CART_BADGE_RESET:
      return {};
    default:
      return state;
  }
};

export const cartUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_UPDATE_REQUEST:
      return { loading: true };
    case CART_UPDATE_SUCCESS:
      return { loading: false, success: true, updateResult: action.payload };
    case CART_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CART_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
