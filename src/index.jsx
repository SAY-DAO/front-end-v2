import React, { Suspense } from 'react';
import './service-worker/sw-cleanup'; // one-time cleanup (runs once and reloads)
import { CircularProgress, Grid } from '@mui/material';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './redux/store';
import './i18n';
import './resources/styles/css/style.css';
import * as serviceWorkerRegistration from './service-worker/sw-register.js'; // register() function

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // createRoot(container!) if you use TypeScript

root.render(
  <Provider store={store}>
    <Router>
      <Suspense
        fallback={
          <Grid container>
            <CircularProgress sx={{ m: 'auto', color: '#fbb563' }} />
          </Grid>
        }
      >
        <App />
      </Suspense>
    </Router>
  </Provider>,
);

// call the register helper (this calls navigator.serviceWorker.register and handles skipWaiting)
if (process.env.REACT_APP_NODE_ENV === 'production') {
  serviceWorkerRegistration.register();
}
