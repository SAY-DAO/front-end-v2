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
      return { loading: true };
    case CART_ADD_SUCCESS:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.productId === item.productId
      );
      if (existItem) {
        return {
          ...state,
          loadingCart: false,
          cartItems: state.cartItems.map((x) =>
            x.productId === existItem.productId ? item : x
          ),
        };
      }
      return {
        ...state,
        loadingCart: false,
        cartItems: [...state.cartItems, item],
      };

    case CART_ADD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CART_REMOVE_ITEMS:
      return { cartItems: [], shippingAddress: state.shippingAddress };
    default:
      return state;
  }
};

// switch (action.type) {
//     case CHILD_ONE_NEED_REQUEST:
//       return { loading: true };
//     case CHILD_ONE_NEED_SUCCESS:
//       return { loading: false, success: true, oneNeed: action.payload };
//     case CHILD_ONE_NEED_FAIL:
//       return { loading: false, error: action.payload };
//     case CHILD_ONE_NEED_RESET:
//       return {};
