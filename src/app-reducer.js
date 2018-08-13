const defaultState = {
    showSpinner: false,
}

export function appReducer(currentState, action) {

    currentState = currentState || defaultState;

    switch (action.type) {
        case 'SHOW_SPINNER': 
            return Object.assign({},{showSpinner: true});
        case 'HIDE_SPINNER': 
            return Object.assign({},{showSpinner: false});
        default:
            return currentState;
    }
}