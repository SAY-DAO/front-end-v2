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
  childByTokenReducer,
} from './childReducer';

import homeReducer from './homeReducer';
import { checkCartPaymentReducer, paymentReducer } from './paymentReducder';
import {
  cartAddReducer,
  cartUpdateReducer,
  cartBadgeReducer,
} from './cartReducer';
import {
  invitationReducer,
  joinVirtualFamilyReducer,
  LeaveVirtualFamilyReducer,
} from './familyReducer';
import {
  familyNetworksReducer,
  signatureReducer,
  walletReducer,
} from './blockchainReducer';
import allNeedsReducer from './needReducer';
import themeReducer from './themeReducer';

export default combineReducers({
  themeOptions: themeReducer,
  wallet: walletReducer,
  familyNetwork: familyNetworksReducer,
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
  childByToken: childByTokenReducer,
  joinResult: joinVirtualFamilyReducer,
  leftFamily: LeaveVirtualFamilyReducer,
  invite: invitationReducer,
  myHome: homeReducer,
  myChild: myChildReducer,
  allNeeds: allNeedsReducer,
  childNeeds: childNeedsReducer,
  childOneNeed: childOneNeedReducer,
  childOneNeedReceipt: childOneNeedReceiptReducer,
  theCart: cartAddReducer,
  cartBadge: cartBadgeReducer,
  shaparakGate: paymentReducer,
  cartUpdate: cartUpdateReducer,
  cartPayCheck: checkCartPaymentReducer,
  signature: signatureReducer,
});
