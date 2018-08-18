import React, {Component} from 'react';

export class SwitchableInputComponent extends Component {
    render() {
        const { value, edit, children } = this.props;
        return (edit ? children : <div>{value}</div>)
    }
}