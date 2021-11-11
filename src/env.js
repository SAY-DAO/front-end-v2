import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import LogRocket from 'logrocket';

const history = createBrowserHistory();

const env = process.env.REACT_APP_NODE_ENV || 'local';

const envApiUrl = `https://${process.env.REACT_APP_API_URL}/api/v2`;
const envApiUrl3 = `https://${process.env.REACT_APP_API_URL}/api/v3`;


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
const apiUrl3 = envApiUrl3;
export { apiUrl, apiUrl3 };
