import React, {Component} from 'React';
import {connect} from 'react-redux';

class DebugPageComponent extends Component { 
    render() {
        const prettyState = JSON.stringify(this.props.appState, null, 2);
        return (
            <div id="debug-page-component">
                <label>State:</label>
                <pre>{prettyState}</pre>
            </div>
        )
    }
}

export default connect(
    state => ({appState: state}),
    null
)(DebugPageComponent)