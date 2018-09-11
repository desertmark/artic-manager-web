import {
    GET_CURRENT_USER_PENDING,
    GET_CURRENT_USER_FULFILLED,
    GET_CURRENT_USER_REJECTED,
    CLEAR_CURRENT_USER,
    PUT_USER_PENDING,
    PUT_USER_FULFILLED,
    PUT_USER_REJECTED,
    GET_USERS_PENDING,
    GET_USERS_FULFILLED,
    GET_USERS_REJECTED,
    CREATE_USER_PENDING,
    CREATE_USER_FULFILLED,
    CREATE_USER_REJECTED,
    DELETE_USER_PENDING,
    DELETE_USER_FULFILLED,
    DELETE_USER_REJECTED,
} from './user-constants';
import * as _ from 'lodash';

const defaultState = {
    currentUser: null,
    users: []
}

export function userReducer(currentState = defaultState, action) {
    let users;

    switch(action.type) {        
        case GET_CURRENT_USER_PENDING:
            return Object.assign({}, currentState);
        case GET_CURRENT_USER_FULFILLED:
            return Object.assign({}, currentState, {currentUser: action.payload, error: null});
        case GET_CURRENT_USER_REJECTED:
            return Object.assign({}, currentState, {error: action.payload, currentUser: null});
        
        case CLEAR_CURRENT_USER:
            return Object.assign({}, currentState, {currentUser: null, error: null});

        case PUT_USER_PENDING:
            return Object.assign({}, currentState);
        case PUT_USER_FULFILLED:
            return Object.assign({}, currentState, {currentUser: action.payload, error: null});
        case PUT_USER_REJECTED:
            return Object.assign({}, currentState, {error: action.payload});

        case GET_USERS_PENDING:
            return Object.assign({}, currentState);
        case GET_USERS_FULFILLED:
            return Object.assign({}, currentState, {users: action.payload, error: null});
        case GET_USERS_REJECTED:
            return Object.assign({}, currentState, {error: action.payload});

        case CREATE_USER_PENDING:
            return Object.assign({}, currentState);
        case CREATE_USER_FULFILLED:
            users = currentState.users.concat(action.payload);
            return Object.assign({}, currentState, {users, error: null});
        case CREATE_USER_REJECTED:
            return Object.assign({}, currentState, {error: action.payload});
        
        case DELETE_USER_PENDING:
            return Object.assign({}, currentState);
        case DELETE_USER_FULFILLED:
            users = currentState.users.slice(0);
            _.remove(users, user => user._id === action.meta.userId);
            return Object.assign({}, currentState, {users, error: null});
        case DELETE_USER_REJECTED:
            return Object.assign({}, currentState, {error: action.payload});

        default:
            return currentState;
    }
}