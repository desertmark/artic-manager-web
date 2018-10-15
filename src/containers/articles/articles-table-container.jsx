import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { getArticles } from '../../redux/articles/articles-actions'
import ModalComponent from '../../components/modal/modal-component';
import ProfileFormComponent from '../../components/profile/profile-form-component';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { toApiFilter, toApiParams, toTablePagination } from '../../util/util';
import { Spinner } from '../../components/spinner/spinner';

import TableComponent from '../../components/table/table-component';

class ArticlesTableContainer extends Component{
  constructor() {
    super();
    this.getColumns = this.getColumns.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentWillMount() {
    this.props.getArticles()
  }

  getColumns() {
    return [{
      dataField: '_id',
      text: 'ID',
      hidden: true
    },
    {
      dataField: 'code',
      text: 'Code',
      filter: textFilter()
    },
    {
      dataField: 'description',
      text: 'Description',
      filter: textFilter()
    },
    {
      dataField: 'category.description',
      text: 'Category',
      filter: textFilter()
    },  
    {
      dataField: 'actions',
      text: 'Actions',
      classes:'d-flex justify-content-start'
    }];
  }

  handleTableChange(type, params, filters) {
    this.props.getArticles(params, filters);
  }
  
  render(){
    const { pagination, articles } = this.props;
    return(
        <div className="container-fluid">
            <div className="card border mb-3">
              <div className="card-header border">List of articles</div>
              <div className="card-body text">
                <button data-target="" data-toggle="modal" className="btn btn-success mb-2">
                  <i className="fas fa-plus pr-1"></i>
                  Add
                </button>
                <TableComponent
                  columns={ this.getColumns() }
                  pagination={ pagination }
                  data={ articles }
                  onDelete={ art => console.log('delete', art) }
                  handleTableChange={this.handleTableChange}
                >
                </TableComponent>
              </div>
            </div>
            <ModalComponent 
              name="add-user-modal"
              title="CREATE USER"
            >
              <ProfileFormComponent onSubmit={this.createUser} mode="create" buttonsPosition="end"></ProfileFormComponent>
            </ModalComponent>
        </div>
    );
  }
}

export default connect(
  state => ({
    isLoading: state.appReducer.showSpinner,
    articles: state.articlesReducer.articles,
    pagination: state.articlesReducer.pagination,
  }), // mapStateToProps
  dispatch => bindActionCreators({ getArticles }, dispatch) // mapDispatchToProps
)(ArticlesTableContainer)