import React, { Suspense } from 'react';
import { CircularProgress } from '@mui/material';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './redux/store';
import './i18n';
import './resources/styles/css/style.css';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // createRoot(container!) if you use TypeScript

root.render(
  <Provider store={store}>
    <Router>
      <Suspense fallback={<CircularProgress />}>
        <App />
      </Suspense>
    </Router>
  </Provider>,
);

// If you want to enable client cache, register instead.
serviceWorker.register();
