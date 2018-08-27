import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { getUsers } from '../../redux/users/user-actions'
import ModalComponent from '../../components/modal/modal-component';
import ProfileFormComponent from '../../components/profile/profile-form-component';

class UsersTableContainer extends Component{
  constructor() {
    super();
    this.openModal = this.openModal.bind(this);
  }

  openModal() {

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
                <button data-target="#add-user-modal" data-toggle="modal" className="btn btn-success mb-2">
                  <i className="fas fa-plus pr-1"></i>
                  Add
                </button>
                <BootstrapTable data={this.props.users} striped hover version="4">
                    <TableHeaderColumn dataSort isKey dataField='_id'>User ID</TableHeaderColumn>
                    <TableHeaderColumn dataSort dataField='firstName'>First Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='lastName'>Last Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='role'>Role</TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
            <ModalComponent 
              name="add-user-modal"
              title="Add a new user"
              buttons={[
                <button key="1" type="button" data-dismiss="modal" className="btn btn-default">Cancel</button>
              ]}  
            >
              <ProfileFormComponent edit={true} buttonsPosition="end" hideCancel={true}></ProfileFormComponent>
            </ModalComponent>
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