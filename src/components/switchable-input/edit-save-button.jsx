import React, {Component} from 'react';

export class EditSaveButton extends Component {
    constructor() {
        super()
        this.onClick = this.onClick.bind(this);
        this.state = {
          edit: false
        }
      }

    onClick(e) {
        const {edit} = this.state;
        this.setState({edit: !edit});
        this.props.onModeChange(!edit);
    }

    render() {
        const { edit } = this.state;
        let text;
        let type;
        if(edit) {
            text = 'Save';
            type = 'submit';
        } else {
            text = 'Edit';
            type = 'button';
        }
        return (
            <button type={type} onClick={this.onClick} >{text}</button>
        )
    }
}