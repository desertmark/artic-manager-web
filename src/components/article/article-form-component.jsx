import React, { Component } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import {SwitchableInputComponent} from '../../components/switchable-input/switchable-input'
import SelectComponent from '../select/select-component';
import { PercentageInput } from '../inputs/inputs';
const required = value => (value || typeof value === "number" ? undefined : "Required")
const renderField = ({ input, label, type, className, meta: { touched, error, warning } }) => (
  <div>
      <input {...input} placeholder={label} type={type} className={className}/>
      {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
)


class ArticleFormComponent extends Component{

  render(){
    const { formData } = this.props;
    return(
      <div id="article-form-component" className="container-fluid">
        <div className="card border mb-3">
          <div className="card-header border">Article's Form</div>
          <div className="card-body text">
            <form onSubmit={this.props.handleSubmit} >
              <div className="form-row">
                <div className="form-group col">
                  <label className="text-secondary">Code</label>
                  <SwitchableInputComponent edit={true} value={formData.code} >
                    <Field name="code" component={renderField} type="text" className="form-control" placeholder="00.00.00.00" validate={[required]} />
                  </SwitchableInputComponent>
                </div>
                <div className="form-group col">
                  <label className="text-secondary">List Price</label>
                  <SwitchableInputComponent edit={true} value={formData.listPrice} >
                    <Field name="listPrice" component="input" type="number" className="form-control" placeholder="$0" />
                  </SwitchableInputComponent>
                </div>
                <div className="form-group col">
                  <label className="text-secondary">Utility</label>
                  <SwitchableInputComponent edit={true} value={formData.utility} >
                    <PercentageInput name="utility" placeholder="0%" />
                  </SwitchableInputComponent>
                </div> 
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label className="text-secondary">Description</label>
                  <SwitchableInputComponent edit={true} value={formData.description} >
                    <Field name="description" component="textarea" rows={3} className="form-control" placeholder="Enter a description..." />
                  </SwitchableInputComponent>
                </div> 
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <label className="text-secondary">Value added tax</label>
                  <SwitchableInputComponent edit={true} value={formData.vat} >
                    <Field name="vat" component="input" type="number" className="form-control" min={0} max={100} />
                  </SwitchableInputComponent>
                </div> 
                <div className="form-group col">
                  <label className="text-secondary">Transport</label>
                  <SwitchableInputComponent edit={true} value={formData.transport} >
                    <Field name="transport" component="input" type="number" className="form-control" min={0} max={100} />
                  </SwitchableInputComponent>
                </div> 
                <div className="form-group col">
                  <label className="text-secondary">Card</label>
                  <SwitchableInputComponent edit={true} value={formData.card} >
                    <Field name="card" component="input" type="number" className="form-control" min={0} max={100} />
                  </SwitchableInputComponent>
                </div> 
              </div>
            </form>
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
      initialValues: ownProps.initialValues || {vat: 21, transport: 14, card: 23},
      formData: selector(state, 'code', 'listPrice', 'utility', 'price', 'description','transport', 'vat', 'card')
    }
  },
  null)(reduxForm({
    form: 'articleForm',
  })(ArticleFormComponent))