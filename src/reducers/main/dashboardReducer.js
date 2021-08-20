import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
} from '../../constants/main/dashboardConstants';

export const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_REQUEST:
      return { loading: true };
    case DASHBOARD_SUCCESS:
      return {
        loading: false,
        success: true,
        children: action.payload.children,
        user: action.payload.user,
      };
    case DASHBOARD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
