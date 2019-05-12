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
    }

    onPercentage() {
        this.setState({ type: INPUT_TYPES.Percentage });
    }

    onAbsolute() {
        this.setState({ type: INPUT_TYPES.Absolute });
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
                    {this.state.type === INPUT_TYPES.Percentage &&
                            <PercentageInput
                                name={this.props.percentageName}
                            ></PercentageInput>
                    }

                    {this.state.type === INPUT_TYPES.Absolute &&
                            <CurrencyInput
                                name={this.props.absoluteName}
                            ></CurrencyInput>
                    }
                </div>
            </div>
        )
    }
}