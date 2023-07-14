import * as Sentry from '@sentry/react';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';


const env = process.env.REACT_APP_NODE_ENV || 'local';

let envApiUrl = '';
let envApiUrl3 = '';

if (env === 'prod') {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_PROD}/api/v2`;
  envApiUrl3 = `https://${process.env.REACT_APP_DOMAIN_PROD}/api/v3`;
} else if (env === 'stag') {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_STAGING}/api/v2`;
  envApiUrl3 = `https://${process.env.REACT_APP_DOMAIN_STAGING}/api/v3`;
} else if (env === 'development') {
  envApiUrl = `https://${process.env.REACT_APP_DOMAIN_DEV}/api/v2`;
  envApiUrl3 = `https://${process.env.REACT_APP_DOMAIN_DEV}/api/v3`;
} else {
  envApiUrl = `http://${process.env.REACT_APP_DOMAIN_LOCAL}/api/v2`;
  envApiUrl3 = `http://${process.env.REACT_APP_DOMAIN_LOCAL}/api/v3`;
}

const envApiDao = `http://${process.env.REACT_APP_DAO_LOCAL}/api/dao`;

if (env !== 'local') {
  Sentry.init({
    // dsn: process.env.REACT_APP_SENTRY_DSN,
    // normalizeDepth: 10, // Or however deep you want your state context to be.
    // environment: process.env.REACT_APP_NODE_ENV,
    // integrations: [new Integrations.BrowserTracing()],
    // // Can also use reactRouterV3Instrumentation or reactRouterV4Instrumentation
    // routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
    // tracesSampleRate: 1.0,
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

    setupLogRocketReact(LogRocket);
  }
}
const apiUrl = envApiUrl;
const apiUrl3 = envApiUrl3;
const apiDao = envApiDao;
export { apiUrl, apiUrl3, apiDao };
