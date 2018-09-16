import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { passwordUpdate } from '../../redux/auth/auth-container-actions';
import ChangePasswordFormComponent from '../../components/profile/change-password-form-component';

class ChangePasswordFormContainer extends Component{
  constructor() {
    super();
    this.save = this.save.bind(this);
  }
  save(values) {
    this.props.passwordUpdate(values);
  }
  render(){
    return(
      <div id="change-password-form-container">
        <ChangePasswordFormComponent onSubmit={this.save}></ChangePasswordFormComponent>
      </div>
    );
  }
}

export default connect(
  null, // mapStateToProps
  dispatch => bindActionCreators({passwordUpdate},dispatch) // mapDispatchToProps
)(ChangePasswordFormContainer)