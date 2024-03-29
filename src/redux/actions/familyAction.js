import { publicApi, publicApi3 } from '../../apis/sayBase';
import {
  INVITE_TO_MY_FAMILY_REQUEST,
  INVITE_TO_MY_FAMILY_SUCCESS,
  INVITE_TO_MY_FAMILY_FAIL,
  JOIN_VIRTUAL_FAMILY_REQUEST,
  JOIN_VIRTUAL_FAMILY_SUCCESS,
  JOIN_VIRTUAL_FAMILY_FAIL,
  LEAVE_VIRTUAL_FAMILY_REQUEST,
  LEAVE_VIRTUAL_FAMILY_SUCCESS,
  LEAVE_VIRTUAL_FAMILY_FAIL,
  ACCEPT_INVITATION_REQUEST,
  ACCEPT_INVITATION_SUCCESS,
  ACCEPT_INVITATION_FAIL,
  FAMILY_NETWORK_REQUEST,
  FAMILY_NETWORK_SUCCESS,
  FAMILY_NETWORK_FAIL,
} from '../constants/familyConstants';

export const joinVirtualFamily = (role, familyId) => async (dispatch, getState) => {
  try {
    dispatch({ type: JOIN_VIRTUAL_FAMILY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: userInfo && userInfo.accessToken,
      },
    };

    const formData = new FormData();
    formData.append('role', role);
    const { data } = await publicApi3.post(`families/${familyId}/join`, formData, config);
    dispatch({
      type: JOIN_VIRTUAL_FAMILY_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: JOIN_VIRTUAL_FAMILY_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const leaveFamily = (familyId) => async (dispatch, getState) => {
  try {
    dispatch({ type: LEAVE_VIRTUAL_FAMILY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };

    const { data } = await publicApi.patch(`family/${familyId}/leave`, {}, config);
    dispatch({
      type: LEAVE_VIRTUAL_FAMILY_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: LEAVE_VIRTUAL_FAMILY_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const inviteToMyFamily = (familyId, selectedRole) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVITE_TO_MY_FAMILY_REQUEST });

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
    formData.append('familyId', familyId);
    formData.append('role', selectedRole);

    const { data } = await publicApi.post(`/invitations/`, formData, {
      config,
    });
    dispatch({
      type: INVITE_TO_MY_FAMILY_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: INVITE_TO_MY_FAMILY_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const acceptInvitation = (token) => async (dispatch, getState) => {
  try {
    dispatch({ type: ACCEPT_INVITATION_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };

    const { data } = await publicApi3.post(`invitations/${token}/accept`, {}, config);
    dispatch({
      type: ACCEPT_INVITATION_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: ACCEPT_INVITATION_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};

export const fetchFamilyNetworks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FAMILY_NETWORK_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: userInfo && userInfo.accessToken,
      },
    };
    const { data } = await publicApi.get(`/public/children`, config);

    dispatch({
      type: FAMILY_NETWORK_SUCCESS,
      payload: data,
    });
  } catch (e) {
    // check for generic and custom message to return using ternary statement
    dispatch({
      type: FAMILY_NETWORK_FAIL,
      payload: e.response && (e.response.status ? e.response : e.response.data.message),
    });
  }
};
