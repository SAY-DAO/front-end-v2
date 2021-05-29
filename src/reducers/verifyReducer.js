import {
	CHANGE_VERIFY_STEP,
	USER_VERIFY_REQUEST,
	USER_VERIFY_SUCCESS,
	USER_VERIFY_FAIL,
	// USER_LOGIN_REQUEST,
	// USER_LOGIN_SUCCESS,
	// USER_LOGIN_FAIL,
	// USER_LOGOUT,
	// USER_REGISTER_REQUEST,
	// USER_REGISTER_SUCCESS,
	// USER_REGISTER_FAIL,
	// USER_DETAILS_SUCCESS,
	// USER_DETAILS_FAIL,
	// USER_DETAILS_REQUEST,
	// USER_DETAILS_RESET,
	// USER_UPDATE_PROFILE_REQUEST,
	// USER_UPDATE_PROFILE_SUCCESS,
	// USER_UPDATE_PROFILE_FAIL,
} from "../constants/userConstants";
  
export const verifyStepReducer = (state = { step: 1 }, action) => {
	switch (action.type) {
	case CHANGE_VERIFY_STEP:
		return { step: action.payload };
	default:
		return state;
	}
};

export const verifyUserByReducer = (state = { verifiedEmail:{}, verifiedPhone:{}}, action) => {
	switch (action.type) {
	case USER_VERIFY_REQUEST:
		return { loading: true };
	case USER_VERIFY_SUCCESS:
		return { loading: false, verifiedEmail: action.payload,};
	case USER_VERIFY_FAIL:
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};