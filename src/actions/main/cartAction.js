import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
} from '../../constants/cartConstants';

export const addToCart =
  (theChild, oneNeed, amount) => async (dispatch, getState) => {
    try {
      console.log(oneNeed.paid, amount);

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
          amount,
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

// export const cleanLocalCart = () => async (dispatch) => {
//   // eslint-disable-next-line no-undef
//   localStorage.removeItem('cartItems');
//   // eslint-disable-next-line no-undef
//   dispatch({
//     type: CART_REMOVE_ITEMS,
//   });
// };
