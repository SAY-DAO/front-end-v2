import { publicApi } from '../../apis/sayBase';
import {
  CART_ADD_REQUEST,
  CART_ADD_SUCCESS,
  CART_ADD_FAIL,
  CART_REMOVE_ITEMS,
} from '../../constants/cartConstants';

export const addToCart = (needId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_ADD_REQUEST });

    const {
      userLogin: { userInfo, localUserLogin },
    } = getState();
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo
          ? userInfo.accessToken
          : localUserLogin.accessToken,
      },
    };
    const { data } = await publicApi.get(`/need/needId=${needId}`, config);
    dispatch({
      type: CART_ADD_SUCCESS,
      payload: {
        needId: data.id,
        child_id: data.child_id,
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        category: data.category,
        isUrgent: data.isUrgent,
        details: data.details,
        informations: data.informations,
        purchase_cost: data.purchase_cost,
        link: data.link,
        affiliateLinkUrl: data.affiliateLinkUrl,
        isDone: data.isDone,
        isDeleted: data.isDeleted,
        receipts: data.receipts,
        isConfirmed: data.isConfirmed,
        confirmUser: data.confirmUser,
        type: data.type,
        doing_duration: data.doing_duration,
        status: data.status,
        status_updated_at: data.status_updated_at,
        isReported: data.isReported,
        img: data.img,
        title: data.title,
        oncePurchased: data.oncePurchased,
        bank_track_id: data.bank_track_id,
        unavailable_from: data.unavailable_from,
        doneAt: data.doneAt,
        purchase_date: data.purchase_date,
        dkc: data.dkc,
        expected_delivery_date: data.expected_delivery_date,
        ngo_delivery_date: data.ngo_delivery_date,
        child_delivery_date: data.child_delivery_date,
        confirmDate: data.confirmDate,
        paid: data.paid,
        donated: data.donated,
        childSayName: data.childSayName,
        cost: data.cost,
        pretty_cost: data.pretty_cost,
        pretty_paid: data.pretty_paid,
        pretty_donated: data.pretty_donated,
        unpayable: data.unpayable,
        unpayable_from: data.unpayable_from,
        progress: data.progress,
        status_description: data.status_description,
        created: data.created,
        updated: data.updated,
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
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};

export const cleanLocalCart = () => async (dispatch) => {
  localStorage.removeItem('cartItems');
  dispatch({
    type: CART_REMOVE_ITEMS,
  });
};
