import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { getUsers, createUser, deleteUser } from '../../redux/users/user-actions'
import ModalComponent from '../../components/modal/modal-component';
import ProfileFormComponent from '../../components/profile/profile-form-component';
import BootstrapTable from 'react-bootstrap-table-next';

class UsersTableContainer extends Component{
  constructor() {
    super();
    this.getData = this.getData.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  componentWillMount() {
    this.props.getUsers();
  }

  createUser(values) {
    this.props.createUser(values);
    $('#add-user-modal').modal('hide');
  }

  getData() {
    return this.props.users.map(user => {
      user.actions = [
        <button key='delete' onClick={()=>this.props.deleteUser(user._id)} className="btn btn-outline-danger btn-block">
        <i className="fa fa-trash"></i>
        </button>
      ];
      return user;
    })
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
                <BootstrapTable keyField='_id' data={this.getData()} striped hover bootstrap4 columns={[{
                    dataField: '_id',
                    text: 'ID'
                  }, 
                  {
                    dataField: 'firstName',
                    text: 'First Name'
                  }, 
                  {
                    dataField: 'lastName',
                    text: 'Last Name'
                  }, 
                  {
                    dataField: 'email',
                    text: 'email'
                  }, 
                  {
                    dataField: 'role',
                    text: 'Role'
                  }, 
                  {
                    dataField: 'actions',
                    text: 'Actions',
                    classes:'d-flex justify-content-start'
                  }]}>
                </BootstrapTable>
              </div>
            </div>
            <ModalComponent 
              name="add-user-modal"
              title="CREATE USER"
            >
              <ProfileFormComponent onSubmit={this.createUser} mode="create" buttonsPosition="end"></ProfileFormComponent>
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
  dispatch => bindActionCreators({getUsers, createUser, deleteUser},dispatch) // mapDispatchToProps
)(UsersTableContainer)