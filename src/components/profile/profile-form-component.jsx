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
    this.state = {
      edit: false
    }
  }

  componentWillMount() {
    this.setState({edit: this.props.edit || false});
  }

  handleMode(edit) {
    this.setState({
      edit
    });
  }

  render(){
    const { formData, buttonsPosition, hideCancel } = this.props;
    const { edit } = this.state;
    const role = this.props.profile ? this.props.profile.role : '';
    return(
      <div id="profile-form-component">
        <form onSubmit={this.props.handleSubmit}>
          <div className="form-row">
            <div className="form-group col">
              <label className="text-secondary">First Name</label>
              <SwitchableInputComponent edit={edit} value={formData.firstName} >
                <Field name="firstName" component="input" type="text" className="form-control" placeholder="First Name" />
              </SwitchableInputComponent>
            </div>
            <div className="form-group col">
              <label className="text-secondary">Last Name</label>
              <SwitchableInputComponent edit={edit} value={formData.lastName} >
                <Field name="lastName" component="input" type="text" className="form-control" placeholder="Last Name" />
              </SwitchableInputComponent>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label className="text-secondary">User Name</label>
              <SwitchableInputComponent edit={edit} value={formData.email} >
                <Field name="email" component="input" type="text" className="form-control" placeholder="User Name or E-mail" />
              </SwitchableInputComponent>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <label className="text-secondary">Level of authorization</label>
              <SwitchableInputComponent edit={edit} value={formData.role}>
                <SelectComponent label="Role" name="role" selected={formData.role}>
                  {[
                    {value: "USER",text: "USER" },
                    {value: "ADMIN",text: "ADMIN" }
                  ]}
                </SelectComponent>
              </SwitchableInputComponent>
            </div>
          </div>
          <div className={`d-flex justify-content-${buttonsPosition || 'start'}`}>
            <EditSaveButton edit={edit} className="btn btn-primary" onModeChange={this.handleMode} />
            {edit && !hideCancel && <button type="button" onClick={()=>this.handleMode(false)} className="btn btn-default ml-2">Cancel</button>}
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