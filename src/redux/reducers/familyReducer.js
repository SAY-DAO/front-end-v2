import {
  INVITE_TO_MY_FAMILY_REQUEST,
  INVITE_TO_MY_FAMILY_SUCCESS,
  INVITE_TO_MY_FAMILY_FAIL,
  JOIN_VIRTUAL_FAMILY_REQUEST,
  JOIN_VIRTUAL_FAMILY_SUCCESS,
  JOIN_VIRTUAL_FAMILY_FAIL,
  LEAVE_VIRTUAL_FAMILY_FAIL,
  LEAVE_VIRTUAL_FAMILY_SUCCESS,
  LEAVE_VIRTUAL_FAMILY_REQUEST,
  LEAVE_VIRTUAL_FAMILY_RESET,
  JOIN_VIRTUAL_FAMILY_RESET,
  ACCEPT_INVITATION_REQUEST,
  ACCEPT_INVITATION_SUCCESS,
  ACCEPT_INVITATION_FAIL,
  ACCEPT_INVITATION_RESET,
  FAMILY_NETWORK_REQUEST,
  FAMILY_NETWORK_SUCCESS,
  FAMILY_NETWORK_FAIL,
  FAMILY_NETWORK_RESET,
} from '../constants/familyConstants';

export const joinVirtualFamilyReducer = (state = {}, action) => {
  switch (action.type) {
    case JOIN_VIRTUAL_FAMILY_REQUEST:
      return { loading: true, success: false };
    case JOIN_VIRTUAL_FAMILY_SUCCESS:
      return { loading: false, success: true, newFamily: action.payload };
    case JOIN_VIRTUAL_FAMILY_FAIL:
      return { loading: false, error: action.payload };
    case JOIN_VIRTUAL_FAMILY_RESET:
      return {};
    default:
      return state;
  }
};

export const LeaveVirtualFamilyReducer = (state = {}, action) => {
  switch (action.type) {
    case LEAVE_VIRTUAL_FAMILY_REQUEST:
      return { loading: true, success: false };
    case LEAVE_VIRTUAL_FAMILY_SUCCESS:
      return { loading: false, success: true, leftFamily: action.payload };
    case LEAVE_VIRTUAL_FAMILY_FAIL:
      return { loading: false, error: action.payload };
    case LEAVE_VIRTUAL_FAMILY_RESET:
      return {};
    default:
      return state;
  }
};

export const invitationReducer = (state = {}, action) => {
  switch (action.type) {
    case INVITE_TO_MY_FAMILY_REQUEST:
      return { loading: true, success: false };
    case INVITE_TO_MY_FAMILY_SUCCESS:
      return { loading: false, success: true, theInvite: action.payload };
    case INVITE_TO_MY_FAMILY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const acceptInvitationReducer = (state = {}, action) => {
  switch (action.type) {
    case ACCEPT_INVITATION_REQUEST:
      return { loading: true, success: false };
    case ACCEPT_INVITATION_SUCCESS:
      return { loading: false, success: true };
    case ACCEPT_INVITATION_FAIL:
      return { loading: false, error: action.payload };
    case ACCEPT_INVITATION_RESET:
      return {};
    default:
      return state;
  }
};

export const familyNetworksReducer = (state = {}, action) => {
  switch (action.type) {
    case FAMILY_NETWORK_REQUEST:
      return { loading: true, success: false };
    case FAMILY_NETWORK_SUCCESS:
      return { loading: false, success: true, network: action.payload };
    case FAMILY_NETWORK_FAIL:
      return { loading: false, error: action.payload };
    case FAMILY_NETWORK_RESET:
      return {};
    default:
      return state;
  }
};
