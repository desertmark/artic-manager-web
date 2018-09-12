import React, {Component} from 'react';
export default class AlertComponent extends Component {
    render() {
        return (
            <div className={`alert alert-${this.props.alertType} alert-dismissible fade show m-0`} role="alert">
                <button type="button" className="close" onClick={this.props.onClose} data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                {this.props.children}
            </div>
        )
    }
}