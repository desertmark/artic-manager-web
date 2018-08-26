import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import UsersTableContainer from '../../containers/users/users-table-container';
class ManagePageComponent extends Component{
  render(){
    return(
      <div id="manage-page-component">
        <div className="jumbotron">
          <h2 className="display-4">Management</h2>
          <p className="lead">Admin dashnboard.</p>
        </div>
        <UsersTableContainer></UsersTableContainer>
      </div>
    );
  }
}

export default ManagePageComponent;