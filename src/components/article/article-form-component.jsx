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
 
class ArticleFormComponent extends Component{
  constructor() {
    super();
    this.state = {
      mode: 'view' 
    };
    this.formRef = React.createRef();
    this.isEdit = this.isEdit.bind(this);
    this.isCreate = this.isCreate.bind(this);
    this.isEditOrCreate = this.isEditOrCreate.bind(this);
    this.isView = this.isView.bind(this);
    this.addDiscount = this.addDiscount.bind(this);
    this.deleteDiscount = this.deleteDiscount.bind(this);
  }

  componentWillMount() {
    this.setState({mode: this.props.mode});
  }

  isEdit() {
    return this.state.mode.toLowerCase() === 'edit';
  }

  isCreate() {
    return this.state.mode.toLowerCase() === 'create';
  }

  isEditOrCreate() {
    return (this.isEdit() || this.isCreate());
  }

  isView() {
    return this.state.mode.toLowerCase() === 'view';
  }

  addDiscount(discount) {
    // clone array to trigger an update cycle.
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
          <div className="card-header border">
            <div className="row">
              <div className="text-left col">
                Article's Form
              </div>
              <div className="col text-right">
                <button onClick={() => this.setState({mode: 'edit'})}className="btn btn-outline-info">
                  <i className="fa fa-edit"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="card-body text">
            <form ref={this.formRef} onSubmit={this.props.handleSubmit} >
            {/* ROW 1 */}
              <div className="form-row">
                <div className="form-group col">
                  <label className="text-secondary font-weight-light">Code</label>
                  <SwitchableInputComponent edit={this.isEditOrCreate()} value={formData.codeString} >
                    <CodeInput name="codeString" placeholder="00.00.00.00" validate={[required]} />
                  </SwitchableInputComponent>
                </div>
                <div className="form-group col">
                  <label className="text-secondary font-weight-light">List Price</label>
                  <SwitchableInputComponent edit={this.isEditOrCreate()} value={formData.listPrice} >
                    <CurrencyInput name="listPrice" placeholder="0" validate={[required]} />
                  </SwitchableInputComponent>
                </div>
                <div className="form-group col">
                  <label className="text-secondary font-weight-light">Utility</label>
                  <SwitchableInputComponent edit={this.isEditOrCreate()} value={`${formData.utility}%`} >
                    <PercentageInput name="utility" placeholder="0" validate={[required]} />
                  </SwitchableInputComponent>
                </div> 
              </div>
            
            {/* ROW 2 */}
              <div className="form-row">
                <div className="form-group col">
                  <label className="text-secondary font-weight-light">Cost</label>
                  <SwitchableInputComponent edit={this.isEditOrCreate()} value={formData.cost} >
                    <CurrencyInput name="cost" placeholder="0" readOnly />
                  </SwitchableInputComponent>
                </div>

                <div className="form-group col">
                  <label className="text-secondary font-weight-light">Price</label>
                  <SwitchableInputComponent edit={this.isEditOrCreate()} value={formData.price} >
                    <CurrencyInput name="price" placeholder="0" readOnly />
                  </SwitchableInputComponent>
                </div>

                <div className="form-group col">
                  <label className="text-secondary font-weight-light">Card Price</label>
                  <SwitchableInputComponent edit={this.isEditOrCreate()} value={formData.cardPrice} >
                    <CurrencyInput name="cardPrice" placeholder="0" readOnly />
                  </SwitchableInputComponent>
                </div>
              </div>
            
            {/* ROW 3 */}
              <div className="form-row">
                <div className="form-group col-4">
                  <label className="text-secondary font-weight-light">Category</label>
                  <SwitchableInputComponent edit={this.isEditOrCreate()} value={get(formData,'category.description','')} >
                    <CategorySelect 
                      name="category"
                      selected={get(formData,'category.description')}
                      placeholder="Select category"
                      onSelect={category => this.props.changeFieldValue('category', category)}
                      validate={required}
                    />
                  </SwitchableInputComponent>
                </div>
              </div>
            
            {/* ROW 4 */}
              <div>
                <label className="text-secondary font-weight-light">Description</label>
                <SwitchableInputComponent edit={this.isEditOrCreate()} value={formData.description} >
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
                  <label className="text-secondary font-weight-light">Value added tax</label>
                  <SwitchableInputComponent edit={this.isEditOrCreate()} value={`${formData.vat}%`} >
                    <PercentageInput name="vat" />
                  </SwitchableInputComponent>
                </div> 
                <div className="form-group col">
                  <label className="text-secondary font-weight-light">Transport</label>
                  <SwitchableInputComponent edit={this.isEditOrCreate()} value={`${formData.transport}%`} >
                    <PercentageInput name="transport" />
                  </SwitchableInputComponent>
                </div> 
                <div className="form-group col">
                  <label className="text-secondary font-weight-light">Card</label>
                  <SwitchableInputComponent edit={this.isEditOrCreate()} value={`${formData.card}%`} >
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
              actions={this.isEditOrCreate()}
            />
            <DiscountTableField></DiscountTableField>
          </div>
          {this.isEditOrCreate() && 
            <div className="card-footer text-right">
              <div className="row">
                <div className="col"><button type="button" onClick={this.props.submit} className="btn btn-primary btn-block m-2">Save</button></div>
                <div className="col"><Link to="/articles"className="btn btn-default btn-block m-2">Cancel</Link></div>
              </div>
            </div>
          }
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