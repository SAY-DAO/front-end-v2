import axios from "axios";
import { 
	CHANGE_VERIFY_STEP,
	USER_VERIFY_CODE_REQUEST,
	USER_VERIFY_CODE_SUCCESS,
	USER_VERIFY_CODE_FAIL
} from "../constants/userConstants";

export const changeVerifyStep = (step) => async (dispatch) => {
	dispatch({
		type: CHANGE_VERIFY_STEP,
		payload: step,
	});
};

export const requestVerifyCode = () => async (
	dispatch
) => {
	try {
		dispatch({ type: USER_VERIFY_CODE_REQUEST });
		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};
		const { data } = await axios.post("/auth/verify/", {
			// values,
			config,
		});
		dispatch({
			type: USER_VERIFY_CODE_SUCCESS,
			payload: data,
		});
	} catch (e) {
		// check for generic and custom message to return using ternary statement
		dispatch({
			type: USER_VERIFY_CODE_FAIL,
			payload:
			e.response && e.response.data.detail
				? e.response.data.detail
				: e.message,
		});
	}
};