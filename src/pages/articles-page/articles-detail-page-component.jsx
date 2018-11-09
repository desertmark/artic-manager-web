import React, { Component } from 'react';
import ArticlesFormContainer from '../../containers/articles/articles-form-container';

class ArticlesDetailsPageComponent extends Component{

  render(){
    const { id } = this.props.computedMatch.params;
    return(
      <div id="articles-details-page-component">
        <div className="jumbotron">
          <h2 className="display-4">Articles</h2>
          <p className="lead">Article's details</p>
        </div>
        <ArticlesFormContainer
          articleId={id}
        ></ArticlesFormContainer>
      </div>
    );
  }
}

export default ArticlesDetailsPageComponent;