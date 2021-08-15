import { publicApi } from '../apis/sayBase';
import {
  INVITE_TO_MY_FAMILY_REQUEST,
  INVITE_TO_MY_FAMILY_SUCCESS,
  INVITE_TO_MY_FAMILY_FAIL,
  JOIN_VIRTUAL_FAMILY_REQUEST,
  JOIN_VIRTUAL_FAMILY_SUCCESS,
  JOIN_VIRTUAL_FAMILY_FAIL,
} from '../constants/familyConstants';

export const inviteToMyFamily =
  (familyId, selectedRole) => async (dispatch) => {
    try {
      dispatch({ type: INVITE_TO_MY_FAMILY_REQUEST });
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const formData = new FormData();
      formData.set('family_id', familyId);
      formData.set('role', selectedRole);

      const { data } = await publicApi.post(`/invitations`, formData, {
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

export const joinVirtualFamily = (invite) => async (dispatch) => {
  try {
    dispatch({ type: INVITE_TO_MY_FAMILY_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const formData = new FormData();
    formData.set('invite', invite);

    const { data } = await publicApi.post(`/family/add`, formData, {
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
