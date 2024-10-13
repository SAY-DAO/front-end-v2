import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import LogRocket from 'logrocket';
import * as Sentry from '@sentry/react';
import reducers from './redux/reducers';
import {
  USER_LOGIN_REQUEST,
  USER_REGISTER_REQUEST,
} from './redux/constants/main/userConstants';

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

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  actionTransformer: (action) => {
    if (action.type === USER_LOGIN_REQUEST) {
      // Return null to not log the action to Sentry
      return null;
    }
    if (action.type === USER_REGISTER_REQUEST) {
      // Return a transformed action to remove sensitive information
      return {
        ...action,
        password: null,
      };
    }

    return action;
  },
});

// Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware),
    sentryReduxEnhancer,
    applyMiddleware(LogRocket.reduxMiddleware())
  )
);

export default store;
