import { publicApi3 } from '../apis/sayBase';
import {
  //   INVITE_TO_MY_FAMILY_REQUEST,
  //   INVITE_TO_MY_FAMILY_SUCCESS,
  //   INVITE_TO_MY_FAMILY_FAIL,
  JOIN_VIRTUAL_FAMILY_REQUEST,
  JOIN_VIRTUAL_FAMILY_SUCCESS,
  JOIN_VIRTUAL_FAMILY_FAIL,
} from '../constants/familyConstants';

export const joinVirtualFamily =
  (role, familyId) => async (dispatch, getState) => {
    console.log(role, familyId);
    try {
      dispatch({ type: JOIN_VIRTUAL_FAMILY_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: userInfo && userInfo.accessToken,
        },
      };

      const formData = new FormData();
      formData.set('family_id', familyId);
      formData.set('role', role);
      console.log(formData, config);
      const { data } = await publicApi3.post(
        `families/${familyId}/join`,
        formData,
        config
      );
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

// export const inviteToMyFamily =
//   (familyId, selectedRole) => async (dispatch) => {
//     try {
//       dispatch({ type: INVITE_TO_MY_FAMILY_REQUEST });
//       const config = {
//         headers: {
//           'Content-type': 'application/json',
//         },
//       };

//       const formData = new FormData();
//       formData.set('family_id', familyId);
//       formData.set('role', selectedRole);

//       const { data } = await publicApi.post(`/invitations`, formData, {
//         config,
//       });
//       dispatch({
//         type: INVITE_TO_MY_FAMILY_SUCCESS,
//         payload: data,
//       });
//     } catch (e) {
//       dispatch({
//         type: INVITE_TO_MY_FAMILY_FAIL,
//         payload: e.response && e.response.status ? e.response : e.message,
//       });
//     }
//   };
