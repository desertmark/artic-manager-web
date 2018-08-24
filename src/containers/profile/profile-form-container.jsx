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
    return(
      <div>
        {this.props.currentUser &&
          <ProfileFormComponent 
              onSubmit={this.save}
              profile={this.props.currentUser}
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