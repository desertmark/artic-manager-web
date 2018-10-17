import { APP_INIT, SHOW_SPINNER, HIDE_SPINNER, SHOW_ALERT, HIDE_ALERT, APP_INIT_COMPLETED } from "./app-constants";

const defaultState = {
    showSpinner: false,
    alertConfig: null,
    isInitializing: true,
}

export function appReducer(currentState, action) {

    currentState = currentState || defaultState;

    switch (action.type) {
        case APP_INIT: 
            return Object.assign({}, currentState);
        case APP_INIT_COMPLETED:
            return Object.assign({}, currentState, {isInitializing: false})

        case SHOW_SPINNER: 
            return Object.assign({}, currentState, {showSpinner: true});
        case HIDE_SPINNER: 
            return Object.assign({}, currentState, {showSpinner: false});
        
        case SHOW_ALERT: 
            return Object.assign({}, currentState, {alertConfig: action.alertConfig});
        case HIDE_ALERT: 
            return Object.assign({}, currentState, {alertConfig: null});
        
        default:
            return currentState;
    }
}