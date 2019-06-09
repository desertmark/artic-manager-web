// bootstrap setup;
import 'bootstrap/scss/bootstrap.scss';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';

// Redux
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
// middlewares
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger'
import { spinnerMiddleware } from './redux/middlewares/spinner-middleware';
import { getCurrentUserMiddleware } from './redux/middlewares/user-middleware';
import { detectExpiredSessionMiddleware } from './redux/middlewares/auth-middleware';
import { alertMiddleware,alertErrorMiddleware } from './redux/middlewares/alert-middleware';

// For redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  predicate: (getState, action) => !action.type.startsWith('@@redux-form')
})
const middlewares = composeEnhancers(applyMiddleware(
  ReduxThunk, 
  // logger, 
  promiseMiddleware(), 
  spinnerMiddleware, 
  getCurrentUserMiddleware,
  detectExpiredSessionMiddleware,
  alertMiddleware,
  alertErrorMiddleware
));

const store = createStore(reducer, middlewares);

ReactDOM.render(
  <Provider store={store} >
      <App />
  </Provider>,
  document.getElementById('root')
);