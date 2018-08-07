// bootstrap setup;
import 'bootstrap/scss/bootstrap.scss';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// React
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// Router
import { BrowserRouter } from 'react-router-dom'
// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store} >
      <App />
  </Provider>,
  document.getElementById("root")
);