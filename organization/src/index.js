import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './helpers';
import App from './App/layout';
import 'font-awesome/css/font-awesome.min.css';
import { ActionCableProvider } from 'react-actioncable-provider';

render(
  <ActionCableProvider url={'ws://localhost:3000/cable'}>
  <Provider store={store}>
      <App />
  </Provider>,
  </ActionCableProvider>,
  document.getElementById('root')
);


