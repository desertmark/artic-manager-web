import React from 'react';
import { Field, reduxForm, formValueSelector, change, submit, FieldArray } from 'redux-form';
import { FileField } from '../inputs/inputs';

class FileFormComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
        <form onSubmit={this.props.handleSubmit}>
            <FileField name={this.props.fieldName || 'file'}></FileField>
            <button className="btn btn-primary mt-2" type="submit"> upload</button>
        </form>
        )
    }
}

export default reduxForm({
    form: 'fileForm',
})(FileFormComponent)