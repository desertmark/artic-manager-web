import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "./App.css";

import HeaderComponent from './components/header-component';

import HomePageComponent from './pages/home-page/home-page-component';
import ContactPageComponent from './pages/contact-page/contact-page-component';



import { Switch, Route } from 'react-router-dom'

class App extends Component{
  render(){
    return(
      <div className="App">
        <HeaderComponent></HeaderComponent>
        <Switch>
          <Route exact path='/' component={HomePageComponent}/>
          <Route exact path='/contact' component={ContactPageComponent}/>
        </Switch>
      </div>
    );
  }
}

export default hot(module)(App);