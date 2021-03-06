import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getArticles, deleteArticle, bulkEditArticles, fileEditArticles, getUpdateStatus, stopLongPolling } from '../../redux/articles/articles-actions'
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
import FileFormComponent from '../../components/file-form/file-form-component';
import ProgressBarComponent from '../../components/progress-bar/progress-bar-component';
import { Spinner } from '../../components/spinner/spinner';
import { ARTICLES_FILTER_DELAY } from '../../redux/articles/articles-constants';
class ArticlesTableContainer extends Component {
  constructor() {
    super();
    this.state = {
      bulkEditOpen: false,
      columns: null,
      intervalId: undefined,
      longPollingStarted: false,
      waitingForProgressInfo: false,
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
    this.stopLongPolling = this.stopLongPolling.bind(this);
    this.tableRef = React.createRef();
  }

  isAdmin() {
    const role = get(this.props.currentUser, 'role');
    return role === 'ADMIN';
  }

  isUser() {
    const role = get(this.props.currentUser, 'role');
    return role === 'USER' || role === 'ADMIN';
  }

  componentWillMount() {
    const columns = this.getColumns();
    this.setState({ columns });
    this.props.getArticles();
    this.startLongPolling();
  }

  componentWillUnmount() {
    this.stopLongPolling();
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
      filter: customFilter({ delay: ARTICLES_FILTER_DELAY }),
      filterRenderer: (onFilter, column) =>
        <CodeFilter onFilter={onFilter} column={column} />,
      formatter: codeFormatter,
      sort: true,
      onSort: this.sort.bind(this),
    },
    {
      dataField: 'description',
      text: 'Description',
      filter: textFilter({ delay: ARTICLES_FILTER_DELAY }),
      sort: true,
      onSort: this.sort.bind(this),
    },
    {
      dataField: 'category.description',
      text: 'Category',
      filter: textFilter({ delay: ARTICLES_FILTER_DELAY }),
    }];

    if (this.isUser()) {
      columns = columns.concat([
        {
          dataField: 'price',
          text: 'Price',
          formatter: currencyFormatter,
          classes: 'text-success',
          sort: true,
          onSort: this.sort.bind(this),
        }, {
          dataField: 'cardPrice',
          text: 'Card Price',
          formatter: currencyFormatter,
          classes: 'text-danger',
          sort: true,
          onSort: this.sort.bind(this),
        }
      ]);
    }

    if (this.isAdmin()) {
      columns = columns.concat([
        {
          dataField: 'listPrice',
          text: 'List Price',
          formatter: currencyFormatter,
          sort: true,
          onSort: this.sort.bind(this),
        },
        {
          dataField: 'utility',
          text: 'Utility',
          formatter: percentageFormatter,
          classes: 'd-md-none d-lg-table-cell',
          headerClasses: 'd-md-none d-lg-table-cell',
          sort: true,
          onSort: this.sort.bind(this),
        },
        {
          dataField: 'dolar',
          text: 'Dolar Price',
          formatter: currencyFormatter,
          classes: 'd-md-none d-lg-table-cell',
          headerClasses: 'd-md-none d-lg-table-cell',
          sort: true,
          onSort: this.sort.bind(this),
        },
        {
          dataField: 'vat',
          text: 'V.A.T.',
          formatter: percentageFormatter,
          classes: 'd-md-none d-xl-table-cell',
          headerClasses: 'd-md-none d-xl-table-cell',
          sort: true,
          onSort: this.sort.bind(this),
        },
        {
          dataField: 'transport',
          text: 'Transport',
          formatter: percentageFormatter,
          classes: 'd-md-none d-xl-table-cell',
          headerClasses: 'd-md-none d-xl-table-cell',
          sort: true,
          onSort: this.sort.bind(this),
        },
        {
          dataField: 'card',
          text: 'Card',
          formatter: percentageFormatter,
          classes: 'd-md-none d-xl-table-cell',
          headerClasses: 'd-md-none d-xl-table-cell',
          sort: true,
          onSort: this.sort.bind(this),
        }]);
    }

    if (this.isAdmin()) {
      columns.push({
        dataField: 'actions',
        text: 'Actions',
      });
    }

