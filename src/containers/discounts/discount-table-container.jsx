import TableComponent from '../../components/table/table-component';
import React, { Component } from 'react';
import ModalComponent from '../../components/modal/modal-component';
import DiscountFormComponent from '../../components/discount/discount-form-component';

class DiscountTableContainer extends Component {
    getColumns() {
        return [{
            dataField: '_id',
            hidden: true
          },
          {
            dataField: 'amount',
            text: 'Amount',
          },
          {
            dataField: 'description',
            text: 'Description',
          }]
    }
    confirmDelete(item) {
        this.props.onDelete ? this.props.onDelete(item) : undefined;
    }
    render() {
        return <div id="discount-table-container">
            <div className="col text-right p-0">
                <button className="btn btn-info mb-1 btn-sm" data-target="#add-discount-modal" data-toggle="modal">
                    <i className="fas fa-plus pr-1"></i>
                    Add Discount
                </button>
            </div>
            <TableComponent
                columns={ this.getColumns() }
                data={ this.props.discounts || [] }
                onDelete={ this.confirmDelete }
                isEmpty = { true }
            >
            </TableComponent>

            <ModalComponent 
              name="add-discount-modal"
              title="New discount"
            >
              <DiscountFormComponent onSubmit={console.log}/>
            </ModalComponent>
        </div>
    }
}

export default DiscountTableContainer;