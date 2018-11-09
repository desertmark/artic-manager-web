import React, { Component } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
import { toApiFilter, toApiParams, toTablePagination } from '../../util/util';
import { Spinner } from '../../components/spinner/spinner';
class TableComponent extends Component {

    constructor() {
        super();
        this.getDeleteBtn = this.getDeleteBtn.bind(this);
        this.getViewBtn = this.getViewBtn.bind(this);
        this.getData = this.getData.bind(this);
        this.filter = this.filter.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
    }
    getDeleteBtn(onDelete, item) { 
        return <button onClick={ () => onDelete(item) } key='delete' data-target={`#${this.props.deleteConfirmModalName}`} data-toggle="modal" className="btn btn-outline-danger mx-1">
            <i className="fa fa-trash"></i>
        </button>
    }

    getViewBtn(onView, item) {
        return <button onClick={ () => onView(item) } key='view' className="btn btn-outline-info mx-1">
            <i className="fa fa-info-circle"></i>
        </button>
    }

    getData() {
      const { onDelete, onView } = this.props;
      return this.props.data.length === 0 ?  [] :
      this.props.data.map(item => {
        item.actions = [];
        onView ? item.actions.push(this.getViewBtn(onView, item)) : null;
        onDelete ? item.actions.push(this.getDeleteBtn(onDelete, item)) : null;
        return item;
      });
    }

    filter() {
        if(this.props.filter) {
            return filterFactory();
        }
    }

    handleTableChange (type, { page, sizePerPage, filters }) {
        this.props.handleTableChange(type, toApiParams({ page, sizePerPage }), toApiFilter(filters));
    }

    render() {
        const { columns, pagination, isLoading, isEmpty } = this.props;
       return <BootstrapTable
          remote
          keyField='_id' 
          data={this.getData()} 
          striped hover bootstrap4
          pagination={ paginationFactory( toTablePagination(pagination) ) }
          filter={ filterFactory() }
          noDataIndication={() => 
            <div className="d-flex justify-content-center">
              { !isEmpty && <Spinner color="info"/> }
              { isEmpty && <span className="font-italic text-info" >We coulnd't find what you are looking for.</span> }
            </div>
          }
          onTableChange={ this.handleTableChange }
          columns={ columns }>
        </BootstrapTable>
    }
}


export default TableComponent;