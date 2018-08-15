import React, { Component } from 'react';
import { Link } from 'react-router-dom';




const LoginLogout = ({isAuthenticated, onLogout}) => (
  <div className="nav-item">
    {isAuthenticated ? <button className="btn btn-danger btn-sm" onClick={onLogout}>Log out</button> : <Link className="btn btn-secondary btn-sm" to='/login'>Log in</Link> }
  </div>
);
class HeaderComponent extends Component{
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.onLogout();
  }
  render(){
    return(
      <div id="header-component-component">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to='/'>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/contact'>Contact</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/debug'>Debug</Link>
              </li>
            </ul>
          </div>

          <LoginLogout isAuthenticated={this.props.isAuthenticated} onLogout={this.logout}></LoginLogout>
        </nav>
      </div>
    );
  }
}

export default HeaderComponent;