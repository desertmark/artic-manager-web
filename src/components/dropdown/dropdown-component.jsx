import {Link} from 'react-router-dom';
import React, { Component } from 'react';

export default class DropdownComponent extends Component {
    constructor() {
        super();
        this.renderOptions = this.renderOptions.bind(this);
    }

    renderOptions() {
        return this.props.options.map((opt,ix) => 
        <Link key={ix} className="dropdown-item" to={opt.link}>
            <i className={`fas mr-2 ${opt.icon}`}></i>
            {opt.text}
        </Link>
        );
    }
    render() {
        return (
            <div className="dropdown show">
                <a className="btn text-light dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-user m-2"></i>
                    {this.props.text}
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    {this.renderOptions()}
                </div>
            </div>
        )
    }
}