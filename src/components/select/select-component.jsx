import React, { Component } from 'react';

export default class SelectComponent extends Component {
    render() {
        return (
            <div className="input-group mb-3">
                <select defaultValue={this.props.selected} name={this.props.name} className="custom-select" id="inputGroupSelect02">
                    {this.props.children.map((opt,ix) => 
                        <option 
                            key={ix} 
                            value={opt.value}
                        >
                            {opt.text}
                        </option>)
                    }
                </select>
                <div className="input-group-append">
                    <label className="input-group-text" htmlFor="inputGroupSelect02">{this.props.label}</label>
                </div>
            </div>
        )
    }
}