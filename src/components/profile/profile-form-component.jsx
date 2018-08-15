import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

class ProfileFormComponent extends Component{

  render(){
    const role = this.props.profile ? this.props.profile.role : '';
    return(
      <div id="profile-form-component">
        <form onSubmit={this.props.handleSubmit}>
          <div className="form-row">
            <div className="form-group col col-lg-3">
              <label className="text-secondary">First Name</label>
              <Field name="firstName" component="input" type="text" className="form-control" placeholder="First Name" />
            </div>
            <div className="form-group col col-lg-3">
              <label className="text-secondary">Last Name</label>
              <Field name="lastName" component="input" type="text" className="form-control" placeholder="Last Name" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-lg-6">
              <label className="text-secondary">User Name</label>
              <Field name="email" component="input" type="text" className="form-control" placeholder="User Name or E-mail" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-lg-6">
              <label className="text-secondary">Level of authorization</label>
              <div className="alert alert-primary" role="alert">
                {role}
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
        </form>
      </div>
    );
  }
}

export default connect(
  state => {
    const { firstName, lastName, email } = state.userReducer.currentUser
    return {
      initialValues: {
        firstName,
        lastName,
        email,
      }
    }
  },
  null)(reduxForm({
    form: 'profileForm',
  })(ProfileFormComponent))