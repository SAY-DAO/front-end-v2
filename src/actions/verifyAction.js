import { CHANGE_VERIFY_STEP} from "../constants/verifyConstants";

export const changeVerifyStep = (step) => async (dispatch) => {
	dispatch({
		type: CHANGE_VERIFY_STEP,
		payload: step,
	});
};