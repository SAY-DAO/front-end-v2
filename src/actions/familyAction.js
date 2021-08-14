import { publicApi } from '../apis/sayBase';
import {
  VIRTUAL_FAMILY_TOKEN_REQUEST,
  VIRTUAL_FAMILY_TOKEN_SUCCESS,
  VIRTUAL_FAMILY_TOKEN_FAIL,
} from '../constants/familyConstants';

// wee get this token to use it for joining a family by calling joinVirtualFamily()
export const virtualFamilyToken =
  (familyId, selectedRole) => async (dispatch) => {
    try {
      dispatch({ type: VIRTUAL_FAMILY_TOKEN_REQUEST });
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
        type: VIRTUAL_FAMILY_TOKEN_SUCCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: VIRTUAL_FAMILY_TOKEN_FAIL,
        payload: e.response && e.response.status ? e.response : e.message,
      });
    }
  };
