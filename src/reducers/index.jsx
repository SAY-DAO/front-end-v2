import { combineReducers } from '@reduxjs/toolkit';
import {
  userStepReducer,
  checkBeforeVerifyReducer,
  userVerifyReducer,
  codeVerifyReducer,
} from './userReducer';

export default combineReducers({
  verifyStep: userStepReducer,
  checkBeforeVerify: checkBeforeVerifyReducer,
  verifyInfo: userVerifyReducer,
  verifyCode: codeVerifyReducer,
});
