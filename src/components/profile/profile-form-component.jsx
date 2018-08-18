import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import {SwitchableInputComponent} from '../../components/switchable-input/switchable-input'
import {EditSaveButton} from '../../components/switchable-input/edit-save-button'

class ProfileFormComponent extends Component{
  constructor() {
    super()
    this.handleMode = this.handleMode.bind(this);
    this.state = {
      edit: false
    }
  }

  handleMode(edit) {
    this.setState({
      edit
    });
  }

  render(){
    const { formData } = this.props;
    const { edit } = this.state;
    const role = this.props.profile ? this.props.profile.role : '';
    return(
      <div id="profile-form-component">
        <form onSubmit={this.props.handleSubmit}>
          <div className="form-row">
            <div className="form-group col col-lg-3">
              <label className="text-secondary">First Name</label>
              <SwitchableInputComponent edit={edit} value={formData.firstName} >
                <Field name="firstName" component="input" type="text" className="form-control" placeholder="First Name" />
              </SwitchableInputComponent>
            </div>
            <div className="form-group col col-lg-3">
              <label className="text-secondary">Last Name</label>
              <SwitchableInputComponent edit={edit} value={formData.lastName} >
                <Field name="lastName" component="input" type="text" className="form-control" placeholder="Last Name" />
              </SwitchableInputComponent>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-lg-6">
              <label className="text-secondary">User Name</label>
              <SwitchableInputComponent edit={edit} value={formData.email} >
                <Field name="email" component="input" type="text" className="form-control" placeholder="User Name or E-mail" />
              </SwitchableInputComponent>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-lg-6">
              <label className="text-secondary">Level of authorization</label>
              <div className="" role="alert">
                {role}
              </div>
            </div>
          </div>
          <EditSaveButton className="btn btn-primary" onModeChange={this.handleMode} />
        </form>
      </div>
    );
  }
}
const selector = formValueSelector('profileForm');

export default connect(
  state => {
    const { firstName, lastName, email } = state.userReducer.currentUser;
    return {
      initialValues: {
        firstName,
        lastName,
        email,
      },
      formData: selector(state, 'firstName', 'lastName', 'email')
    }
  },
  null)(reduxForm({
    form: 'profileForm',
  })(ProfileFormComponent))