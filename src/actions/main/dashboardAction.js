import { publicApi } from '../../apis/sayBase';
import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
} from '../../constants/main/dashboardConstants';

export const fetchMyDashboard = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DASHBOARD_REQUEST });
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

    const { data } = await publicApi.get(`/dashboard`, config);

    dispatch({
      type: DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: DASHBOARD_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};
