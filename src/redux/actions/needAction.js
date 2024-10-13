/* eslint-disable import/prefer-default-export */
import { publicApi } from '../../apis/sayBase';
import { ALL_NEEDS_FAIL, ALL_NEEDS_REQUEST, ALL_NEEDS_SUCCESS } from '../constants/needConstants';

export const fetchAlleeds = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ALL_NEEDS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };
    const { data } = await publicApi.get(`/needs?isChildConfirmed=true`, config);

    dispatch({
      type: ALL_NEEDS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: ALL_NEEDS_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};
