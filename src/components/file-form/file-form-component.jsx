import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector, change, submit, FieldArray } from 'redux-form';
import { FileField } from '../inputs/inputs';

class FileFormComponent extends React.Component {
    constructor() {
        super();
    }

    get isDisabled() {
        return !(this.props.formData && this.props.formData.length)
    }

    render() {
        return (
            <form className="d-flex" onSubmit={this.props.handleSubmit}>
                <FileField name={this.props.fieldName || 'file'}></FileField>
                <button disabled={this.isDisabled} className="btn btn-primary ml-2" type="submit"> upload</button>
            </form>
        )
    }
}
const selector = formValueSelector('fileForm');
const form = reduxForm({ form: 'fileForm' })(FileFormComponent)
export default connect(
    (state, ownProps) => ({
        formData: selector(state, ownProps.fieldName || 'file')
    }),
    null
)(form);
