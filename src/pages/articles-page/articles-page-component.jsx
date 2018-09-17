import React, { Component } from 'react';
import ArticlesTableContainer from '../../containers/articles/articles-table-container';

class ArticlesPageComponent extends Component{
  render(){
    return(
      <div id="articles-page-component">
        <div className="jumbotron">
          <h2 className="display-4">Articles</h2>
          <p className="lead">List of all the articles.</p>
        </div>
        <ArticlesTableContainer></ArticlesTableContainer>
      </div>
    );
  }
}

export default ArticlesPageComponent;