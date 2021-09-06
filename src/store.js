import { createStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import LogRocket from 'logrocket';
import * as Sentry from '@sentry/react';
import reducers from './reducers';
import {
  USER_LOGIN_REQUEST,
  USER_REGISTER_REQUEST,
} from './constants/userConstants';

const localVerifyInfo = localStorage.getItem('localVerifyInfo')
  ? JSON.parse(localStorage.getItem('localVerifyInfo'))
  : null;

const localUserLogin = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const cartItemFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const initialState = {
  userVerifyInfo: {
    localVerifyInfo,
  },
  userLogin: {
    localUserLogin,
  },
  theCart: {
    cartItems: cartItemFromStorage,
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
