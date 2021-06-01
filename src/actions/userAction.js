import sayBase from "../apis/sayBase";
import { contents } from "../inputsValidation/Contents";
import {
	CHECK_BEFORE_VERIFY_REQUEST,
	CHECK_BEFORE_VERIFY_SUCCESS,
	CHECK_BEFORE_VERIFY_FAIL,
	CHANGE_VERIFY_STEP,
	USER_VERIFY_REQUEST,
	USER_VERIFY_SUCCESS,
	USER_VERIFY_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGOUT,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAIL,
	// USER_DETAILS_SUCCESS,
	// USER_DETAILS_FAIL,
	// USER_DETAILS_REQUEST,
	USER_DETAILS_RESET,
	// USER_UPDATE_PROFILE_REQUEST,
	// USER_UPDATE_PROFILE_SUCCESS,
	// USER_UPDATE_PROFILE_FAIL,
} from "../constants/userConstants";

export const changeVerifyStep = (step) => async (dispatch) => {
	dispatch({
		type: CHANGE_VERIFY_STEP,
		payload: step,
	});
};

export const checkBeforeVerify = (t, methodType, value) => async (
	dispatch
) => {
	const formData = new FormData();
	formData.append(methodType, value); // phone_number, +989121234565 or email, abc@bmail.com
	try {
		if (methodType === "email") {
			if (value.indexOf("@") < 0 || value.indexOf(".") < 0 ) {
				return {errorMessage: await t(contents.wrongEmail)};
			} 
		}
		if (methodType === "phone_number") {
			if (value.length < 16) {
				return { errorMessage: t(contents.wrongPhone)};
			}
		}
		dispatch({ type: CHECK_BEFORE_VERIFY_REQUEST });
		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};
		const { data } = await sayBase.post(`/auth/check/${methodType === "email" ? "email" : "phone"}/${value}`, formData, {
			config
		});
		dispatch({
			type: CHECK_BEFORE_VERIFY_SUCCESS,
			payload: data,
		});
	} catch (e) {
		// check for generic and custom message to return using ternary statement
		dispatch({
			type: CHECK_BEFORE_VERIFY_FAIL,
			payload:
			e.response && e.response.data.detail
				? e.response.data.detail
				: e.message,
		});
	}
};


export const verifyUser = (methodType, value) => async (
	dispatch
) => {
	const formData = new FormData();	
	formData.append(methodType, value); // phone_number, +989121234565
	try {
		dispatch({ type: USER_VERIFY_REQUEST });
		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};
		const { data } = await sayBase.post(`/auth/verify/${methodType === "email" ? "email" : "phone"}`, formData, {
			config,
		});
		dispatch({
			type: USER_VERIFY_SUCCESS,
			payload: data,
		});
	} catch (e) {
		// check for generic and custom message to return using ternary statement
		dispatch({
			type: USER_VERIFY_FAIL,
			payload:
			e.response && e.response.data.detail
				? e.response.data.detail
				: e.message,
		});
	}
};

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: USER_LOGIN_REQUEST });
		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};
		const { data } = await sayBase.post("/api/users/login/", {
			username: email,
			password,
			config,
		});
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});
		localStorage.setItem("userInfo", JSON.stringify(data));
	} catch (e) {
		// check for generic and custom message to return using ternary statement
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
			e.response && e.response.data.detail
				? e.response.data.detail
				: e.message,
		});
	}
};
  
export const logout = () => (dispatch) => {
	localStorage.removeItem("userInfo");
	localStorage.removeItem("cartItems");
	localStorage.removeItem("shippingAddress");
	dispatch({ type: USER_LOGOUT });
	dispatch({ type: USER_DETAILS_RESET });
	// cleanMyOrders();
};
  
export const register = (firstName, lastName, email, password) => async (
	dispatch
) => {
	try {
		dispatch({ type: USER_REGISTER_REQUEST });
		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};
		const { data } = await sayBase.post("/api/users/register/", {
			firstName,
			lastName,
			email,
			username: email,
			password,
			config,
		});
		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});
		localStorage.setItem("userInfo", JSON.stringify(data));

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});
	} catch (e) {
		// check for generic and custom message to return using ternary statement
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
			e.response && e.response.data.detail
				? e.response.data.detail
				: e.message,
		});
	}
};
