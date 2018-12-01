import React, { Component } from 'react';
import { reduxForm, formValueSelector, Field, reset } from 'redux-form';
import { PercentageInput, textarea } from '../inputs/inputs';
import { required } from '../inputs/validators';
import { SwitchableInputComponent } from '../../components/switchable-input/switchable-input';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { bindActionCreators } from '../../../../../AppData/Local/Microsoft/TypeScript/3.1/node_modules/redux';

class DiscountFormComponent extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
    }

    submit(e) {
        this.props.handleSubmit(e);
        this.props.resetForm();
    }

    render() {
        const { formData } = this.props;
        return <div id="discount-form-component">
            <form onSubmit={this.submit}>
                <div className="form-row">
                    <div className="form-group col">
                        <label className="text-secondary">Amount</label>
                        <SwitchableInputComponent edit={true} value={formData.amount} >
                            <PercentageInput name="amount" placeholder="0" validate={[required]}/>
                        </SwitchableInputComponent>
                    </div>
                </div>

                <div className="form-row">
                    <label className="text-secondary">Description</label>
                    <SwitchableInputComponent edit={true} value={formData.description} >
                        <Field component={textarea} rows="2" type="text" name="description" placeholder="Enter a description..." validate={required} />
                    </SwitchableInputComponent>
                </div>

                <div className="form-row">
                    <div className="col text-right">
                        <button type="submit" data-target="#add-discount-modal" data-toggle="modal" className="btn btn-primary mt-3 mr-2">Save</button>
                        <button type="button" data-target="#add-discount-modal" data-toggle="modal" className="btn btn-default mt-3">Cancel</button>
                    </div>                    
                </div>
            </form>
        </div>
    }
}
const selector = formValueSelector('discountForm');
const resetForm = () => reset('discountForm');
export default connect(
    (state, ownProps) => ({
        initialValues: ownProps.initialValues || {
            tempId: uuidv4(),
            amount:0,
            description: null
        },
        formData: selector(state, 'amount','description', '_id'),
    }),
    dispatch => bindActionCreators({resetForm}, dispatch)
)(reduxForm({
    form: 'discountForm'
})(DiscountFormComponent));