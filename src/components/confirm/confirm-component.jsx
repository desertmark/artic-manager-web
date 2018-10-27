import React, { Component } from 'react';

export default class ConfirmComponent extends Component {
    render() {
        const {name, title, body, onAccept, onCancel} = this.props;
        return (
            <div className="modal fade" id={ name } tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{ title }</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            { body }
                        </div>
                        <div className="modal-footer">
                            <button onClick={ onAccept } className="btn btn-primary" data-dismiss="modal">Accept</button>
                            <button onClick={ onCancel } className="btn btn-default" data-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}