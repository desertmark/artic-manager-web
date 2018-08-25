import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginLogoutButton from '../../components/login/login-logout-button';

import { bindActionCreators  } from 'redux';
import { logout } from '../../redux/auth/auth-container-actions';
import DropdownComponent from '../../components/dropdown/dropdown-component';

class LoginLogoutContainer extends Component {
  render(){
    const {currentUser, isAuthenticated, logout} = this.props;
    let fullName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '';
    return(
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          {this.props.isAuthenticated &&
            <DropdownComponent text={fullName} options={[{
              link: '/manage',
              text: 'Manage',
              icon: 'fa-cog'
            }]}></DropdownComponent>
          }
        </li>
        <li className="nav-item">
          <LoginLogoutButton
              isAuthenticated={isAuthenticated}
              onLogout = {logout}
          ></LoginLogoutButton>
        </li>
      </ul>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    currentUser: state.userReducer.currentUser
  }), // mapStateToProps
  dispatch => bindActionCreators({logout}, dispatch) // mapDispatchToProps
)(LoginLogoutContainer)