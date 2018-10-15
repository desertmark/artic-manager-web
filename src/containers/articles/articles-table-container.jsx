import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { getArticles } from '../../redux/articles/articles-actions'
import ModalComponent from '../../components/modal/modal-component';
import ProfileFormComponent from '../../components/profile/profile-form-component';
import { textFilter } from 'react-bootstrap-table2-filter';
import TableComponent from '../../components/table/table-component';
import { get } from 'lodash';

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
    let columns = [{
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
    }];

    const role = get(this.props.currentUser,'role');
    if (role) {
      columns.push({
        dataField: 'listPrice',
        text: 'Price',
        classes:'d-flex justify-content-start'
      });
    }

    if(role === 'ADMIN') {
      columns = columns.concat([{
        dataField: 'utility',
        text: 'Utility',
        classes:'d-flex justify-content-start'
      },
      {
        dataField: 'dolar',
        text: 'Dolar Price',
        classes:'d-flex justify-content-start'
      },
      {
        dataField: 'vat',
        text: 'V.A.T.',
        classes:'d-flex justify-content-start'
      },
      {
        dataField: 'transport',
        text: 'Transport',
        classes:'d-flex justify-content-start'
      },
      {
        dataField: 'card',
        text: 'Card',
        classes:'d-flex justify-content-start'
      }]);
    }

    columns.push({
      dataField: 'actions',
      text: 'Actions',
      classes:'d-flex justify-content-start'
    });
    return columns;
  }

  handleTableChange(type, params, filters) {
    this.props.getArticles(params, filters);
  }
  
  render(){
    const { pagination, articles, isEmpty } = this.props;
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
                  handleTableChange={ this.handleTableChange }
                  isEmpty = { isEmpty }
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
    isEmpty: state.articlesReducer.isEmpty,
    currentUser: state.userReducer.currentUser,
  }), // mapStateToProps
  dispatch => bindActionCreators({ getArticles }, dispatch) // mapDispatchToProps
)(ArticlesTableContainer)