import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../redux/auth/auth-container-actions';
import LoginFormComponent from '../../components/login/login-form-component';

class LoginFormContainer extends Component{
  constructor() {
    super();
    this.login = this.login.bind(this);
  }
  login(values) {
    this.props.login(values);
  }
  render(){
    return(
      <div>
        <LoginFormComponent onSubmit={this.login}></LoginFormComponent>
        <pre>{this.props.isLoading}</pre>
        <pre>{JSON.stringify(this.props.session)}</pre>
        <pre>{JSON.stringify(this.props.error)}</pre>
      </div>
    );
  }
}

export default connect(
  state => ({
    session: state.authReducer.session,
    error: state.authReducer.error
  }), // mapStateToProps
  dispatch => bindActionCreators({login},dispatch) // mapDispatchToProps
)(LoginFormContainer)