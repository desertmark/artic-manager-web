import React from 'react'
import { Field } from 'redux-form';
import { min, max  } from './validators';
import { percentage, currency, code as codeNormalizer } from './normalizers';

const input = ({ input, type, placeholder, className, meta: { touched, error, warning } }) => (
  <div>
        <input {...input} placeholder={placeholder} type={type} className={className}/>
        {touched && (
            (error && <span className="text-danger">*{error}</span>) || 
            (warning && <span className="text-warning">{warning}</span>)
        )}
  </div>
);
// no point of using min validator if normalizer will remove the `-` symbol
export const PercentageInput = ({name, className, validate = [() => undefined], ...rest}) => 
    <Field 
        name={name} 
        component={input} 
        type="text"
        className={`form-control ${className}`}
        {...rest}
        validate={[max(100), ...validate]}
        normalize={percentage}
    />

export const CurrencyInput = ({name, className, validate = [() => undefined], ...rest}) => 
    <Field 
        name={name} 
        component={input} 
        type="text"
        className={`form-control ${className}`}
        {...rest}
        validate={[...validate]}
        normalize={currency}
    />

export const CodeInput = ({name, className, validate = [() => undefined], ...rest}) => 
    <Field 
        name={name} 
        component={input} 
        type="text"
        className={`form-control ${className}`}
        {...rest}
        validate={[...validate]}
        normalize={codeNormalizer}
    />