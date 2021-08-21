import { publicApi } from '../apis/sayBase';
import {
  CHILD_RANDOM_SEARCH_REQUEST,
  CHILD_RANDOM_SEARCH_SUCCESS,
  CHILD_RANDOM_SEARCH_FAIL,
  CHILD_SEARCH_RESULT_REQUEST,
  CHILD_SEARCH_RESULT_SUCCESS,
  CHILD_SEARCH_RESULT_FAIL,
  CHILD_BY_ID_REQUEST,
  CHILD_BY_ID_SUCCESS,
  CHILD_BY_ID_FAIL,
  CHILD_NEEDS_REQUEST,
  CHILD_NEEDS_SUCCESS,
  CHILD_NEEDS_FAIL,
} from '../constants/childConstants';

export const fetchRandomChild = () => async (dispatch) => {
  try {
    dispatch({ type: CHILD_RANDOM_SEARCH_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await publicApi.post('/search/random', config);

    dispatch({
      type: CHILD_RANDOM_SEARCH_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CHILD_RANDOM_SEARCH_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const fetchChildResult = (token) => async (dispatch) => {
  try {
    dispatch({ type: CHILD_SEARCH_RESULT_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await publicApi.get(`/child/invitations/${token}`, config);

    dispatch({
      type: CHILD_SEARCH_RESULT_SUCCESS,
      payload: data,
    });
    localStorage.setItem('randomChildToken', JSON.stringify(token));
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CHILD_SEARCH_RESULT_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const fetchMyChildById = (childId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHILD_BY_ID_REQUEST });

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
    const { data } = await publicApi.get(
      `/child/childId=${childId}&confirm=1`,
      config
    );

    dispatch({
      type: CHILD_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CHILD_BY_ID_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const fetchChildNeeds = (childId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHILD_NEEDS_REQUEST });

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
    const { data } = await publicApi.get(
      `/child/${childId}/needs/summary`,
      config
    );

    dispatch({
      type: CHILD_NEEDS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CHILD_NEEDS_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};
