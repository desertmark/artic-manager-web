import React, { Component } from 'react';
import ProfileFormContainer from '../../containers/profile/profile-form-container';
import ChangePasswordFormComponent from '../../components/change-password-form-component';

class ProfilePageComponent extends Component{
  render(){
    return(
      <div id="profile-page-component">
        <div className="jumbotron">
          <h2 className="display-4">Profile</h2>
          <p className="lead">This is your profile where you can see and edit your information.</p>
          <hr className="my-4" />

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 mb-4">
                <ProfileFormContainer></ProfileFormContainer>
              </div>
              <div className="collapse col-lg-4" id="forgot-password-collapse">
                <ChangePasswordFormComponent onSubmit={(values) => console.log(values)}></ChangePasswordFormComponent>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <a data-toggle="collapse" href="#forgot-password-collapse" role="button" aria-expanded="false" aria-controls="forgot-password-collapse">
                  Change Password
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default ProfilePageComponent;