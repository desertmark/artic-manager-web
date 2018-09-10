import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { getUsers, createUser } from '../../redux/users/user-actions'
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
  }

  getData() {
    return this.props.users.map(user => {
      user.actions = [
        <button key='delete' onClick={()=>alert('Delete')} className="btn btn-outline-danger btn-block">
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
                  }, {
                    dataField: 'firstName',
                    text: 'First Name'
                  }, {
                    dataField: 'lastName',
                    text: 'Last Name'
                  }, {
                    dataField: 'role',
                    text: 'Role'
                  }, {
                    dataField: 'actions',
                    text: 'Actions',
                    classes:'d-flex justify-content-start'
                  }]}>
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
              <ProfileFormComponent onSubmit={this.createUser} mode="create" buttonsPosition="end" hideCancel={true}></ProfileFormComponent>
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
  dispatch => bindActionCreators({getUsers, createUser},dispatch) // mapDispatchToProps
)(UsersTableContainer)