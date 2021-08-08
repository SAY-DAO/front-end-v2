import { publicApi } from '../apis/sayBase';
import {
  JOIN_FAMILY_REQUEST,
  JOIN_FAMILY_SUCCESS,
  JOIN_FAMILY_FAIL,
} from '../constants/familyConstants';

export const joinMyFamily = (invitationToken) => async (dispatch) => {
  try {
    dispatch({ type: JOIN_FAMILY_REQUEST });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const formData = new FormData();
    formData.set('invitationToken', invitationToken);

    const { data } = await publicApi.post(`/family/add`, formData, {
      config,
    });
    dispatch({
      type: JOIN_FAMILY_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: JOIN_FAMILY_FAIL,
      payload: e.response && e.response.status ? e.response : e.message,
    });
  }
};
