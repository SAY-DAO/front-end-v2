import { combineReducers } from '@reduxjs/toolkit';
import {
  userStepReducer,
  checkContactReducer,
  checkUserNameReducer,
  userVerifyReducer,
  codeVerifyReducer,
  userLoginReducer,
  userRegisterReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
} from './userReducer';
import {
  childRandomSearchReducer,
  childSearchResultReducer,
  myChildReducer,
  childNeedsReducer,
  childOneNeedReducer,
} from './childReducer';
import { invitationReducer } from './familyReducer';

import { homeReducer } from './main/homeReducer';
import { paymentReducer } from './paymentReducder';
import { cartAddReducer, cartBadgeReducer } from './cartReducer';

export default combineReducers({
  verifyStep: userStepReducer,
  checkContact: checkContactReducer,
  checkUserName: checkUserNameReducer,
  userVerifyInfo: userVerifyReducer,
  userVerifyCode: codeVerifyReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userForgotPass: userForgotPasswordReducer,
  userResetPass: userResetPasswordReducer,
  childRandomSearch: childRandomSearchReducer,
  childSearchResult: childSearchResultReducer,
  JoinNewFamily: invitationReducer,
  myHome: homeReducer,
  myChild: myChildReducer,
  childNeeds: childNeedsReducer,
  ChildOneNeed: childOneNeedReducer,
  theCart: cartAddReducer,
  cartBadge: cartBadgeReducer,
  payment: paymentReducer,
});
