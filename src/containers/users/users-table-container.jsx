import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { getUsers } from '../../redux/users/user-actions'

class UsersTableContainer extends Component{
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.getUsers();
  }
  render(){
    return(
        <div className="container-fluid">
            <div className="card border mb-3">
              <div className="card-header border">List of Users</div>
              <div className="card-body text">
                <BootstrapTable data={this.props.users} striped hover version="4">
                    <TableHeaderColumn dataSort isKey dataField='_id'>User ID</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField='firstName'>First Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='lastName'>Last Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='role'>Role</TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
        </div>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.appReducer.showSpinner,
    users: state.userReducer.users
  }), // mapStateToProps
  dispatch => bindActionCreators({getUsers},dispatch) // mapDispatchToProps
)(UsersTableContainer)