import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { connect } from 'react-redux';
import { SwitchableInputComponent } from '../../components/switchable-input/switchable-input'
import { PercentageInput, CurrencyInput, CodeInput } from '../inputs/inputs';
import { required } from '../inputs/validators';
import { calculateCost, calculatePrice, calculateCardPrice } from '../../util/util';
import { get } from 'lodash';
import CategorySelect from '../category/category-select';
import DiscountTableContainer from '../../containers/discounts/discount-table-container';

class ArticleFormComponent extends Component{
  constructor() {
    super();
    this.updateCost = this.updateCost.bind(this);
    this.updateCalculatedValues = this.updateCalculatedValues.bind(this);
    this.isEdit = this.isEdit.bind(this);
    this.isCreate = this.isCreate.bind(this);
    this.isView = this.isView.bind(this);
  }

  updateCost(formData) {
    const { listPrice, vat } = formData;
    this.props.changeFieldValue('cost', calculateCost(listPrice, vat))
  }

  updatePrice(formData) {
    const { cost, utility, transport } = formData;
    this.props.changeFieldValue('price', calculatePrice(cost, utility, transport))
  }

  updateCardPrice(formData) {
    const { price, card } = formData;
    this.props.changeFieldValue('cardPrice', calculateCardPrice(price, card));
  }

  updateCalculatedValues(formData) {
    this.updatePrice(formData);
    this.updateCost(formData);
    this.updateCardPrice(formData);
  }

  componentWillUpdate(nextProps) {
    this.updateCalculatedValues(nextProps.formData);
  }

  isEdit() {
    return this.props.mode.toLowerCase() === 'edit';
  }

  isCreate() {
    return this.props.mode.toLowerCase() === 'create';
  }

  isView() {
    return this.props.mode.toLowerCase() === 'view';
  }
  render(){
    const { formData } = this.props;
    return(
      <div id="article-form-component" className="container-fluid">
        <div className="card border mb-3">
          <div className="card-header border">Article's Form</div>
          <div className="card-body text">
            <form onSubmit={this.props.handleSubmit} >
            {/* ROW 1 */}
              <div className="form-row">
                <div className="form-group col">
                  <label className="text-secondary">Code</label>
                  <SwitchableInputComponent edit={this.isEdit() || this.isCreate()} value={formData.code} >
                    <CodeInput name="code" placeholder="00.00.00.00" validate={[required]} />
                  </SwitchableInputComponent>
                </div>
                <div className="form-group col">
                  <label className="text-secondary">List Price</label>
                  <SwitchableInputComponent edit={this.isEdit() || this.isCreate()} value={formData.listPrice} >
                    <CurrencyInput name="listPrice" placeholder="0" validate={[required]} />
                  </SwitchableInputComponent>
                </div>
                <div className="form-group col">
                  <label className="text-secondary">Utility</label>
                  <SwitchableInputComponent edit={this.isEdit() || this.isCreate()} value={formData.utility} >
                    <PercentageInput name="utility" placeholder="0" validate={[required]} />
                  </SwitchableInputComponent>
                </div> 
              </div>
            
            {/* ROW 2 */}
              <div className="form-row">
                <div className="form-group col">
                  <label className="text-secondary">Cost</label>
                  <SwitchableInputComponent edit={this.isEdit() || this.isCreate()} value={formData.cost} >
                    <CurrencyInput name="cost" placeholder="0" readOnly />
                  </SwitchableInputComponent>
                </div>

                <div className="form-group col">
                  <label className="text-secondary">Price</label>
                  <SwitchableInputComponent edit={this.isEdit() || this.isCreate()} value={formData.price} >
                    <CurrencyInput name="price" placeholder="0" readOnly />
                  </SwitchableInputComponent>
                </div>

                <div className="form-group col">
                  <label className="text-secondary">Card Price</label>
                  <SwitchableInputComponent edit={this.isEdit() || this.isCreate()} value={formData.cardPrice} >
                    <CurrencyInput name="cardPrice" placeholder="0" readOnly />
                  </SwitchableInputComponent>
                </div>
              </div>
            
            {/* ROW 3 */}
              <div className="form-row">
                <div className="form-group col-4">
                  <label className="text-secondary">Category</label>
                  <CategorySelect 
                    selected={get(formData,'category.description')}
                    placeholder="Select category"
                    onSelect={category => this.props.changeFieldValue('category', category)}
                  />
                </div>
              </div>
            
            {/* ROW 4 */}
              <div className="form-row">
                <label className="text-secondary">Description</label>
                <SwitchableInputComponent edit={this.isEdit() || this.isCreate()} value={formData.description} >
                  <Field className="form-control" component="textarea" rows="4" type="text" name="description" placeholder="Enter a description..." />
                </SwitchableInputComponent>
              </div>
            
            {/* ROW 5 */}
              <div className="form-row">
                <div className="form-group col">
                  <label className="text-secondary">Value added tax</label>
                  <SwitchableInputComponent edit={this.isEdit() || this.isCreate()} value={formData.vat} >
                    <PercentageInput name="vat" />
                  </SwitchableInputComponent>
                </div> 
                <div className="form-group col">
                  <label className="text-secondary">Transport</label>
                  <SwitchableInputComponent edit={this.isEdit() || this.isCreate()} value={formData.transport} >
                    <PercentageInput name="transport" />
                  </SwitchableInputComponent>
                </div> 
                <div className="form-group col">
                  <label className="text-secondary">Card</label>
                  <SwitchableInputComponent edit={this.isEdit() || this.isCreate()} value={formData.card} >
                    <PercentageInput name="card" />
                  </SwitchableInputComponent>
                </div> 
              </div>
              <h3>Discount List</h3>
              <DiscountTableContainer/>
            </form>
            <pre>{JSON.stringify(this.props.formData, null, 2)}</pre>
          </div>
          </div>
      </div>
    );
  }
}
const selector = formValueSelector('articleForm');

export default connect(
  (state, ownProps) => {
    return {
      initialValues: ownProps.initialValues || {
        vat: 21, 
        transport: 14, 
        card: 23,
        cost: 0,
        price: 0,
        cardPrice: 0,
        listPrice: 0,
        category: null
      },
      formData: selector(state, 'code', 'listPrice', 'utility', 'price', 'description','transport', 'vat', 'card', 'cardPrice', 'cost', 'category'),

    }
  },
  dispatch => ({
    changeFieldValue: (field, value) => {
      dispatch(change('articleForm', field, value))
    },
  }))(reduxForm({
    form: 'articleForm',
  })(ArticleFormComponent))