import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { getArticles, deleteArticle, bulkEditArticles, fileEditArticles, getUpdateStatus } from '../../redux/articles/articles-actions'
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
import  FileFormComponent from '../../components/file-form/file-form-component';
class ArticlesTableContainer extends Component{
  constructor() {
    super();
    this.state = {
      bulkEditOpen: false,
      columns: null,
      intervalId: undefined,
      longPollingStarted: false
    }
    this.getColumns = this.getColumns.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.bulkEdit = this.bulkEdit.bind(this);
    this.fileEdit = this.fileEdit.bind(this);
    this.articleAboutToDelete = null;
    this.viewArticle = this.viewArticle.bind(this);
    this.startLongPolling = this.startLongPolling.bind(this);
    this.handleLongPolling = this.handleLongPolling.bind(this);
    this.tableRef = React.createRef();
  }

  isAdmin() {
    const role = get(this.props.currentUser,'role');
    return role === 'ADMIN';
  }

  isUser() {
    const role = get(this.props.currentUser,'role');
    return role === 'USER' || role === 'ADMIN';
  }

  componentWillMount() {
    const columns = this.getColumns();
    this.setState({ columns });
    this.props.getArticles();
  }

  componentDidUpdate() {
    this.handleLongPolling();
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

    if (this.isUser()) {
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

    if(this.isAdmin()) {
      columns = columns.concat([
      {
        dataField: 'listPrice',
        text: 'List Price',
        formatter: currencyFormatter,
      },
      {
        dataField: 'utility',
        text: 'Utility',
        formatter: percentageFormatter,
        classes: 'd-md-none d-lg-table-cell',
        headerClasses: 'd-md-none d-lg-table-cell'
      },
      {
        dataField: 'dolar',
        text: 'Dolar Price',
        formatter: currencyFormatter,
        classes: 'd-md-none d-lg-table-cell',
        headerClasses: 'd-md-none d-lg-table-cell'
      },
      {
        dataField: 'vat',
        text: 'V.A.T.',
        formatter: percentageFormatter,
        classes: 'd-md-none d-xl-table-cell',
        headerClasses: 'd-md-none d-xl-table-cell'
      },
      {
        dataField: 'transport',
        text: 'Transport',
        formatter: percentageFormatter,
        classes: 'd-md-none d-xl-table-cell',
        headerClasses: 'd-md-none d-xl-table-cell'
      },
      {
        dataField: 'card',
        text: 'Card',
        formatter: percentageFormatter,
        classes: 'd-md-none d-xl-table-cell',
        headerClasses: 'd-md-none d-xl-table-cell'
      }]);
    }

    if(this.isUser()) {
      columns.push({
        dataField: 'actions',
        text: 'Actions',
      });
    }

    return columns;
  }

  handleTableChange(type, params, filters) {
    console.log(this.state.codeFilter);
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
    this.setState({ bulkEditOpen: false });
    this.props.bulkEditArticles(values)
      .then(this.props.getArticles);
  }

  fileEdit(values) {
    const file = get(values,'bulk',[])[0];
    this.props.fileEditArticles(file).then(() => {
      setTimeout(() => this.startLongPolling(), 3000  )
    });
  }

  startLongPolling() {
    const intervalId = setInterval(() => {
      console.log('Polling...')
      if (!this.props.loadingUpdateStatus) {
        this.props.getUpdateStatus().then(() => {
          this.setState({ longPollingStarted: true });
        });
      }
    }, 1000);
    this.setState({ intervalId });
  }

  handleLongPolling() {
    if (this.state.longPollingStarted && !this.props.updateStatus.inProgress) {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: undefined, longPollingStarted: false });
    }
  }

  render(){
    const { pagination, articles, isEmpty } = this.props;
    return(
        <div className="container-fluid">
            <div className="card border mb-3">
              <div className="card-header border">List of articles</div>
              <div className="card-body text">
                {
                  this.isAdmin() &&
                  <div className="mb-2">
                    <Link to="/articles/create" className="btn btn-success mr-2">
                      <i className="fas fa-plus pr-1"></i>
                      New Article
                    </Link>
                    <button className="btn btn-info mr-2" onClick={() => this.setState({bulkEditOpen: true})}>
                      <i className="fa fa-edit pr-1" ></i>
                      Bulk Edit
                    </button>
                    {
                      !this.props.updateStatus.inProgress && 
                      <FileFormComponent fieldName="bulk"onSubmit={this.fileEdit}></FileFormComponent>
                    }
                    <pre>
                      {JSON.stringify(this.props.updateStatus, null, 2)}
                    </pre>
                  </div>
                }
                <TableComponent
                  ref={ this.tableRef }
                  columns={ this.state.columns }
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
              isOpen={this.state.bulkEditOpen}
            >
              <ArticleBulkEditComponent
                onSubmit={this.bulkEdit}
                onCancel={() => this.setState({ bulkEditOpen: false })}
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
    updateStatus: state.articlesReducer.updateStatus,
    loadingUpdateStatus: state.articlesReducer.loadingUpdateStatus,
  }), // mapStateToProps
  dispatch => bindActionCreators({ getArticles, deleteArticle, bulkEditArticles, fileEditArticles, getUpdateStatus }, dispatch) // mapDispatchToProps
)(withRouter(ArticlesTableContainer))