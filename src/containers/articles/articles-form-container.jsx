import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import ArticleFormComponent from '../../components/article/article-form-component';
import { getArticle } from '../../redux/articles/articles-actions';

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
    console.log(values);
  }
  render(){
    const { loading, error, article, mode, articleId } = this.props;
    return(
      <div id="articles-form-container">
          {!loading && !error &&
            <ArticleFormComponent
              onSubmit={ this.save }
              initialValues={ article }
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
  dispatch => bindActionCreators({ getArticle }, dispatch) // mapDispatchToProps
)(ArticleFormContainer)