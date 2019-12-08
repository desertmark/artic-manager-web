import React, { Component } from 'react';

export default class ProgressBarComponent extends Component {

    render() {
        const {color} = this.props;
        return (
            <div className="progress" style={{height:"20px", borderRadius:0}}>
                <div
                    className={`progress-bar progress-bar-striped progress-bar-animated bg-${color}`}
                    role="progressbar" 
                    aria-valuenow={`${this.props.currentValue}%`} 
                    aria-valuemin={`${this.props.minValue || 0}%`} 
                    aria-valuemax={`${this.props.maxValue || 100}%`} 
                    style={{width: `${this.props.currentValue}%`}}>
                </div>
            </div>
        )
    }
}