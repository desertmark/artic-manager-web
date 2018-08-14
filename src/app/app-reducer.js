import { APP_INIT, SHOW_SPINNER, HIDE_SPINNER } from "./app-constants";

const defaultState = {
    showSpinner: false,
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
        default:
            return currentState;
    }
}