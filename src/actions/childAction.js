import { publicApi, publicApi3 } from '../apis/sayBase';
import {
  CHILD_RANDOM_SEARCH_REQUEST,
  CHILD_RANDOM_SEARCH_SUCCESS,
  CHILD_RANDOM_SEARCH_FAIL,
  CHILD_BY_ID_REQUEST,
  CHILD_BY_ID_SUCCESS,
  CHILD_BY_ID_FAIL,
  CHILD_NEEDS_REQUEST,
  CHILD_NEEDS_SUCCESS,
  CHILD_NEEDS_FAIL,
  CHILD_ONE_NEED_REQUEST,
  CHILD_ONE_NEED_SUCCESS,
  CHILD_ONE_NEED_FAIL,
  CHILD_ONE_NEED_RECEIPT_REQUEST,
  CHILD_ONE_NEED_RECEIPT_SUCCESS,
  CHILD_ONE_NEED_RECEIPT_FAIL,
  CHILD_BY_TOKEN_REQUEST,
  CHILD_BY_TOKEN_SUCCESS,
  CHILD_BY_TOKEN_FAIL,
} from '../constants/childConstants';

export const fetchRandomChild = () => async (dispatch) => {
  try {
    dispatch({ type: CHILD_RANDOM_SEARCH_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await publicApi3.post('/search/random', config);

    dispatch({
      type: CHILD_RANDOM_SEARCH_SUCCESS,
      payload: data,
    });

    localStorage.setItem('randomChildToken', JSON.stringify(data.token));
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CHILD_RANDOM_SEARCH_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const fetchChildByToken = (token) => async (dispatch) => {
  try {
    dispatch({ type: CHILD_BY_TOKEN_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await publicApi.get(`/child/invitations/${token}`, config);

    dispatch({
      type: CHILD_BY_TOKEN_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CHILD_BY_TOKEN_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const fetchMyChildById = (childId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHILD_BY_ID_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
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
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
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

export const fetchChildOneNeed = (needId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHILD_ONE_NEED_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };
    const { data } = await publicApi.get(`/need/needId=${needId}`, config);

    dispatch({
      type: CHILD_ONE_NEED_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CHILD_ONE_NEED_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const fetchOneNeedReceipts = (needId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CHILD_ONE_NEED_RECEIPT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };
    const { data } = await publicApi.get(`/needs/${needId}/receipts`, config);

    dispatch({
      type: CHILD_ONE_NEED_RECEIPT_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CHILD_ONE_NEED_RECEIPT_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};
