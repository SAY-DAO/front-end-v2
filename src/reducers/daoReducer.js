import {
  DAO_NETWORK_REQUEST,
  DAO_NETWORK_SUCCESS,
  DAO_NETWORK_FAIL,
} from '../constants/daoConstants';

export const familyNetworksReducer = (state = {}, action) => {
  switch (action.type) {
    case DAO_NETWORK_REQUEST:
      return { loading: true, success: false };
    case DAO_NETWORK_SUCCESS:
      return { loading: false, success: true, network: action.payload };
    case DAO_NETWORK_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
