import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { getArticles } from '../../redux/articles/articles-actions'
import ModalComponent from '../../components/modal/modal-component';
import ProfileFormComponent from '../../components/profile/profile-form-component';
import { textFilter } from 'react-bootstrap-table2-filter';
import TableComponent from '../../components/table/table-component';
import { get } from 'lodash';
import { codeFormatter, currencyFormatter, percentageFormatter } from '../../util/articles-formatters';

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
      filter: textFilter(),
      formatter: codeFormatter
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
      columns = columns.concat([
        {
          dataField: 'price',
          text: 'Price',
          formatter: currencyFormatter
        },{
          dataField: 'cardPrice',
          text: 'Card Price',
          formatter: currencyFormatter
        }
      ]);
    }

    if(role === 'ADMIN') {
      columns = columns.concat([
      {
        dataField: 'listPrice',
        text: 'List Price',
        formatter: currencyFormatter
      },
      {
        dataField: 'utility',
        text: 'Utility',
        formatter: percentageFormatter
      },
      {
        dataField: 'dolar',
        text: 'Dolar Price',
        formatter: currencyFormatter
      },
      {
        dataField: 'vat',
        text: 'V.A.T.',
        formatter: percentageFormatter
      },
      {
        dataField: 'transport',
        text: 'Transport',
        formatter: percentageFormatter
      },
      {
        dataField: 'card',
        text: 'Card',
        formatter: percentageFormatter
      }]);
    }

    columns.push({
      dataField: 'actions',
      text: 'Actions',
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