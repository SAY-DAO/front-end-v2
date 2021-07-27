import {
  CHILD_RANDOM_SEARCH_REQUEST,
  CHILD_RANDOM_SEARCH_SUCCESS,
  CHILD_RANDOM_SEARCH_FAIL,
  CHILD_SEARCH_RESULT_REQUEST,
  CHILD_SEARCH_RESULT_SUCCESS,
  CHILD_SEARCH_RESULT_FAIL,
} from '../constants/childConstants';

export const childRandomSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_RANDOM_SEARCH_REQUEST:
      return { loading: true };
    case CHILD_RANDOM_SEARCH_SUCCESS:
      return { loading: false, success: true, theChildToken: action.payload };
    case CHILD_RANDOM_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const childSearchResultReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_SEARCH_RESULT_REQUEST:
      return { loading: true };
    case CHILD_SEARCH_RESULT_SUCCESS:
      return { loading: false, success: true, theChild: action.payload };
    case CHILD_SEARCH_RESULT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
