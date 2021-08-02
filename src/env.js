import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import LogRocket from 'logrocket';

const history = createBrowserHistory();

const env = process.env.NODE_ENV || 'local';

console.log(process.env);

let envApiUrl = '';

if (env === 'prod') {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_PROD}/api/v2`;
} else if (env === 'stag') {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_STAG}/api/v2`;
} else if (env === 'development') {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_DEV}/api/v2`;
} else {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_LOCAL}/api/v2`;
}

if (env !== 'local') {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    normalizeDepth: 10, // Or however deep you want your state context to be.
    environment: process.env.NODE_ENV,
    integrations: [new Integrations.BrowserTracing()],
    // Can also use reactRouterV3Instrumentation or reactRouterV4Instrumentation
    routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
    tracesSampleRate: 1.0,
  });

  // Sentry.configureScope((scope) => {
  //   scope.setUser({ id: JSON.parse(localStorage.getItem('userInfo')).user.id });
  // });

  if (env === 'prod') {
    LogRocket.init(process.env.REACT_APP_LOG_ROCKET_ID, {
      release: '2.0.0',
      console: {
        isEnabled: {
          log: false,
          debug: false,
        },
      },
      dom: {
        inputSanitizer: true,
      },
      network: {
        requestSanitizer: (request) => {
          // scrub header value from request
          if (request.headers.Authorization) {
            request.headers.Authorization = '';
          }
          return request;
        },
      },
    });
    LogRocket.getSessionURL((sessionURL) => {
      Sentry.configureScope((scope) => {
        scope.setExtra('sessionURL', sessionURL);
      });
    });
  }
}
const apiUrl = envApiUrl;
export default apiUrl;
