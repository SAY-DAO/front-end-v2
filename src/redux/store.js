/* eslint-disable camelcase */
import { applyMiddleware, compose, legacy_createStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import LogRocket from 'logrocket';
import reducers from './reducers';

const verifyInfo = localStorage.getItem('verifyInfo')
  ? JSON.parse(localStorage.getItem('verifyInfo'))
  : null;

const userInfo = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const cartItemFromStorage = localStorage.getItem('SAY-cartItems')
  ? JSON.parse(localStorage.getItem('SAY-cartItems'))
  : [];

const token = localStorage.getItem('randomChildToken')
  ? JSON.parse(localStorage.getItem('randomChildToken'))
  : [];

const initialState = {
  userVerifyInfo: {
    verifyInfo,
  },
  userLogin: {
    userInfo,
  },
  theCart: {
    cartItems: cartItemFromStorage,
  },
  childByToken: {
    token,
  },
};

// Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = legacy_createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleware), applyMiddleware(LogRocket.reduxMiddleware())),
);

export default store;
