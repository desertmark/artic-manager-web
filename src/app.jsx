import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "./App.scss";

import HeaderComponent from './components/header/header-component';

import HomePageComponent from './pages/home-page/home-page-component';
import ContactPageComponent from './pages/contact-page/contact-page-component';
import LoginPageComponent from './pages/login-page/login-page-component';

import { Switch, Route } from 'react-router-dom'

class App extends Component{
  render(){
    return(
      <div className="App">
        <HeaderComponent></HeaderComponent>
        <Switch>
          <Route exact path='/' component={HomePageComponent}/>
          <Route exact path='/contact' component={ContactPageComponent}/>
          <Route exact path='/login' component={LoginPageComponent}/>
        </Switch>
      </div>
    );
  }
}

export default hot(module)(App);