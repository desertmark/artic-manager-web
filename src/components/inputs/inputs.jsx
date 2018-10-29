import React from 'react'
import { Field } from 'redux-form';
import { min, max } from './validators';

export const PercentageInput = ({name, classes, ...rest}) => 
    <Field 
        name={name} 
        component="input" 
        type="number"
        className={`form-control ${classes}`} 
        {...rest}
    />