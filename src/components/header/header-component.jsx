import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoginLogoutContainer from '../../containers/login/login-logout-container';

class HeaderComponent extends Component {

  constructor() {
    super();
    this.authRoutes = this.authRoutes.bind(this);
  }

  authRoutes() {
    if(this.props.showAuthRoutes) {
      return (
        <li className="nav-item">
          <Link className="nav-link" to='/profile'>Profile</Link>
        </li>
      )
    }
  }
  render(){
    return(
      <div id="header-component-component">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-stretch" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/contact'>Contact</Link>
              </li>
              {this.authRoutes()}
              <li className="nav-item">
                <Link className="nav-link" to='/debug'>Debug</Link>
              </li>
            </ul>
            <LoginLogoutContainer></LoginLogoutContainer>
          </div>
        </nav>
      </div>
    );
  }
}

export default HeaderComponent;