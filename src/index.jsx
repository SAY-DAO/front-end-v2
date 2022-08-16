import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import theTheme from './resources/styles/theTheme';
import App from './App';
import swDev from './swDev';
import './i18n';
import './resources/styles/css/style.css';
import history from './history';
import store from './store';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

const loadingMarkup = <CircularProgress />;

root.render(
  <ThemeProvider theme={theTheme}>
    <Suspense fallback={loadingMarkup}>
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </Suspense>
  </ThemeProvider>
);

swDev();
