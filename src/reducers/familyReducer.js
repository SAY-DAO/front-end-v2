import {
  INVITE_TO_MY_FAMILY_REQUEST,
  INVITE_TO_MY_FAMILY_SUCCESS,
  INVITE_TO_MY_FAMILY_FAIL,
} from '../constants/familyConstants';

export const invitationReducer = (state = {}, action) => {
  switch (action.type) {
    case INVITE_TO_MY_FAMILY_REQUEST:
      return { loading: true };
    case INVITE_TO_MY_FAMILY_SUCCESS:
      return { loading: false, success: true, theInvite: action.payload };
    case INVITE_TO_MY_FAMILY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const joinFamilyReducer = (state = {}, action) => {
  switch (action.type) {
    case INVITE_TO_MY_FAMILY_REQUEST:
      return { loading: true };
    case INVITE_TO_MY_FAMILY_SUCCESS:
      return { loading: false, success: true, theInvite: action.payload };
    case INVITE_TO_MY_FAMILY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
