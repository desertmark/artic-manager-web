import React, { Component } from 'react';

export default class SelectComponent extends Component {
    render() {
        return (
            <div className="input-group mb-3">
                <select className="custom-select" defaultValue={this.props.input.selected} name={this.props.input.name} {...this.props.input}>
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
                    <label className="input-group-text">{this.props.label}</label>
                </div>
            </div>
        )
    }
}