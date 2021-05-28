import { 
	CHANGE_VERIFY_STEP,
	USER_VERIFY_CODE_REQUEST,
	USER_VERIFY_CODE_SUCCESS,
	USER_VERIFY_CODE_FAIL
} from "../constants/userConstants";
  
export const userStepReducer = (state = { step: 1 }, action) => {
	switch (action.type) {
	case CHANGE_VERIFY_STEP:
		return { step: action.payload };
	default:
		return state;
	}
};

export const userVerifyReducer = (state = { verified: {} }, action) => {
	switch (action.type) {
	case USER_VERIFY_CODE_REQUEST:
		return { loading: true };
	case USER_VERIFY_CODE_SUCCESS:
		return { loading: false, verified: action.payload };
	case USER_VERIFY_CODE_FAIL:
		return { loading: false, error: action.payload };
	default:
		return state;
	}
};