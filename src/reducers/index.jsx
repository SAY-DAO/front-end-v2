import { combineReducers } from '@reduxjs/toolkit';
import {
  userStepReducer,
  checkBeforeVerifyReducer,
  userVerifyReducer,
} from './userReducer';

export default combineReducers({
  verifyStep: userStepReducer,
  verifyInfo: userVerifyReducer,
  checkBeforeVerify: checkBeforeVerifyReducer,
});
