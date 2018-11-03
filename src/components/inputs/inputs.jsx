import React from 'react'
import { Field } from 'redux-form';
import { min, max } from './validators';
import {required} from './validators';

export const PercentageInput = ({name, className, ...rest}) => 
    <Field 
        name={name} 
        component={input} 
        type="number"
        className={`form-control ${className}`}
        {...rest}
        validate={[required, max(100), min(0)]}
    />

const input = ({ input, label, type, className, meta: { touched, error, warning } }) => (
  <div>
      <input {...input} placeholder={label} type={type} className={className}/>
      {touched && ((error && <span className="text-danger">*{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
  </div>
)