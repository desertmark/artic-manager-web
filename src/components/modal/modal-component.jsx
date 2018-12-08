import React, {Component} from 'react';
import $ from 'jquery';

export default class ModalComponent extends Component {
    constructor() {
        super();
        this.modalRef = React.createRef();
    }

    componentDidUpdate() {
        if(this.props.isOpen) {
            $(this.modalRef.current).modal('show');
        } else {
            $(this.modalRef.current).modal('hide');
        }
    }

    render() {
        const { buttons } = this.props;
        return (
            <div ref={this.modalRef} className="modal fade" id={this.props.name} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                    {buttons && buttons.length > 0 &&
                        <div className="modal-footer">
                            {this.props.buttons}
                        </div>
                    }
                    </div>
                </div>
            </div>
        )
    }
}