import {
    GET_CURRENT_USER_PENDING,
    GET_CURRENT_USER_FULFILLED,
    GET_CURRENT_USER_REJECTED,
    CLEAR_CURRENT_USER,
} from './user-constants';

const defaultState = {
    currentUser: null,
}

export function userReducer(currentState = defaultState, action) {
    switch(action.type) {        
        case GET_CURRENT_USER_PENDING:
            return Object.assign({}, currentState);
        case GET_CURRENT_USER_FULFILLED:
            return Object.assign({}, currentState, {currentUser: action.payload, error: null});
        case GET_CURRENT_USER_REJECTED:
            return Object.assign({}, currentState, {error: action.payload, currentUser: null});
        case CLEAR_CURRENT_USER:
            return Object.assign({}, currentState, {currentUser: null, error: null});
        default:
            return currentState;
    }
}