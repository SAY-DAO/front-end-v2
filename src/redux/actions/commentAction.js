/* eslint-disable import/prefer-default-export */
import { daoApi } from '../../apis/sayBase';
import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
} from '../constants/daoConstants';

export const createComment =
  (flaskNeedId, needNestId, vRole, message) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_COMMENT_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: userInfo && userInfo.accessToken,
          flaskDappId: userInfo && userInfo.user.id,
        },
      };

      const { data } = await daoApi.post(
        `/comment/create`,
        { flaskNeedId, needNestId, vRole, message },
        config,
      );

      dispatch({
        type: CREATE_COMMENT_SUCCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: CREATE_COMMENT_FAIL,
        payload: e.response && e.response.data ? e.response.data.message : e.message,
      });
    }
  };
