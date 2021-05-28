import { combineReducers } from "@reduxjs/toolkit";
import { verifyStepReducer } from "./verifyReducer";

export default combineReducers({
	verification : verifyStepReducer
});