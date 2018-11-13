import React, { Component } from 'react';

export default class SelectComponent extends Component {
    render() {
        const { input, children, label } = this.props;
        return (
            <div className="input-group mb-3">
                <select className="custom-select" name={input.name} {...input}>
                    {children.map((opt,ix) => 
                        <option 
                            key={ix} 
                            value={opt.value}
                        >
                            {opt.text}
                        </option>)
                    }
                </select>
                <div className="input-group-append">
                    <label className="input-group-text">{label}</label>
                </div>
            </div>
        )
    }
}