import TableComponent from '../../components/table/table-component';
import React, { Component } from 'react';
import ModalComponent from '../../components/modal/modal-component';
import DiscountFormComponent from '../../components/discount/discount-form-component';

class DiscountTableContainer extends Component {
    constructor() {
        super();
        this.state = { modalOpen: false };
        this.addDiscount = this.addDiscount.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
    }
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
          },
          {
            dataField: 'actions',
            text: 'Actions',
            classes:'d-flex justify-content-start'
          }]
    }
    confirmDelete(item) {
        this.props.onDelete ? this.props.onDelete(item) : undefined;
    }

    addDiscount(discount) {
        this.props.onAdd ? this.props.onAdd(discount) : undefined;
        this.setState({ modalOpen: false});
    }
    render() {
        return <div id="discount-table-container">
            <div className="col text-right p-0">
                <button className="btn btn-info mb-1 btn-sm" onClick={()=> this.setState({ modalOpen: true })}>
                    <i className="fas fa-plus pr-1"></i>
                    Add Discount
                </button>
            </div>
            <TableComponent
                tempId="tempId"
                columns={ this.getColumns() }
                data={ this.props.discounts || [] }
                onDelete={ this.confirmDelete }
                isEmpty = { true }
            >
            </TableComponent>

            <ModalComponent
                isOpen={this.state.modalOpen}
                name="add-discount-modal"
                title="New discount"
            >
              <DiscountFormComponent onSubmit={this.addDiscount} onCancel={()=> this.setState({ modalOpen: false})}/>
            </ModalComponent>
        </div>
    }
}

export default DiscountTableContainer;