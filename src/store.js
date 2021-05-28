import { createStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "./reducers";



const initialState = {
    
};

// Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(
	reducers,
	initialState,
	composeEnhancers(applyMiddleware(...middleware))
);

export default store;