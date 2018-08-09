// bootstrap setup;
import 'bootstrap/scss/bootstrap.scss';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
// Router
import { BrowserRouter } from 'react-router-dom'
// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
// middlewares
import ReduxThunk from 'redux-thunk';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store} >
      <App />
  </Provider>,
  document.getElementById('root')
);