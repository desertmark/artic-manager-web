import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import {SwitchableInputComponent} from '../../components/switchable-input/switchable-input'
import {EditSaveButton} from '../../components/switchable-input/edit-save-button'
import SelectComponent from '../select/select-component';

class ProfileFormComponent extends Component{
  constructor() {
    super()
    this.handleMode = this.handleMode.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.isEditable = this.isEditable.bind(this);
    this.state = {
      mode: 'details',
      edit: false,
      create: false,
      details: true,
    }
  }

  componentWillMount() {
    this.handleMode(this.props.mode);
  }

  handleMode(mode) {
    let state;
    switch (mode) {
      case 'details':
        state = {mode, edit: false, create: false, details: true};
        break;
      case 'edit':
        state = {mode, edit: true, create: false, details: false};
        break;
      case 'create':
        state = {mode, edit: false, create: true, details: false};
        break;
    }
    this.setState(state);
  }

  isEditable() {
    return this.state.edit || this.state.create;
  }

  toggleEdit() {
    this.state.edit ? this.handleMode('details') : this.handleMode('edit');
  }

  render(){
    const { formData, buttonsPosition, hideCancel } = this.props;
    const { edit, create, details } = this.state;
    const role = this.props.profile ? this.props.profile.role : '';
    return(
      <div id="profile-form-component">
        <form onSubmit={this.props.handleSubmit}>
          <div className="form-row">
            <div className="form-group col">
              <label className="text-secondary">First Name</label>
              <SwitchableInputComponent edit={this.isEditable()} value={formData.firstName} >
                <Field name="firstName" component="input" type="text" className="form-control" placeholder="First Name" />
              </SwitchableInputComponent>
            </div>
            <div className="form-group col">
              <label className="text-secondary">Last Name</label>
              <SwitchableInputComponent edit={this.isEditable()} value={formData.lastName} >
                <Field name="lastName" component="input" type="text" className="form-control" placeholder="Last Name" />
              </SwitchableInputComponent>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label className="text-secondary">User Name</label>
              <SwitchableInputComponent edit={this.isEditable()} value={formData.email} >
                <Field name="email" component="input" type="text" className="form-control" placeholder="User Name or E-mail" />
              </SwitchableInputComponent>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label className="text-secondary">Level of authorization</label>
              <SwitchableInputComponent edit={this.isEditable()} value={formData.role}>
                <Field label="Role" name="role" selected={formData.role} component={SelectComponent}>
                  {[
                    {value: "USER",text: "USER" },
                    {value: "ADMIN",text: "ADMIN" }
                  ]}
                </Field>
              </SwitchableInputComponent>
            </div>
          </div>
          <div className={`d-flex justify-content-${buttonsPosition || 'start'}`}>
            {(edit || details) && <EditSaveButton edit={edit} className="btn btn-primary" onModeChange={this.toggleEdit} />}
            {edit && !hideCancel && <button type="button" onClick={this.toggleEdit} className="btn btn-default ml-2">Cancel</button>}
            {create && <button type="submit" className="btn btn-primary ml-2">Create</button>}
          </div>
        </form>
      </div>
    );
  }
}
const selector = formValueSelector('profileForm');

export default connect(
  (state, ownProps) => {
    return {
      initialValues: ownProps.initialValues,
      formData: selector(state, 'firstName', 'lastName', 'email', 'role')
    }
  },
  null)(reduxForm({
    form: 'profileForm',
  })(ProfileFormComponent))