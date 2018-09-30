import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import { getArticles } from '../../redux/articles/articles-actions'
import ModalComponent from '../../components/modal/modal-component';
import ProfileFormComponent from '../../components/profile/profile-form-component';
import BootstrapTable from 'react-bootstrap-table-next';

class ArticlesTableContainer extends Component{
  constructor() {
    super();
    this.getData = this.getData.bind(this);
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
  
  render(){
    return(
        <div className="container-fluid">
            <div className="card border mb-3">
              <div className="card-header border">List of articles</div>
              <div className="card-body text">
                <button data-target="#add-user-modal" data-toggle="modal" className="btn btn-success mb-2">
                  <i className="fas fa-plus pr-1"></i>
                  Add
                </button>
                <BootstrapTable keyField='_id' data={this.getData()} striped hover bootstrap4 columns={[{
                    dataField: '_id',
                    text: 'ID'
                  }, 
                  {
                    dataField: 'code',
                    text: 'Code'
                  }, 
                  {
                    dataField: 'category.description',
                    text: 'Category'
                  }, 
                  {
                    dataField: 'description',
                    text: 'Description'
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
    articles: state.articlesReducer.articles
  }), // mapStateToProps
  dispatch => bindActionCreators({ getArticles }, dispatch) // mapDispatchToProps
)(ArticlesTableContainer)