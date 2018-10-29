import React, { Component } from 'react';
import { bindActionCreators  } from 'redux';
import { connect } from 'react-redux';
import ArticleFormComponent from '../../components/article/article-form-component';

class ArticleFormContainer extends Component{
  constructor() {
    super();
    this.save = this.save.bind(this);
  }
  save(values) {
    console.log(values);
  }
  render(){
    return(
      <div id="articles-form-container">

          <ArticleFormComponent
            onSubmit={this.save}
          >
          </ArticleFormComponent>

      </div>
    );
  }
}

export default connect(
  state => ({

  }), // mapStateToProps
  dispatch => bindActionCreators({},dispatch) // mapDispatchToProps
)(ArticleFormContainer)