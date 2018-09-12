import { APP_INIT, SHOW_SPINNER, HIDE_SPINNER, SHOW_ALERT, HIDE_ALERT } from "./app-constants";

const defaultState = {
    showSpinner: false,
    alertConfig: null,
}

export function appReducer(currentState, action) {

    currentState = currentState || defaultState;

    switch (action.type) {
        case APP_INIT: 
            return Object.assign({}, currentState);

        case SHOW_SPINNER: 
            return Object.assign({},{showSpinner: true});
        case HIDE_SPINNER: 
            return Object.assign({},{showSpinner: false});
        
        case SHOW_ALERT: 
            return Object.assign({},{alertConfig: action.alertConfig});
        case HIDE_ALERT: 
            return Object.assign({},{alertConfig: null});
        
        default:
            return currentState;
    }
}