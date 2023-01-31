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
  userUpdateProfileReducer,
} from './userReducer';
import {
  childRandomSearchReducer,
  myChildReducer,
  childNeedsReducer,
  childOneNeedReducer,
  childOneNeedReceiptReducer,
  childByTokenReducer,
} from './childReducer';

import { homeReducer } from './homeReducer';
import { checkCartPaymentReducer, paymentReducer } from './paymentReducder';
import {
  cartAddReducer,
  cartUpdateReducer,
  cartBadgeReducer,
} from './cartReducer';
import {
  joinVirtualFamilyReducer,
  LeaveVirtualFamilyReducer,
  invitationReducer,
  acceptInvitationReducer,
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
  userUpdateProfile: userUpdateProfileReducer,
  childRandomSearch: childRandomSearchReducer,
  childByToken: childByTokenReducer,
  joinResult: joinVirtualFamilyReducer,
  leftFamily: LeaveVirtualFamilyReducer,
  invite: invitationReducer,
  acceptInvite: acceptInvitationReducer,
  myHome: homeReducer,
  myChild: myChildReducer,
  childNeeds: childNeedsReducer,
  ChildOneNeed: childOneNeedReducer,
  ChildOneNeedReceipt: childOneNeedReceiptReducer,
  theCart: cartAddReducer,
  cartBadge: cartBadgeReducer,
  shaparakGate: paymentReducer,
  cartUpdate: cartUpdateReducer,
  cartPayCheck: checkCartPaymentReducer,
});
