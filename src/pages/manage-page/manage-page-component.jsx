import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
const products = [{
    id: 1,
    name: "Product1",
    price: 120
}, {
    id: 2,
    name: "Product2",
    price: 80
}];
class ManagePageComponent extends Component{
  render(){
    return(
      <div id="manage-page-component">
        <div className="jumbotron">
          <h2 className="display-4">Management</h2>
          <p className="lead">Admin dashnboard.</p>
        </div>
        <BootstrapTable data={products} striped hover version="4" cellEdit={{mode:'dbclick'}}>
            <TableHeaderColumn dataSort isKey dataField='id'>Product ID</TableHeaderColumn>
            <TableHeaderColumn dataSort dataField='name'>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default ManagePageComponent;