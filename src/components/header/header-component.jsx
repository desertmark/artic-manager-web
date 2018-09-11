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
          <Link className="nav-link" to='/profile'><i className="fas fa-user-circle m-2"></i>Profile</Link>
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
                <Link className="nav-link" to='/'><i className="fas fa-home m-2"></i>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/contact'><i className="fas fa-at m-2"></i>Contact</Link>
              </li>
              {this.authRoutes()}
              <li className="nav-item">
                <Link className="nav-link" to='/debug'><i className="fas fa-bug m-2"></i>Debug</Link>
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