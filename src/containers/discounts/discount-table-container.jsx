import TableComponent from '../../components/table/table-component';
import React, { Component } from 'react';
import ModalComponent from '../../components/modal/modal-component';
import DiscountFormComponent from '../../components/discount/discount-form-component';
import { pick } from 'lodash';
class DiscountTableContainer extends Component {
    constructor() {
        super();
        this.state = { modalOpen: false };
        this.addDiscount = this.addDiscount.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
    }
    getColumns() {
        const columns = [{
          dataField: '_id',
          hidden: true
        },
        {
            dataField: 'description',
            text: 'Description',
        },
        {
            dataField: 'amount',
            text: 'Amount',
          }];
        if (this.props.actions) {
            columns.push({
                dataField: 'actions',
                text: 'Actions',
                classes:'d-flex justify-content-start'
            });
        }
        return columns;
        
    }
    confirmDelete(item) {
        this.props.onDelete ? this.props.onDelete(item) : undefined;
    }

    addDiscount(discount) {
        const newDiscount = pick(discount, 'amount', 'description');
        this.props.onAdd ? this.props.onAdd(newDiscount) : undefined;
        this.setState({ modalOpen: false});
    }
    render() {
        return <div id="discount-table-container">
            {this.props.actions && 
                <div className="col text-right p-0">
                    <button className="btn btn-info mb-1 btn-sm" onClick={()=> this.setState({ modalOpen: true })}>
                        <i className="fas fa-plus pr-1"></i>
                        Add Discount
                    </button>
                </div>
            }
            <TableComponent
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