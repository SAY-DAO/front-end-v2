import LogRocket from 'logrocket';
import { publicApi } from '../apis/sayBase';
import { CART_ADD_RESET } from '../constants/main/cartConstants';
import { HOME_RESET } from '../constants/main/homeConstants';
import {
  CHECK_CONTACT_REQUEST,
  CHECK_CONTACT_SUCCESS,
  CHECK_CONTACT_FAIL,
  CHECK_USERNAME_REQUEST,
  CHECK_USERNAME_SUCCESS,
  CHECK_USERNAME_FAIL,
  CHANGE_VERIFY_STEP,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
  CODE_VERIFY_REQUEST,
  CODE_VERIFY_SUCCESS,
  CODE_VERIFY_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_FORGOT_PASSWORD_REQUEST,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_FORGOT_PASSWORD_FAIL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD_FAIL,
  USER_LOGOUT,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from '../constants/main/userConstants';
import { standalone } from '../standalone';

const _standalone = standalone() ? 1 : 0;

export const changeVerifyStep = (step) => async (dispatch) => {
  dispatch({
    type: CHANGE_VERIFY_STEP,
    payload: step,
  });
};

export const checkContactBeforeVerify = (theKey, value) => async (dispatch) => {
  try {
    dispatch({ type: CHECK_CONTACT_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const formData = new FormData();
    formData.append(theKey, value); // phone_number, +989121234565

    const { data } = await publicApi.get(
      `/check/${theKey === 'email' ? 'email' : 'phone'}/${value}`,
      formData,
      config
    );
    dispatch({
      type: CHECK_CONTACT_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CHECK_CONTACT_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const checkUserNameBeforeVerify = (userName) => async (dispatch) => {
  try {
    dispatch({ type: CHECK_USERNAME_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await publicApi.get(`/check/username/${userName}`, config);

    dispatch({
      type: CHECK_USERNAME_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CHECK_USERNAME_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

// verify user by otp - theKey:email, value:akbar@gmail.com
export const verifyUser = (theKey, value, dialCode) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFY_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const formData = new FormData();
    formData.append(theKey, value); // phone_number, +989121234565

    const { data } = await publicApi.post(
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
    localStorage.setItem('verifyInfo', JSON.stringify(data));
    localStorage.setItem('localDialCode', JSON.stringify(dialCode));
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: USER_VERIFY_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

// verify the code
export const userVerifyCode = (id, code) => async (dispatch) => {
  try {
    dispatch({ type: CODE_VERIFY_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const formData = new FormData();
    formData.append('code', code);

    const { data } = await publicApi.patch(
      `/auth/verify/${id}`,
      formData,
      config
    );
    dispatch({
      type: CODE_VERIFY_SUCCESS,
      payload: data,
    });
    localStorage.setItem('localOTP', code);
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: CODE_VERIFY_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const register =
  (userName, password, theKey, value, dialCode, otp) => async (dispatch) => {
    try {
      const formData = new FormData();
      formData.set('username', userName);
      formData.set('password', password);
      formData.set('verifyCode', otp);

      if (theKey === 'email') {
        formData.set('email', value);
      }
      if (theKey === 'phone') {
        formData.set('phone_number', value);
        formData.set('countryCode', dialCode);
      }
      formData.set('isInstalled', _standalone);

      dispatch({ type: USER_REGISTER_REQUEST });
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await publicApi.post('/auth/register', formData, {
        config,
      });
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
      localStorage.setItem('userInfo', JSON.stringify(data));

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.removeItem('verifyInfo');
    } catch (e) {
      // check for generic and custom message to return using ternary statement
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: e.response && e.response.status ? e.response : e.message,
      });
    }
  };

export const login = (userName, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const formData = new FormData();
    formData.set('username', userName);
    formData.set('password', password);
    // required for back-end
    formData.set('isInstalled', _standalone);

    const { data } = await publicApi.post('/auth/login', formData, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));

    // LogRocket
    LogRocket.identify(data.user.id, {
      username: data.user.userName,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  console.log('localStorage');
  dispatch({ type: CART_ADD_RESET });
  dispatch({ type: HOME_RESET });
  dispatch({ type: USER_LOGOUT });
  localStorage.clear();
};

export const forgotPassword = (theKey, value) => async (dispatch) => {
  let resetType;
  try {
    dispatch({ type: USER_FORGOT_PASSWORD_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const formData = new FormData();
    if (theKey === 'email') {
      formData.set('email', value);
      resetType = 'email';
    }
    if (theKey === 'phone_number') {
      // To be consistent with back-end this line phone_number is phoneNumber
      formData.set('phoneNumber', value);
      resetType = 'phone';
    }

    const { data } = await publicApi.post(
      `/auth/password/reset/${resetType}`,
      formData,
      config
    );
    dispatch({
      type: USER_FORGOT_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: USER_FORGOT_PASSWORD_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const fetchUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };

    const { data } = await publicApi.get(`user/userId=me`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        e.response && e.response.data.detail
          ? e.response.data.detail
          : e.message,
    });
  }
};

export const resetPassword = (password) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_RESET_PASSWORD_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };

    const formData = new FormData();
    formData.set('password', password);

    const { data } = await publicApi.patch(
      `/user/update/userId=me`,
      formData,
      config
    );
    dispatch({
      type: USER_RESET_PASSWORD_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: USER_RESET_PASSWORD_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const userEditProfile =
  (
    phoneAuth,
    emailAuth,
    avatarUrl,
    firstName,
    lastName,
    phoneNumber,
    email,
    userName
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: userInfo && userInfo.accessToken,
        },
      };

      const formData = new FormData();
      if (userInfo.user.avatarUrl !== avatarUrl) {
        formData.append('avatarUrl', avatarUrl);
      }
      if (userInfo.user.firstName !== firstName) {
        formData.append('firstName', firstName);
      }
      if (userInfo.user.lastName !== lastName) {
        formData.append('lastName', lastName);
      }
      if (phoneAuth && userInfo.user.phoneNumber !== phoneNumber) {
        formData.append('phoneNumber', phoneNumber);
      }
      if (emailAuth && userInfo.user.emailAddress !== email) {
        formData.append('email', email);
      }
      if (userInfo.user.userName !== userName) {
        formData.append('userName', userName);
      }
      const { data } = await publicApi.patch(
        `/user/update/userId=me`,
        formData,
        config
      );

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: e.response && e.response.status ? e.response : e.message,
      });
    }
  };
