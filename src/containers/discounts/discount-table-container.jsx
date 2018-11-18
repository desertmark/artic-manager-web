import TableComponent from '../../components/table/table-component';
import React, { Component } from 'react';

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
        console.log('DELETE', item);
    }
    render() {
        return <div id="discount-table-container">
            <TableComponent
                columns={ this.getColumns() }
                data={ [{_id:1, amount: 0.1, description: 'Caja 1'}] }
                onDelete={ this.confirmDelete }
                isEmpty = { true }
            >
            </TableComponent>
        </div>
    }
}

export default DiscountTableContainer;