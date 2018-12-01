import React, {Fragment} from 'react'
import { Field } from 'redux-form';
import { min, max  } from './validators';
import { percentage, currency, code as codeNormalizer } from './normalizers';

// Don't put min(0) or max(100) closures inside the validate property. this causes infinite loop rendering.
const min0 = min(0);
const max100 = max(100);

export const input = ({ input, type, placeholder,readOnly, className, append, prepend, meta: { touched, error, warning } }) => (
  <div>
      <div className={(append || prepend) ? 'input-group' : ''}>
        { prepend &&
        <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">{prepend}</span>
        </div>
        }
        <input {...input} readOnly={readOnly} placeholder={placeholder} type={type} className={className}/>
        { append && 
        <div className="input-group-append">
            <span className="input-group-text" >{append}</span>
        </div>
        }        
        </div>
        {touched && (
          (error && <span className="text-danger">*{error}</span>) || 
          (warning && <span className="text-warning">{warning}</span>)
        )}
  </div>
);

export const textarea = ({ input, type, placeholder,readOnly, className, meta: { touched, error, warning } }) => (
    <Fragment>
        <textarea className="form-control" {...input} readOnly={readOnly} placeholder={placeholder} type={type} ></textarea>
        {touched && (
          (error && <span className="text-danger">*{error}</span>) || 
          (warning && <span className="text-warning">{warning}</span>)
        )}
    </Fragment>
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
            validate={[min0, max100, ...validate]}
        />


export const CurrencyInput = ({name, className, validate = [() => undefined], ...rest}) => 
    <Field 
        name={name} 
        component={input} 
        type="number"
        className={`form-control ${className}`}
        prepend="$"
        {...rest}
        validate={[min0, ...validate]}
        
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