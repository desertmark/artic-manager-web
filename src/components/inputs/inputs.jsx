import React, {Fragment} from 'react'
import { Field, FieldArray } from 'redux-form';
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

export const fileInput = props => 
<input 
  {...props}
  type="file"
  onChange={e => {
    e.preventDefault();
    const file = Array.from(e.target.files);
    props.input.onChange(file);
  }}
/>

export class FileField extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "Select a file"
    }
  }

  render() {
    return (
      <div className="custom-file">
        <Field 
          name={this.props.name}
          onChange={e => this.setState({ value: e[0].name })}
          component={fileInput}
          type="file"
          className="custom-file-input"
        />
        <label className="custom-file-label" htmlFor="validatedCustomFile">{this.state.value}</label>
      </div>
    )
  }
}

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

export const TableField = ({ fields, columns }) => (
  <div className="d-none">
    {fields.map((field, fieldIndex) => (
      <div key={fieldIndex}>
      {field}
      {columns.map(({name, CustomComponent, type, component, ...options}, colIndex) => (
        <div key={colIndex}>
          {CustomComponent && 
            <CustomComponent
              name={`${field}.${name}`}
              {...options}
            ></CustomComponent>
          }
          {!CustomComponent && 
            <Field
              name={`${field}.${name}`}
              type={type}
              component={component}
            />}
        </div> 
      ))}
      </div>
    ))}
  </div>
)

export const DiscountTableField = () => (
  <FieldArray
    component={TableField}
    name="discounts"
    columns={[{
      name:'amount',
      CustomComponent: PercentageInput
    },
    {
      name:'description',
      type:'text',
      component:textarea
    }]}
  ></FieldArray>
)