import React, { Component } from "react";

class HomePageComponent extends Component{
  render(){
    return(
      <div id="home-page-component">
        <div class="jumbotron">
          <h1 class="display-4">Artic Manager Web!</h1>
          <p class="lead">A simple tool for managing articles with categories and login.</p>
          <hr class="my-4" />
          <p>It uses a NodeJS back-end with mongoDb for data storage.</p>
          <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </div>
      </div>
    );
  }
}

export default HomePageComponent;