import React, { Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App';
import swDev from './swDev';
import './i18n';
import './resources/styles/css/style.css';
import history from './history';
import store from './redux/store';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const loadingMarkup = <CircularProgress />;

root.render(
  <Suspense fallback={loadingMarkup}>
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </Suspense>
);

swDev();
