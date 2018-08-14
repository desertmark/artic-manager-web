import React, { Component } from 'react';
import LoginFormContainer from '../../containers/login-form/login-form-container';
import {withRouter} from 'react-router';

class LoginPageComponent extends Component{
  login(values) {
    console.log(values);
  }
  render(){
    return(
      <div id="login-page-component">
        <div className="jumbotron">
          <h1 className="display-4">Login</h1>
          <p className="lead">Ingrese sus credenciales de accesos para operar con el sistema.</p>
          <hr className="my-4" />
          <LoginFormContainer
            onLoginCompleted={() => this.props.history.push('/')}
          >
          </LoginFormContainer>
          <p>Si no puede acceder, contactese con el administrador.</p>
          <a className="btn btn-primary btn-sm" href="#" role="button">Contact Admin</a>
        </div>

      </div>
    );
  }
}

export default withRouter(LoginPageComponent);