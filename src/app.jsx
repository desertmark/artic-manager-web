import React, { Component } from "react";
import {hot} from "react-hot-loader";
import "./App.css";

import HomePageComponent from './pages/home-page/home-page-component';
import HeaderComponent from './components/header-component';


class App extends Component{
  render(){
    return(
      <div className="App">
        <HeaderComponent></HeaderComponent>
        <HomePageComponent></HomePageComponent>
      </div>
    );
  }
}

export default hot(module)(App);