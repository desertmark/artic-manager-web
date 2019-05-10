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
    const { handleSubmit } = this.props;
    return(
      <div id="article-bulk-edit-component" className="container-fluid">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col">
              <label className="text-secondary font-weight-light">Code Start</label>
              <CodeInput
                  name="from"
                  placeholder="00.00.00.00"
              ></CodeInput>
            </div>
            <div className="form-group col">
              <label className="text-secondary font-weight-light">Code End</label>
              <CodeInput
                  name="to"
                  placeholder="00.00.00.00"
              ></CodeInput>
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label className="text-secondary font-weight-light">Description</label>
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
          </div>

          <div className="row">
            <div className="col">
              <button type="submit" data-target="#bulk-edit-modal" data-toggle="modal" className="btn btn-block btn-primary">Edit</button>
            </div>
            <div className="col">
              <button data-dismiss="modal" type="button" className="btn btn-block btn-default">Cancel</button>
            </div>
          </div>
        </form>
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