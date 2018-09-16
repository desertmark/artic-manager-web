import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';

class ChangePasswordFormComponent extends Component{
    constructor() {
        super();
        this.reset = this.reset.bind(this);
    }

    reset() {
        this.props.reset();
    }

    render(){
        return(
          <div id="change-password-form-component">
            <h4 className="font-weight-light">Change Password</h4>
            <form onSubmit={this.props.handleSubmit}>
                <div className="form-row">
                    <div className="form-group col">
                        <label className="text-secondary">Old Password</label>
                        <Field name="oldPassword" component="input" type="password" className="form-control"  />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label className="text-secondary">New Password</label>
                        <Field name="newPassword" component="input" type="password" className="form-control"  />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col">
                        <label className="text-secondary">Confirm New Password</label>
                        <Field name="confirmPassword" component="input" type="password" className="form-control"  />
                    </div>
                </div>

                <div className="form-row">
                  <div className="form-group col">
                    <button type="submit" className="btn btn-primary mr-2">Change Password</button>
                    <button type="button" onClick={this.reset}className="btn btn-default">Reset</button>
                  </div>
                </div>
            </form>
          </div>
        );
    }
}

export default reduxForm({form:'changePasswordForm'})(ChangePasswordFormComponent);