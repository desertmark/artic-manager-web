import React, { Component } from 'react';
import ProfileFormContainer from '../../containers/profile/profile-form-container';

class ProfilePageComponent extends Component{
  render(){
    return(
      <div id="profile-page-component">
        <div className="jumbotron">
          <h2 className="display-4">Profile</h2>
          <p className="lead">This is your profile where you can see and edit your information.</p>
          <hr className="my-4" />
          <ProfileFormContainer></ProfileFormContainer>
        </div>
      </div>
    );
  }
}

export default ProfilePageComponent;