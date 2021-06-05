import sayBase from '../apis/sayBase';
import {
  CHECK_BEFORE_VERIFY_REQUEST,
  CHECK_BEFORE_VERIFY_SUCCESS,
  CHECK_BEFORE_VERIFY_FAIL,
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
} from '../constants/userConstants';

export const changeVerifyStep = (step) => async (dispatch) => {
  dispatch({
    type: CHANGE_VERIFY_STEP,
    payload: step,
  });
};

export const checkContactBeforeVerify =
  (theKey, value, countryCode) => async (dispatch) => {
    console.log(theKey, value, countryCode);

    try {
      dispatch({ type: CHECK_BEFORE_VERIFY_REQUEST });
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      // eslint-disable-next-line no-undef
      const formData = new FormData();
      formData.append(theKey, value); // phone_number, +989121234565

      const { data } = await sayBase.get(
        `/check/${theKey === 'email' ? 'email' : 'phone'}/${value}`,
        formData,
        {
          config,
        }
      );
      dispatch({
        type: CHECK_BEFORE_VERIFY_SUCCESS,
        payload: data,
      });
    } catch (e) {
      // check for generic and custom message to return using ternary statement
      dispatch({
        type: CHECK_BEFORE_VERIFY_FAIL,
        payload: e.response && e.response.status ? e.response : e.message,
      });
    }
  };

export const verifyUser = (theKey, value) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFY_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    // eslint-disable-next-line no-undef
    const formData = new FormData();
    formData.append(theKey, value); // phone_number, +989121234565

    const { data } = await sayBase.post(
      `/auth/verify/${theKey === 'email' ? 'email' : 'phone'}`,
      formData,

      {
        config,
      }
    );
    dispatch({
      type: USER_VERIFY_SUCCESS,
      payload: data,
    });
    // eslint-disable-next-line no-undef
    localStorage.setItem('localVerifyInfo', JSON.stringify(data));
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: USER_VERIFY_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

// export const login = (email, password) => async (dispatch) => {
// 	try {
// 		dispatch({ type: USER_LOGIN_REQUEST });
// 		const config = {
// 			headers: {
// 				"Content-type": "application/json",
// 			},
// 		};
// 		const { data } = await sayBase.post("/api/users/login/", {
// 			username: email,
// 			password,
// 			config,
// 		});
// 		dispatch({
// 			type: USER_LOGIN_SUCCESS,
// 			payload: data,
// 		});
// 		localStorage.setItem("userInfo", JSON.stringify(data));
// 	} catch (e) {
// 		// check for generic and custom message to return using ternary statement
// 		dispatch({
// 			type: USER_LOGIN_FAIL,
// 			payload:
// 			e.response && e.response.data.detail
// 				? e.response.data.detail
// 				: e.message,
// 		});
// 	}
// };

// export const logout = () => (dispatch) => {
// 	localStorage.removeItem("userInfo");
// 	localStorage.removeItem("cartItems");
// 	localStorage.removeItem("shippingAddress");
// 	dispatch({ type: USER_LOGOUT });
// 	dispatch({ type: USER_DETAILS_RESET });
// 	// cleanMyOrders();
// };

// export const register = (firstName, lastName, email, password) => async (
// 	dispatch
// ) => {
// 	try {
// 		dispatch({ type: USER_REGISTER_REQUEST });
// 		const config = {
// 			headers: {
// 				"Content-type": "application/json",
// 			},
// 		};
// 		const { data } = await sayBase.post("/api/users/register/", {
// 			firstName,
// 			lastName,
// 			email,
// 			username: email,
// 			password,
// 			config,
// 		});
// 		dispatch({
// 			type: USER_REGISTER_SUCCESS,
// 			payload: data,
// 		});
// 		localStorage.setItem("userInfo", JSON.stringify(data));

// 		dispatch({
// 			type: USER_LOGIN_SUCCESS,
// 			payload: data,
// 		});
// 	} catch (e) {
// 		// check for generic and custom message to return using ternary statement
// 		dispatch({
// 			type: USER_REGISTER_FAIL,
// 			payload:
// 			e.response && e.response.data.detail
// 				? e.response.data.detail
// 				: e.message,
// 		});
// 	}
// };
