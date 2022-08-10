import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { render } from 'react-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import theTheme from './resources/styles/theTheme';
import App from './App';
import swDev from './swDev';
import './i18n';
import './resources/styles/css/style.css';
import history from './history';
import store from './store';

const loadingMarkup = <CircularProgress />;

render(
  <ThemeProvider theme={theTheme}>
    <Suspense fallback={loadingMarkup}>
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </Suspense>
  </ThemeProvider>,
  document.getElementById('root')
);

swDev();
