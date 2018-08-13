import React, { Component } from 'react';
import { connect } from 'react-redux';
import {hot} from 'react-hot-loader';
import './App.scss';

import HeaderComponent from './components/header/header-component';
import ProgressBarComponent from './components/progress-bar/progress-bar-component';

// routes
import HomePageComponent from './pages/home-page/home-page-component';
import ContactPageComponent from './pages/contact-page/contact-page-component';
import LoginPageComponent from './pages/login-page/login-page-component';

import { Switch, Route, BrowserRouter } from 'react-router-dom'

class App extends Component{
  componentWillMount() {
    console.log({
      ENV_NAME: ENV_NAME,
      API_URL: API_URL,
    });
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
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
const connectedApp = connect(
  state => ({showSpinner: state.appReducer.showSpinner}),
  null
)(App)
export default hot(module)(connectedApp);