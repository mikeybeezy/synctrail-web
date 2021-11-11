import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './helpers';
import App from './App/layout';
import 'font-awesome/css/font-awesome.min.css';

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);


