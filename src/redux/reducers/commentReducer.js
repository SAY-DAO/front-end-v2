/* eslint-disable import/prefer-default-export */
import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_RESET,
} from '../constants/daoConstants';

export const commentReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return { loading: true, success: false };
    case CREATE_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
        created: action.payload,
      };
    case CREATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_COMMENT_RESET:
      return {};
    default:
      return state;
  }
};
