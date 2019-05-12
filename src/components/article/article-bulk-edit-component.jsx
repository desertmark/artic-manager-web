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
import EditPriceComponent from '../article/edit-price-component';
class ArticleBulkEditComponent extends Component{
  constructor() {
    super();
    this.resetAbsolutePrice = this.resetAbsolutePrice.bind(this);
    this.resetPercentagePrice = this.resetPercentagePrice.bind(this);
  }

  resetAbsolutePrice() {
    this.props.changeFieldValue('fields.price', {});
  }

  resetPercentagePrice() {
    this.props.changeFieldValue('fields.price', {});
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
                  validate={[required]}
              ></CodeInput>
            </div>
            <div className="form-group col">
              <label className="text-secondary font-weight-light">Code End</label>
              <CodeInput
                  name="to"
                  placeholder="00.00.00.00"
                  validate={[required]}
              ></CodeInput>
            </div>
          </div>
          <div className="row">
            <div className="form-group col">
              <label className="text-secondary">Price</label>
              <div className="border rounded p-2">
                <EditPriceComponent
                  percentageName="fields.price.percentage"
                  absoluteName="fields.price.absolute"
                  onPercentage={this.resetAbsolutePrice}
                  onAbsolute={this.resetPercentagePrice}
                ></EditPriceComponent>
              </div>
            </div>
          </div>

        <div className="row">
          <div className="form-group col">
              <label className="text-secondary font-weight-light">V.A.T.</label>
              <PercentageInput name="fields.vat" placeholder="0" />
            </div>
            <div className="form-group col">
              <label className="text-secondary font-weight-light">Transport</label>
              <PercentageInput name="fields.transport" placeholder="0" />
            </div>
            <div className="form-group col">
              <label className="text-secondary font-weight-light">Card</label>
              <PercentageInput name="fields.card" placeholder="0" />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <button type="submit" className="btn btn-block btn-primary">Edit</button>
            </div>
            <div className="col">
              <button onClick={this.props.onCancel} type="button" className="btn btn-block btn-default">Cancel</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const selector = formValueSelector('articleBulkEditForm');

export default connect(
  (state, ownProps) => {
    return {
      initialValues: ownProps.initialValues || {
        fields: {
          vat: 21,
          transport: 14,
          card: 23
        },
      },
      formData: selector(state, 'fields.price')
    }
  },
  dispatch => ({
    changeFieldValue: (field, value) => {
      dispatch(change('articleBulkEditForm', field, value))
    },
  })
  )(reduxForm({
    form: 'articleBulkEditForm',
  })(ArticleBulkEditComponent))