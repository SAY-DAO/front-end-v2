import {
  JOIN_FAMILY_REQUEST,
  JOIN_FAMILY_SUCCESS,
  JOIN_FAMILY_FAIL,
} from '../constants/familyConstants';

export const joinFamilyReducer = (state = {}, action) => {
  switch (action.type) {
    case JOIN_FAMILY_REQUEST:
      return { loading: true };
    case JOIN_FAMILY_SUCCESS:
      return { loading: false, success: true, theChildToken: action.payload };
    case JOIN_FAMILY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
