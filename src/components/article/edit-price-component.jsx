import React, { Component } from 'react';
import { PercentageInput, CurrencyInput } from '../inputs/inputs';
const INPUT_TYPES = {
    Percentage: 'PERCENTAGE',
    Absolute: 'ABSOLUTE'
}
export default class EditPriceComponent extends Component {
    constructor() {
        super();
        this.state = {
            type: INPUT_TYPES.Percentage
        }
        this.onPercentage = this.onPercentage.bind(this);
        this.onAbsolute = this.onAbsolute.bind(this);
        this.isPercentage = this.isPercentage.bind(this);
        this.isAbsolute = this.isAbsolute.bind(this);
    }

    onPercentage() {
        this.setState({ type: INPUT_TYPES.Percentage });
        this.props.onPercentage ? this.props.onPercentage() : undefined;
    }

    onAbsolute() {
        this.setState({ type: INPUT_TYPES.Absolute });
        this.props.onAbsolute ? this.props.onAbsolute() : undefined;
    }

    isPercentage() {
        return this.state.type === INPUT_TYPES.Percentage;
    }

    isAbsolute() {
        return this.state.type === INPUT_TYPES.Absolute;
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <label className="text-secondary font-weight-light">Type of increase</label>
                </div>
                <div className="row">
                    <div className="col pl-0">
                        <div className="form-check">
                            <input onClick={this.onPercentage} type="radio" name="type" className="form-check-input" defaultChecked/>
                            <label className="form-check-label">Percentage</label>
                        </div>
                    </div>
                    <div className="col pl-0">
                        <div className="form-check">
                            <input onClick={this.onAbsolute} type="radio" name="type" className="form-check-input"/>
                            <label className="form-check-label">Absolute</label>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className={this.isPercentage() ? '': 'd-none'}>
                        <PercentageInput
                            name={this.props.percentageName}
                        ></PercentageInput>
                    </div>
                    <div className={this.isAbsolute() ? '': 'd-none'}>
                        <CurrencyInput
                            name={this.props.absoluteName}
                        ></CurrencyInput>
                    </div>
                </div>
            </div>
        )
    }
}