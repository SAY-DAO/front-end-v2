import { publicApi } from '../../apis/sayBase';
import {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_FAIL,
} from '../../constants/main/homeConstants';

export const fetchMyHome = () => async (dispatch, getState) => {
  try {
    dispatch({ type: HOME_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };

    const { data } = await publicApi.get(`/dashboard`, config);

    dispatch({
      type: HOME_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: HOME_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};
