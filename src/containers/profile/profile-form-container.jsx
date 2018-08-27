import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { updateUser } from '../../redux/users/user-actions';
import ProfileFormComponent from '../../components/profile/profile-form-component';

class ProfileFormContainer extends Component{
  constructor() {
    super();
    this.save = this.save.bind(this);
  }
  save(values) {
    this.props.updateUser(this.props.currentUser._id, values);
  }
  render(){
    const { firstName, lastName, email, role } = this.props.currentUser;
    return(
      <div className="col-lg-6">
        {this.props.currentUser &&
          <ProfileFormComponent
            onSubmit={this.save}
            profile={this.props.currentUser}
            initialValues={{ firstName, lastName, email, role }}
          >
          </ProfileFormComponent>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    currentUser: state.userReducer.currentUser,    
    isLoading: state.appReducer.showSpinner
  }), // mapStateToProps
  dispatch => bindActionCreators({updateUser},dispatch) // mapDispatchToProps
)(ProfileFormContainer)