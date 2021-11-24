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
  userDetailsReducer,
} from './userReducer';
import {
  childRandomSearchReducer,
  myChildReducer,
  childNeedsReducer,
  childOneNeedReducer,
  childOneNeedReceiptReducer,
} from './childReducer';

import { homeReducer } from './homeReducer';
import { checkCartPaymentReducer, paymentReducer } from './paymentReducder';
import {
  cartAddReducer,
  cartCheckReducer,
  cartBadgeReducer,
} from './cartReducer';
import {
  joinVirtualFamilyReducer,
  LeaveVirtualFamilyReducer,
} from './familyReducer';

export default combineReducers({
  verifyStep: userStepReducer,
  checkContact: checkContactReducer,
  checkUserName: checkUserNameReducer,
  userVerifyInfo: userVerifyReducer,
  userVerifyCode: codeVerifyReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userForgotPass: userForgotPasswordReducer,
  userResetPass: userResetPasswordReducer,
  childRandomSearch: childRandomSearchReducer,
  // JoinNewFamily: invitationReducer,
  joinResult: joinVirtualFamilyReducer,
  leftFamily: LeaveVirtualFamilyReducer,
  myHome: homeReducer,
  myChild: myChildReducer,
  childNeeds: childNeedsReducer,
  ChildOneNeed: childOneNeedReducer,
  ChildOneNeedReceipt: childOneNeedReceiptReducer,
  theCart: cartAddReducer,
  cartBadge: cartBadgeReducer,
  shaparakGate: paymentReducer,
  cartCheck: cartCheckReducer,
  cartPayComplete: checkCartPaymentReducer,
});
