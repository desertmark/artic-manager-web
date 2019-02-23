import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector, change, submit } from 'redux-form';
import { connect } from 'react-redux';
import { SwitchableInputComponent } from '../../components/switchable-input/switchable-input'
import { PercentageInput, CurrencyInput, CodeInput, textarea } from '../inputs/inputs';
import { required } from '../inputs/validators';
import { calculateCost, calculatePrice, calculateCardPrice } from '../../util/util';
import { get, isEqual } from 'lodash';
import CategorySelect from '../category/category-select';
import DiscountTableContainer from '../../containers/discounts/discount-table-container';
import { Link } from 'react-router-dom';


class ArticleFormComponent extends Component{
  constructor() {
    super();
    this.formRef = React.createRef();
    this.updateCost = this.updateCost.bind(this);
    this.updateCalculatedValues = this.updateCalculatedValues.bind(this);
    this.isEdit = this.isEdit.bind(this);
    this.isCreate = this.isCreate.bind(this);
    this.isView = this.isView.bind(this);
    this.addDiscount = this.addDiscount.bind(this);
    this.deleteDiscount = this.deleteDiscount.bind(this);
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

  addDiscount(discount) {
    this.props.formData.discounts.push(discount);
    this.props.changeFieldValue('discounts', this.props.formData.discounts);
  }

  deleteDiscount(discount) {
    this.props.changeFieldValue('discounts', this.props.formData.discounts.filter(d => !isEqual(d, discount)));
  }


  render(){
    const { formData } = this.props;
    return(
      <div id="article-form-component" className="container-fluid">
        <div className="card border mb-3">
          <div className="card-header border">Article's Form</div>
          <div className="card-body text">
            <form ref={this.formRef} onSubmit={this.props.handleSubmit} >
            {/* ROW 1 */}
              <div className="form-row">
                <div className="form-group col">
                  <label className="text-secondary">Code</label>
                  <SwitchableInputComponent edit={this.isEdit() || this.isCreate()} value={formData.codeString} >
                    <CodeInput name="codeString" placeholder="00.00.00.00" validate={[required]} />
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
                    name="category"
                    selected={get(formData,'category.description')}
                    placeholder="Select category"
                    onSelect={category => this.props.changeFieldValue('category', category)}
                    validate={required}
                  />
                </div>
              </div>
            
            {/* ROW 4 */}
              <div className="form-row">
                <label className="text-secondary">Description</label>
                <SwitchableInputComponent edit={this.isEdit() || this.isCreate()} value={formData.description} >
                  <Field 
                    className="form-control" 
                    component={textarea} 
                    rows="4" 
                    type="text" 
                    name="description" 
                    placeholder="Enter a description..." 
                    validate={required}
                  />
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
            </form>
            <h3>Discount List</h3>
            <DiscountTableContainer
              discounts={formData.discounts}
              onAdd={this.addDiscount}
              onDelete={this.deleteDiscount}
            />
          </div>
          <div className="card-footer text-right">
            <div className="row">
              <div className="col"><button type="button" onClick={this.props.submit} className="btn btn-primary btn-block m-2">Save</button></div>
              <div className="col"><Link to="/articles"className="btn btn-default btn-block m-2">Cancel</Link></div>
            </div>
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
        category: null,
        discounts: []
      },
      formData: selector(state, 'codeString', 'listPrice', 'utility', 'price', 'description','transport', 'vat', 'card', 'cardPrice', 'cost', 'category', 'discounts'),
    }
  },
  dispatch => ({
    changeFieldValue: (field, value) => {
      dispatch(change('articleForm', field, value))
    },
  }))(reduxForm({
    form: 'articleForm',
  })(ArticleFormComponent))