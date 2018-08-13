import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class LoginFormComponent extends Component{

  render(){
    return(
      <div id="login-form-component">
        <form onSubmit={this.props.handleSubmit}>
          <div className="form-row">
            <div className="form-group col-lg-6">
              <label>User Name</label>
              <Field name="email" component="input" type="text" className="form-control" placeholder="User Name" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-lg-6">
              <label>Password</label>
              <Field name="password" component="input" type="password" className="form-control" placeholder="Password" />
            </div>
          </div>
          <div className="form-group">
            <div className="form-check">
              <Field name="remeberme" component="input" className="form-check-input" type="checkbox" />
              <label className="form-check-label">
                Remeber me?
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    );
  }
}

export default connect(
  // mapStateToProps
  state => ({
    initialValues: {
      email:'',
      password:'',
      rememberme:false,
    }
  }),
  // mapDispatchToProps
  null
  )(reduxForm({
    form: 'loginForm',
  })(LoginFormComponent))