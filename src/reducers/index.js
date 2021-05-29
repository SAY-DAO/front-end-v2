import { combineReducers } from "@reduxjs/toolkit";
import { userStepReducer, userVerifyReducer } from "./userReducer";
import { verifyUserByReducer } from "./verifyReducer";

export default combineReducers({
	verifyStep : userStepReducer,
	verifyInfo : userVerifyReducer,
	verifiedInfo : verifyUserByReducer
});