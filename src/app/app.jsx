import React, { Component } from 'react';
import { connect } from 'react-redux';
import {hot} from 'react-hot-loader';
import './App.scss';

import HeaderComponent from '../components/header/header-component';
import ProgressBarComponent from '../components/progress-bar/progress-bar-component';

import { bindActionCreators } from 'redux';
import {getLocalStorageSession} from '../redux/auth/auth-container-actions';

// routes
import HomePageComponent from '../pages/home-page/home-page-component';
import ContactPageComponent from '../pages/contact-page/contact-page-component';
import LoginPageComponent from '../pages/login-page/login-page-component';
import DebugPageComponent from '../pages/debug-page/debug-page-component';

import { Switch, Route, BrowserRouter } from 'react-router-dom'

class App extends Component{
  logEnv() {
    console.log({
      ENV_NAME: ENV_NAME,
      API_URL: API_URL,
    });
  }
  componentWillMount() {
    this.logEnv();
    this.props.getLocalStorageSession();
  }
  render(){
    return(
      <BrowserRouter>
        <div className="App"> 
          <HeaderComponent></HeaderComponent>
          {this.props.showSpinner && <ProgressBarComponent></ProgressBarComponent> }
          <Switch>
            <Route exact path='/' component={HomePageComponent}/>
            <Route exact path='/contact' component={ContactPageComponent}/>
            <Route exact path='/login' component={LoginPageComponent}/>
            { ENV_NAME !== 'Production' && <Route exact path='/debug' component={DebugPageComponent}></Route> } 
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
const connectedApp = connect(
  state => ({showSpinner: state.appReducer.showSpinner}),
  dispatch => bindActionCreators({getLocalStorageSession}, dispatch)
)(App)
export default hot(module)(connectedApp);