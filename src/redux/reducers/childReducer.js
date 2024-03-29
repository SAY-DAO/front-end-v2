import {
  CHILD_RANDOM_SEARCH_REQUEST,
  CHILD_RANDOM_SEARCH_SUCCESS,
  CHILD_RANDOM_SEARCH_FAIL,
  CHILD_RANDOM_SEARCH_RESET,
  CHILD_BY_ID_REQUEST,
  CHILD_BY_ID_SUCCESS,
  CHILD_BY_ID_FAIL,
  CHILD_BY_ID_RESET,
  CHILD_NEEDS_REQUEST,
  CHILD_NEEDS_SUCCESS,
  CHILD_NEEDS_FAIL,
  CHILD_NEEDS_RESET,
  CHILD_ONE_NEED_REQUEST,
  CHILD_ONE_NEED_SUCCESS,
  CHILD_ONE_NEED_FAIL,
  CHILD_ONE_NEED_RESET,
  CHILD_ONE_NEED_RECEIPT_REQUEST,
  CHILD_ONE_NEED_RECEIPT_SUCCESS,
  CHILD_ONE_NEED_RECEIPT_FAIL,
  CHILD_ONE_NEED_RECEIPT_RESET,
  CHILD_BY_TOKEN_REQUEST,
  CHILD_BY_TOKEN_SUCCESS,
  CHILD_BY_TOKEN_FAIL,
  CHILD_BY_TOKEN_RESET,
} from '../constants/childConstants';

export const childRandomSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_RANDOM_SEARCH_REQUEST:
      return { loading: true, success: false };
    case CHILD_RANDOM_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        theToken: action.payload.token,
        theChild: action.payload.child,
      };
    case CHILD_RANDOM_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    case CHILD_RANDOM_SEARCH_RESET:
      return {};
    default:
      return state;
  }
};

export const childByTokenReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_BY_TOKEN_REQUEST:
      return { loading: true, success: false };
    case CHILD_BY_TOKEN_SUCCESS:
      return {
        loading: false,
        success: true,
        token: action.payload.token,
        child: action.payload.child,
      };
    case CHILD_BY_TOKEN_FAIL:
      return { loading: false, error: action.payload };
    case CHILD_BY_TOKEN_RESET:
      return {};
    default:
      return state;
  }
};

export const myChildReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_BY_ID_REQUEST:
      return { loading: true, success: false };
    case CHILD_BY_ID_SUCCESS:
      return { loading: false, success: true, theChild: action.payload };
    case CHILD_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    case CHILD_BY_ID_RESET:
      return {};
    default:
      return state;
  }
};

export const childNeedsReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_NEEDS_REQUEST:
      return { loading: true, success: false };
    case CHILD_NEEDS_SUCCESS:
      return { loading: false, success: true, theNeeds: action.payload };
    case CHILD_NEEDS_FAIL:
      return { loading: false, error: action.payload };
    case CHILD_NEEDS_RESET:
      return {};
    default:
      return state;
  }
};

export const childOneNeedReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_ONE_NEED_REQUEST:
      return { loading: true, success: false };
    case CHILD_ONE_NEED_SUCCESS:
      return { loading: false, success: true, oneNeed: action.payload };
    case CHILD_ONE_NEED_FAIL:
      return { loading: false, error: action.payload };
    case CHILD_ONE_NEED_RESET:
      return {};
    default:
      return state;
  }
};

export const childOneNeedReceiptReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_ONE_NEED_RECEIPT_REQUEST:
      return { loading: true, success: false };
    case CHILD_ONE_NEED_RECEIPT_SUCCESS:
      return { loading: false, success: true, receipt: action.payload };
    case CHILD_ONE_NEED_RECEIPT_FAIL:
      return { loading: false, error: action.payload };
    case CHILD_ONE_NEED_RECEIPT_RESET:
      return {};
    default:
      return state;
  }
};
