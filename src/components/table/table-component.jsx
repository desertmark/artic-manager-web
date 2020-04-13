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
        return <i className="text-danger fa fa-trash" onClick={ () => onDelete(item) } key='delete' data-target={`#${this.props.deleteConfirmModalName}`} data-toggle="modal">
        </i>
    }

    getViewBtn(onView, item) {
        return <i onClick={ () => onView(item) } key='view' className="mx-1 text-info fa fa-info-circle">
        </i>
    }

    getEditBtn(onEdit, item) {
        return <i onClick={ () => onEdit(item) } key='edit' className="fa-fa-edit text-info mx-1">
        </i>
    }

    getData() {
      const { onDelete, onView, onEdit, data } = this.props;
      return data.length === 0 ?  [] :
      data.slice(0).map((item, ix) => {
        item.actions = [];
        onView ? item.actions.push(this.getViewBtn(onView, item)) : null;
        onEdit ? item.actions.push(this.getEditBtn(onEdit, item)) : null;
        onDelete ? item.actions.push(this.getDeleteBtn(onDelete, item)) : null;
        item.tableId = ix;
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
        const { columns, pagination, isEmpty } = this.props;
       return <BootstrapTable
          remote
          keyField="tableId"
          data={this.getData()} 
          striped hover bootstrap4
          pagination={ pagination ? paginationFactory( toTablePagination(pagination) ) : undefined}
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