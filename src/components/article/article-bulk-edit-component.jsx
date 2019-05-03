import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector, change, submit, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import { SwitchableInputComponent } from '../../components/switchable-input/switchable-input'
import { PercentageInput, CurrencyInput, CodeInput, textarea, DiscountTableField } from '../inputs/inputs';
import { required } from '../inputs/validators';
import { get, isEqual, pick } from 'lodash';
import CategorySelect from '../category/category-select';
import DiscountTableContainer from '../../containers/discounts/discount-table-container';
import { Link } from 'react-router-dom';
 
class ArticleBulkEditComponent extends Component{
  constructor() {
    super();
  }

  render(){
    return(
      <div id="article-bulk-edit-component" className="container-fluid">
        <CodeInput
            name="from"
        ></CodeInput>

        <CodeInput
            name="to"
        ></CodeInput>

        <Field 
            className="form-control" 
            component={textarea} 
            rows="4" 
            type="text" 
            name="fields.description" 
            placeholder="Enter a description..." 
            validate={required}
        />
      </div>
    );
  }
}

export default connect(
  (state, ownProps) => {
    return {
      initialValues: ownProps.initialValues || {
      },
    }
  },
  null
  )(reduxForm({
    form: 'articleBulkEditForm',
  })(ArticleBulkEditComponent))