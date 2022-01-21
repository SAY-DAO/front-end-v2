import { publicApi } from '../apis/sayBase';
import {
  DAO_NETWORK_REQUEST,
  DAO_NETWORK_SUCCESS,
  DAO_NETWORK_FAIL,
} from '../constants/daoConstants';

export const fetchFamilyNetworks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DAO_NETWORK_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };
    const { data } = await publicApi.get(`/public/children`, config);

    dispatch({
      type: DAO_NETWORK_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: DAO_NETWORK_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};
