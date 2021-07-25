import { combineReducers } from '@reduxjs/toolkit';
import {
  userStepReducer,
  checkContactReducer,
  checkUserNameReducer,
  userVerifyReducer,
  codeVerifyReducer,
  userLoginReducer,
  userRegisterReducer,
} from './userReducer';

export default combineReducers({
  verifyStep: userStepReducer,
  checkContact: checkContactReducer,
  checkUserName: checkUserNameReducer,
  verifyInfo: userVerifyReducer,
  verifyCode: codeVerifyReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});
