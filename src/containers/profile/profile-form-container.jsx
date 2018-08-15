import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
// import { saveProfile } from '../../redux/profile/profile-actions';
import ProfileFormComponent from '../../components/profile/profile-form-component';

class ProfileFormContainer extends Component{
  constructor() {
    super();
    this.save = this.save.bind(this);
  }
  save(values) {
    console.log(values);
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
  null, // dispatch => bindActionCreators({saveProfile},dispatch) // mapDispatchToProps
)(ProfileFormContainer)