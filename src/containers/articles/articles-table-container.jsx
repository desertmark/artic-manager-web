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

class ArticlesTableContainer extends Component{
  constructor() {
    super();
    this.getData = this.getData.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
  }

  componentWillMount() {
    this.props.getArticles()
  }

  getData() {
    return this.props.articles.length === 0 ?  
    [] :
    this.props.articles.map(art => {
      art.actions = [
        <button key='delete' className="btn btn-outline-danger btn-block">
            <i className="fa fa-trash"></i>
        </button>
      ];
      return art;
    })
  }

  handleTableChange(type, { page, sizePerPage, filters }) {
    this.props.getArticles(toApiParams({ page, sizePerPage }), toApiFilter(filters));
  }
  
  render(){
    const { page, sizePerPage, totalSize } = this.props.pagination;
    const { loading } = this.props;
    return(
        <div className="container-fluid">
            <div className="card border mb-3">
              <div className="card-header border">List of articles</div>
              <div className="card-body text">
                <button data-target="" data-toggle="modal" className="btn btn-success mb-2">
                  <i className="fas fa-plus pr-1"></i>
                  Add
                </button>
                <BootstrapTable
                  remote
                  keyField='_id' 
                  data={this.getData()} 
                  striped hover bootstrap4
                  pagination={ paginationFactory( toTablePagination({page, sizePerPage, totalSize}) ) }
                  filter={ filterFactory() }
                  noDataIndication={() => 
                    <div className="d-flex justify-content-center">
                      <Spinner color="success"/>
                    </div>
                  }
                  onTableChange={ this.handleTableChange }
                  columns={[{
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
                  }]}>
                </BootstrapTable>
                
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
    loading: state.articlesReducer.loading
  }), // mapStateToProps
  dispatch => bindActionCreators({ getArticles }, dispatch) // mapDispatchToProps
)(ArticlesTableContainer)