import {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_FAIL,
  HOME_RESET,
} from '../../constants/main/homeConstants';

export const homeReducer = (state = {}, action) => {
  switch (action.type) {
    case HOME_REQUEST:
      return { loading: true };
    case HOME_SUCCESS:
      return {
        loading: false,
        success: true,
        children: action.payload.children,
        user: action.payload.user,
      };
    case HOME_FAIL:
      return { loading: false, error: action.payload };
    case HOME_RESET:
      return {};
    default:
      return state;
  }
};
