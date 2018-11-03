import React from 'react'
import { Field } from 'redux-form';
import { min, max, required } from './validators';
import { percentage, currency } from './normalizers';

const input = ({ input, type, placeholder, className, meta: { touched, error, warning } }) => (
  <div>
      <input {...input} placeholder={placeholder} type={type} className={className}/>
      {touched && ((error && <span className="text-danger">*{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
  </div>
);
export const PercentageInput = ({name, className, validate = [() => undefined], ...rest}) => 
    <Field 
        name={name} 
        component={input} 
        type="text"
        className={`form-control ${className}`}
        {...rest}
        validate={[max(100), min(0), ...validate]}
        normalize={percentage}
    />

export const CurrencyInput = ({name, className, validate = [() => undefined], ...rest}) => 
    <Field 
        name={name} 
        component={input} 
        type="text"
        className={`form-control ${className}`}
        {...rest}
        validate={[min(0), ...validate]}
        normalize={currency}
    />
