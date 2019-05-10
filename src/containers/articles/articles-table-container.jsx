import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { getArticles, deleteArticle, bulkEditArticles } from '../../redux/articles/articles-actions'
import ModalComponent from '../../components/modal/modal-component';
import { textFilter, customFilter } from 'react-bootstrap-table2-filter';
import TableComponent from '../../components/table/table-component';
import CodeFilter from '../../components/table/code-filter';
import { get } from 'lodash';
import { codeFormatter, currencyFormatter, percentageFormatter } from '../../util/articles-formatters';
import ConfirmComponent from '../../components/confirm/confirm-component';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import ArticleBulkEditComponent from '../../components/article/article-bulk-edit-component';
class ArticlesTableContainer extends Component{
  constructor() {
    super();
    this.getColumns = this.getColumns.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.bulkEdit = this.bulkEdit.bind(this);
    this.articleAboutToDelete = null;
    this.viewArticle = this.viewArticle.bind(this);
    this.tableRef = React.createRef();
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
      dataField: 'codeString',
      text: 'Code',
      delay: 1000,
      filter: customFilter(),
      filterRenderer:(onFilter, column) =>
        <CodeFilter onFilter={ onFilter } column={ column } />,
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
          formatter: currencyFormatter,
          classes: 'text-success'
        },{
          dataField: 'cardPrice',
          text: 'Card Price',
          formatter: currencyFormatter,
          classes: 'text-danger'
        }
      ]);
    }

    if(role === 'ADMIN') {
      columns = columns.concat([
      {
        dataField: 'listPrice',
        text: 'List Price',
        formatter: currencyFormatter,
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

    if(role) {
      columns.push({
        dataField: 'actions',
        text: 'Actions',
      });
    }

    return columns;
  }

  handleTableChange(type, params, filters) {
    this.props.getArticles(params, filters);
  }
  
  confirmDelete(article) {
    this.articleAboutToDelete = article;
  }

  deleteArticle() {
    this.props.deleteArticle(this.articleAboutToDelete);
    this.articleAboutToDelete = null;
  }

  viewArticle(article) {
    this.props.history.push(`/articles/${article._id}` );
  }

  bulkEdit(values) {
    this.props.bulkEditArticles(values);
  }

  render(){
    const { pagination, articles, isEmpty } = this.props;
    return(
        <div className="container-fluid">
            <div className="card border mb-3">
              <div className="card-header border">List of articles</div>
              <div className="card-body text">
                <div className="mb-2">
                <Link to="/articles/create" className="btn btn-success mr-2">
                  <i className="fas fa-plus pr-1"></i>
                  New Article
                </Link>
                <button className="btn btn-info mr-2" data-target="#bulk-edit-modal" data-toggle="modal">
                  <i className="fa fa-edit pr-1" ></i>
                  Bulk Edit
                </button>
                </div>
                <TableComponent
                  ref={ this.tableRef }
                  columns={ this.getColumns() }
                  pagination={ pagination }
                  data={ articles }
                  onView= { this.viewArticle }
                  onDelete={ this.confirmDelete }
                  deleteConfirmModalName="delete-article"
                  handleTableChange={ this.handleTableChange }
                  isEmpty = { isEmpty }
                >
                </TableComponent>
              </div>
            </div>
            <ConfirmComponent 
              name="delete-article"
              title="Delete Article"
              body="Are you sure you want to delete this article?"
              onAccept={ this.deleteArticle }
              onCancel={ () => console.log('cancel') }
            />
            <ModalComponent 
              name="bulk-edit-modal"
              title="Bulk Edit"
            >
              <ArticleBulkEditComponent
                onSubmit={this.bulkEdit}
              ></ArticleBulkEditComponent>
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
  dispatch => bindActionCreators({ getArticles, deleteArticle, bulkEditArticles }, dispatch) // mapDispatchToProps
)(withRouter(ArticlesTableContainer))