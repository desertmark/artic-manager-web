// bootstrap setup;
import 'bootstrap/scss/bootstrap.scss';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';

// Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
// middlewares
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import {createLogger} from 'redux-logger'

const logger = createLogger({
  predicate: (getState, action) => !action.type.startsWith('@@redux-form')
})

const spinnerMiddleware = store => next => action => {
  if(action.meta && action.meta.showSpinner === true) {
    store.dispatch({type: 'SHOW_SPINNER'});
    action.meta.promise.finally(() => {
      store.dispatch({type:'HIDE_SPINNER'});
    });
  }
  next(action);
}


const store = createStore(reducer, applyMiddleware(ReduxThunk, logger, promiseMiddleware(), spinnerMiddleware));

ReactDOM.render(
  <Provider store={store} >
      <App />
  </Provider>,
  document.getElementById('root')
);