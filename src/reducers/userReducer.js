import { 
	CHANGE_VERIFY_STEP,
	USER_VERIFY_REQUEST,
	USER_VERIFY_SUCCESS,
	USER_VERIFY_FAIL,
	USER_VERIFY_RESET,
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
  
export const userStepReducer = (state = { step: "EnteryForm" }, action) => {
	switch (action.type) {
	case CHANGE_VERIFY_STEP:
		return { step: action.payload };
	default:
		return state;
	}
};

export const userVerifyReducer = (state = { verifyData: {} }, action) => {
	switch (action.type) {
	case USER_VERIFY_REQUEST:
		return { loading: true, ...state };
	case USER_VERIFY_SUCCESS:
		return { loading: false, success: true, verifyData: action.payload};
	case USER_VERIFY_FAIL:
		return { loading: false, error: action.payload };
	case USER_VERIFY_RESET:
		return {};
	default:
		return state;
	}
};
