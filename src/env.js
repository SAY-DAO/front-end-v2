/* eslint-disable no-unused-vars */
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';
import { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
  useRoutes,
} from 'react-router-dom';

const env = process.env.REACT_APP_NODE_ENV || 'development';

let envApiUrl = '';
let envApiUrl3 = '';
let envApiDao = '';

if (env === 'production') {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_PROD}/api/v2`;
  envApiUrl3 = `https://${process.env.REACT_APP_DOMAIN_PROD}/api/v3`;
  envApiDao = `https://${process.env.REACT_APP_DAO_PROD}/api/dao`;
} else if (env === 'staging') {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_STAGING}/api/v2`;
  envApiUrl3 = `https://${process.env.REACT_APP_DOMAIN_STAGING}/api/v3`;
  envApiDao = `https://${process.env.REACT_APP_DAO_STAGING}/api/dao`;
} else if (env === 'development') {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_DEV}/api/v2`;
  envApiUrl3 = `https://${process.env.REACT_APP_DOMAIN_DEV}/api/v3`;
  envApiDao = `http://${process.env.REACT_APP_DAO_LOCAL}/api/dao`;
} else {
  envApiUrl = `http://${process.env.REACT_APP_DOMAIN_LOCAL}/api/v2`;
  envApiUrl3 = `http://${process.env.REACT_APP_DOMAIN_LOCAL}/api/v3`;
}

if (env === 'production') {
  console.log('initiating Sentry ...');
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing({
        // See docs for support of different versions of variation of react router
        // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        ),
        tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
      }),
      new Sentry.Replay(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    tracesSampleRate: 1.0,

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });

  const useSentryRoutes = Sentry.wrapUseRoutes(useRoutes);

  console.log('Sentry initiated.');

  console.log('initiating Log Rocket ...');

  const theUser = localStorage.getItem('userInfo');
  LogRocket.init(process.env.REACT_APP_LOG_ROCKET_ID, {
    network: {
      requestSanitizer: (request) => {
        if (request.headers.Authorization) {
          request.headers.Authorization = '';
        }
        // if the url contains 'ignore'
        if (request.url.toLowerCase().indexOf('ignore') !== -1) {
          // ignore the request response pair
          return null;
        }

        // otherwise log the request normally
        return request;
      },
    },
  });

  LogRocket.identify(theUser && JSON.parse(theUser).user.id, {
    name: theUser && `${JSON.parse(theUser).user.firstName} ${JSON.parse(theUser).user.lastName}`,
    subscriptionType: 'Virtual Family',
  });

  setupLogRocketReact(LogRocket);
  console.log('Log Rocket initiated.');
}

const apiUrl = envApiUrl;
const apiUrl3 = envApiUrl3;
const apiDao = envApiDao;
export { apiUrl, apiUrl3, apiDao };
