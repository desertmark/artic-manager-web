import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import ArticleFormComponent from '../../components/article/article-form-component';
import { getArticle, createArticle, editArticle } from '../../redux/articles/articles-actions';
import { withRouter } from "react-router";
import { apiArticleToVmArticle } from '../../util/util';

class ArticleFormContainer extends Component{
  constructor() {
    super();
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    const { articleId } = this.props;
    if(articleId) {
      this.props.getArticle(articleId);
    }
  }

  save(values) {
    let operation;
    if (values._id) {
      operation = this.props.editArticle(values);
    } else {
      operation = this.props.createArticle(values);
    }
    operation.then(() => {
      // this.props.history.push('/articles');
    });
  }

  render(){
    const { loading, error, article, articleId } = this.props;
    return(
      <div id="articles-form-container">
          {!loading && !error &&
            <ArticleFormComponent
              onSubmit={ this.save }
              initialValues={ article ? apiArticleToVmArticle(article) : article }
              mode={articleId ? 'view' : 'create'}
            >
            </ArticleFormComponent>
          }
      </div>
    );
  }
}

export default connect(
  state => ({
    article: state.articlesReducer.article,
    error: state.articlesReducer.error,
    loading: state.articlesReducer.loading
  }), // mapStateToProps
  dispatch => bindActionCreators({ getArticle, createArticle, editArticle }, dispatch) // mapDispatchToProps
)(withRouter(ArticleFormContainer))