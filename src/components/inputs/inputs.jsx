import React from 'react'
import { Field } from 'redux-form';
import { min, max  } from './validators';
import { percentage, currency, code as codeNormalizer } from './normalizers';

const input = ({ input, type, placeholder,readOnly, className, append, prepend, meta: { touched, error, warning } }) => (
  <div>
      <div className={(append || prepend) ? 'input-group' : ''}>
        { prepend &&
        <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{prepend}</span>
        </div>
        }
        <input {...input} readOnly={readOnly} placeholder={placeholder} type={type} className={className}/>
        { append && 
        <div class="input-group-append">
            <span class="input-group-text" >{append}</span>
        </div>
        }        
        </div>
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
            type="number"
            className={`form-control ${className}`}
            append="%"
            {...rest}
            validate={[min(0), max(100), ...validate]}
        />


export const CurrencyInput = ({name, className, validate = [() => undefined], ...rest}) => 
    <Field 
        name={name} 
        component={input} 
        type="number"
        className={`form-control ${className}`}
        prepend="$"
        {...rest}
        validate={[min(0), ...validate]}
        
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