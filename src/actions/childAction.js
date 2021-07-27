import sayBase from '../apis/sayBase';
import {
  CHILD_RANDOM_SEARCH_REQUEST,
  CHILD_RANDOM_SEARCH_SUCCESS,
  CHILD_RANDOM_SEARCH_FAIL,
  CHILD_SEARCH_RESULT_REQUEST,
  CHILD_SEARCH_RESULT_SUCCESS,
  CHILD_SEARCH_RESULT_FAIL,
} from '../constants/childConstants';

export const fetchRandomChild = () => async (dispatch) => {
  try {
    dispatch({ type: CHILD_RANDOM_SEARCH_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await sayBase.post('/search/random', {
      config,
    });

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

export const fetchChildResult = (invitationToken) => async (dispatch) => {
  try {
    dispatch({ type: CHILD_SEARCH_RESULT_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await sayBase.get(
      `/child/invitations/${invitationToken}`,
      {
        config,
      }
    );

    dispatch({
      type: CHILD_SEARCH_RESULT_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CHILD_SEARCH_RESULT_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};
