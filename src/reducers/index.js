import { combineReducers } from "@reduxjs/toolkit";
import { userStepReducer, userVerifyReducer } from "./userReducer";

export default combineReducers({
	verifyStep : userStepReducer,
	verifyInfo : userVerifyReducer,
});