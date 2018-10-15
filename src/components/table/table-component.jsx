import React, { Component } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import { toApiFilter, toApiParams, toTablePagination } from '../../util/util';

class TableComponent extends Component {
    getDeleteBtn = onDelete => 
        <button onClick={onDelete} key='delete' className="btn btn-outline-danger btn-block">
            <i className="fa fa-trash"></i>
        </button>

    getData = () => {
      const { onDelete } = this.props;
      return this.props.data.length === 0 ?  [] :
      this.props.articles.map(art => {
        art.actions = [];
        onDelete ? art.actions.push(this.getDeleteBtn(onDelete)) : null;
        return art;
      });
    }

    filter = () => {
        if(this.props.filter) {
            return filterFactory();
        }
    }

    handleTableChange = (type, { page, sizePerPage, filters }) => {
        this.props.handleTableChange(type, toApiParams({ page, sizePerPage }), toApiFilter(filters));
    }

    render() {
        const { columns } = this.props;
        <BootstrapTable
          remote
          keyField='_id' 
          data={this.getData()} 
          striped hover bootstrap4
          pagination={ paginationFactory( toTablePagination({page, sizePerPage, totalSize}) ) }
          filter={ this.filter() }
          noDataIndication={() => 
            <div className="d-flex justify-content-center">
              <Spinner color="info"/>
            </div>
          }
          onTableChange={ this.handleTableChange }
          columns={ columns }>
        </BootstrapTable>
    }
}


export default TableComponent;