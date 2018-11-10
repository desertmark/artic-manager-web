import React, { Component } from 'react';

class HomePageComponent extends Component{
  render(){
    return(
      <div id="home-page-component">
        <div className="jumbotron">
          <h1 className="display-4">Artic Manager Web! CircleCI for CI/CD Heroku Hosted!</h1>
          <p className="lead">A simple tool for managing articles with categories and login.</p>
          <hr className="my-4" />
          <p>It uses a NodeJS back-end with mongoDb for data storage.</p>
          <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
        </div>
      </div>
    );
  }
}

export default HomePageComponent;