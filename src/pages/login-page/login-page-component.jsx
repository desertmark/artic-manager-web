import React, { Component } from "react";
import LoginFormComponent from '../../components/login/login-form-component';

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
          <LoginFormComponent onSubmit={this.login}></LoginFormComponent>
          <p>Si no puede acceder, contactese con el administrador.</p>
          <a className="btn btn-primary btn-sm" href="#" role="button">Contact Admin</a>
        </div>

      </div>
    );
  }
}

export default LoginPageComponent;