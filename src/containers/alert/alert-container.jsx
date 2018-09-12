import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AlertComponent from '../../components/alert/alert-component';
import { dismissAlert } from '../../app/app-actions';

class AlertContainer extends Component {
    constructor() {
        super();
        this.dismiss = this.dismiss.bind(this);
    }
    dismiss() {
        this.props.dismissAlert()
    }
    render() {
        const { alertConfig } = this.props;
        return (
            <div id="alert-container">
                { alertConfig && <AlertComponent alertType={ alertConfig.alertType } onClose={this.dismiss}>{ alertConfig.message }</AlertComponent>}
            </div>
        );
    }
}


export default connect(
    state => ({
        alertConfig: state.appReducer.alertConfig
    }),
    dispatch => bindActionCreators({dismissAlert},dispatch))
(AlertContainer);