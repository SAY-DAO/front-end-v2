import {
  VIRTUAL_FAMILY_TOKEN_REQUEST,
  VIRTUAL_FAMILY_TOKEN_SUCCESS,
  VIRTUAL_FAMILY_TOKEN_FAIL,
} from '../constants/familyConstants';

export const joinFamilyReducer = (state = {}, action) => {
  switch (action.type) {
    case VIRTUAL_FAMILY_TOKEN_REQUEST:
      return { loading: true };
    case VIRTUAL_FAMILY_TOKEN_SUCCESS:
      return { loading: false, success: true, theChildToken: action.payload };
    case VIRTUAL_FAMILY_TOKEN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