    return columns;
  }

  handleTableChange(type, params, filters) {
    if (type!== 'sort') {
      this.props.getArticles(params, filters);
    }
  }

  confirmDelete(article) {
    this.articleAboutToDelete = article;
  }

  deleteArticle() {
    this.props.deleteArticle(this.articleAboutToDelete);
    this.articleAboutToDelete = null;
  }

  viewArticle(article) {
    this.props.history.push(`/articles/${article._id}`);
  }

  bulkEdit(values) {
    this.setState({ bulkEditOpen: false });
    this.props.bulkEditArticles(values)
      .then(this.props.getArticles);
  }

  fileEdit(values) {
    this.setState({ waitingForProgressInfo: true });
    const file = get(values, 'bulk', [])[0];
    this.props.fileEditArticles(file).then(() => {
      setTimeout(() => this.startLongPolling(), 3000)
    });
  }

  startLongPolling() {
    const intervalId = setInterval(() => {
      console.log('Polling...')
      if (!this.props.loadingUpdateStatus) {
        this.props.getUpdateStatus()
        .then(() => {
          this.setState({ longPollingStarted: true, waitingForProgressInfo: false });
        });
      }
    }, 1000);
    this.setState({ intervalId });
  }

  handleLongPolling() {
    if (
      (this.state.longPollingStarted && !this.props.updateStatus.inProgress) ||
      (this.props.updateStatus.error)
    ) {
      this.stopLongPolling();
    }
  }

  stopLongPolling() {
    clearInterval(this.state.intervalId);
    this.setState({ intervalId: undefined, longPollingStarted: false });
    this.props.stopLongPolling();
  }

  sort(field, order) {
    const { filters, pagination } = this.props;
    const params = {
      size: pagination.size,
      page: pagination.page,
      sort: `${field},${order}`,
    };
    this.props.getArticles(params, filters);
  }

  render() {
    const { pagination, articles, isEmpty, updateStatus, loadingUpdateStatus } = this.props;
    return (
      <div className="articles-table-container container-fluid">
        <div className="card border mb-3">
          <div className="card-header border">List of articles</div>
          <div className="card-body text">
            {
              this.isAdmin() &&
              <div>
                <div className="mb-2 row">
                  <div className="col d-md-flex">
                    <Link to="/articles/create" className="btn btn-success mr-2 mt-2">
                      <i className="fas fa-plus pr-1"></i>
                      New Article
                    </Link>
                    <button className="btn btn-info mr-2 mt-2" onClick={() => this.setState({ bulkEditOpen: true })}>
                      <i className="fa fa-edit pr-1" ></i>
                      Bulk Edit
                    </button>
                    {
                      !updateStatus.inProgress && !this.state.waitingForProgressInfo &&
                      <div className="mt-2">
                        <FileFormComponent fieldName="bulk" onSubmit={this.fileEdit}></FileFormComponent>
                      </div>
                    }
                    <div className="mt-2">
                      <Spinner loading={this.state.waitingForProgressInfo} color="warning"></Spinner>
                    </div>
                  </div>
                </div>
                {updateStatus.inProgress &&
                  <div className="row mb-2">
                    <div className="col">
                      <ProgressBarComponent currentValue={this.props.updateStatus.completed}></ProgressBarComponent>
                    </div>
                  </div>
                }
              </div>
            }
            <TableComponent
              ref={this.tableRef}
              columns={this.state.columns}
              pagination={pagination}
              data={articles}
              onView={this.viewArticle}
              onDelete={this.confirmDelete}
              deleteConfirmModalName="delete-article"
              handleTableChange={this.handleTableChange}
              isEmpty={isEmpty}
            >
            </TableComponent>
          </div>
        </div>
        <ConfirmComponent
          name="delete-article"
          title="Delete Article"
          body="Are you sure you want to delete this article?"
          onAccept={this.deleteArticle}
          onCancel={() => console.log('cancel')}
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
    filters: state.articlesReducer.filters,
    isEmpty: state.articlesReducer.isEmpty,
    currentUser: state.userReducer.currentUser,
    updateStatus: state.articlesReducer.updateStatus,
    loadingUpdateStatus: state.articlesReducer.loadingUpdateStatus,
    updateStatusError: state.articlesReducer.updateStatusError,
  }), // mapStateToProps
  dispatch => bindActionCreators({ getArticles, deleteArticle, bulkEditArticles, fileEditArticles, getUpdateStatus, stopLongPolling }, dispatch) // mapDispatchToProps
)(withRouter(ArticlesTableContainer))