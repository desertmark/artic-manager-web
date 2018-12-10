import React, { Component } from 'react';
import { connect } from 'react-redux';
import { decycle } from 'cycle';
class DebugPageComponent extends Component { 
    render() {
        return (
            <div id="debug-page-component">
                <label>State:</label>
                <pre></pre>
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