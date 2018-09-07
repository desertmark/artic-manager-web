import React, { Component } from 'react';

export default class SelectComponent extends Component {
    render() {
        const { props } = this;
        return (
            <div className="input-group mb-3">
                <select className="custom-select" {...props}>
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