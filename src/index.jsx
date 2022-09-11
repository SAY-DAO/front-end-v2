import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App';
import swDev from './swDev';
import './i18n';
import './resources/styles/css/style.css';
import store from './redux/store';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

swDev();
