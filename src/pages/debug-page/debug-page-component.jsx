import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decycle } from 'cycle';
class DebugPageComponent extends Component { 
    render() {
        const prettyState = JSON.stringify(decycle(this.props.appState), null, 2);
        return (
            <div id="debug-page-component">
                <label>State:</label>
                <pre>{prettyState}</pre>
            </div>
        )
    }
}

export default connect(
    state => {
        const { appReducer, authReducer, userReducer, articlesReducer } = state;
        return {
            appState: {
                appReducer,
                authReducer,
                userReducer,
                articlesReducer
            }
        }
    },
    null
)(DebugPageComponent)