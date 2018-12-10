import React, { Component } from 'react';
import { connect } from 'react-redux';
import {hot} from 'react-hot-loader';
import './app.scss';

import HeaderComponent from '../components/header/header-component';
import ProgressBarComponent from '../components/progress-bar/progress-bar-component';

import { bindActionCreators } from 'redux';
import { getLocalStorageSession, logout } from '../redux/auth/auth-container-actions';
import { appInit } from './app-actions';

// routes
import HomePageComponent from '../pages/home-page/home-page-component';
import ContactPageComponent from '../pages/contact-page/contact-page-component';
import LoginPageComponent from '../pages/login-page/login-page-component';
import DebugPageComponent from '../pages/debug-page/debug-page-component';
import ProfilePageComponent from '../pages/profile-page/profile-page-component';
import ManagePageComponent from '../pages/manage-page/manage-page-component';
import ArticlesPageComponent from '../pages/articles-page/articles-page-component';
import ArticlesDetailsPageComponent from '../pages/articles-page/articles-detail-page-component';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import AlertContainer from '../containers/alert/alert-container';


const AuthRoute = (props) => (
  <Route
    render = {
      () =>
        props.show ?
        (<props.component {...props} />) : 
        (<Redirect to={{pathname: '/', state: { from: props.location }}}/>)
      }
  />
);

class App extends Component{
  constructor() {
    super();
    this.logEnv = this.logEnv.bind(this);
    this.logout = this.logout.bind(this);
  }

  logEnv() {
    console.log({
      ENV_NAME: ENV_NAME,
      API_URL: API_URL,
    });
  }

  componentWillMount() {
    this.logEnv();
    this.props.appInit();
    this.props.getLocalStorageSession();
  }

  logout() {
    this.props.logout();
  }

  render(){
    const { showSpinner, isAuthenticated, isInitializing } = this.props;
    return(
      <BrowserRouter>
        <div className="app">
          <HeaderComponent showAuthRoutes={ isAuthenticated }></HeaderComponent>
          { showSpinner && <ProgressBarComponent></ProgressBarComponent> }
          <AlertContainer></AlertContainer>
          { !isInitializing && 
            <Switch>
              <Route exact path='/' component={ HomePageComponent }/>
              <Route exact path='/contact' component={ ContactPageComponent }/>
              <Route exact path='/articles' component={ ArticlesPageComponent }/>
              <AuthRoute exact path='/articles/create' show={ isAuthenticated } component={ ArticlesDetailsPageComponent }/>
              <AuthRoute exact path='/articles/:id' show={ isAuthenticated } component={ ArticlesDetailsPageComponent }/>
              <AuthRoute exact path='/profile' show={ isAuthenticated }component={ ProfilePageComponent }/>
              <AuthRoute exact path='/login' show={ !isAuthenticated } component={ LoginPageComponent }/>
              <AuthRoute exact path='/manage' show={ isAuthenticated } component={ ManagePageComponent }/>
            </Switch>
          }
        </div>
      </BrowserRouter>
    );
  }
}
const connectedApp = connect(
  state => ({
    showSpinner: state.appReducer.showSpinner,
    isAuthenticated: state.authReducer.isAuthenticated,
    isInitializing: state.appReducer.isInitializing,
  }),
  dispatch => bindActionCreators({getLocalStorageSession, appInit, logout}, dispatch)
)(App)
export default hot(module)(connectedApp);