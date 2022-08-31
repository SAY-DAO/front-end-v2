import {
  ALL_NEEDS_FAIL,
  ALL_NEEDS_REQUEST,
  ALL_NEEDS_RESET,
  ALL_NEEDS_SUCCESS,
} from '../constants/needConstants';

export const allNeedsReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_NEEDS_REQUEST:
      return { loading: true, success: false };
    case ALL_NEEDS_SUCCESS:
      return { loading: false, success: true, theNeeds: action.payload };
    case ALL_NEEDS_FAIL:
      return { loading: false, error: action.payload };
    case ALL_NEEDS_RESET:
      return {};
    default:
      return state;
  }
};
