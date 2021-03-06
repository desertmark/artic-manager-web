import {
    LOGIN_REQUEST_PENDING,
    LOGIN_REQUEST_FULFILLED,
    LOGIN_REQUEST_REJECTED,

    LOGOUT_REQUEST_PENDING,
    LOGOUT_REQUEST_FULFILLED,
    LOGOUT_REQUEST_REJECTED,

    STORE_SESSION,
    GET_LOCAL_SESSION,
    CLEAR_LOCAL_SESSION,

    PASSWORD_UPDATE_PENDING,
    PASSWORD_UPDATE_FULFILLED,
    PASSWORD_UPDATE_REJECTED
} from './auth-constants-container';

const defaultState = {
  isLoading: true,
  session: null,
  error: null,
  isAuthenticated: false,
}; // Initial State

export function authReducer (currentState = defaultState, action) {
  switch (action.type) {
    // LOGIN
    case LOGIN_REQUEST_PENDING:
        return Object.assign({}, currentState, {isLoading: true});
    case LOGIN_REQUEST_FULFILLED:
        return Object.assign({}, currentState, {isLoading: false, session: action.payload, error: null});
    case LOGIN_REQUEST_REJECTED:
        return Object.assign({}, currentState, {isLoading: false, error: action.payload, session: null});

    // LOGOUT
    case LOGOUT_REQUEST_PENDING:
        return Object.assign({}, currentState, {isLoading: true});
    case LOGOUT_REQUEST_FULFILLED:
        return Object.assign({}, currentState, {isLoading: false, session: null, isAuthenticated: false});
    case LOGOUT_REQUEST_REJECTED:
        return Object.assign({}, currentState, {isLoading: false, error: action.payload});

    // SESSION
    case STORE_SESSION:
        return Object.assign({}, currentState, {isLoading: false, isAuthenticated: true});
    case GET_LOCAL_SESSION:
        return Object.assign({}, currentState, {
            isAuthenticated: action.payload ? true : false,
            isLoading: action.payload ? true : false,
            session: action.payload || null
        });
    case CLEAR_LOCAL_SESSION: 
        return Object.assign({}, currentState, {
            isAuthenticated: false,
            session: null,
            error: null
        });

    // PASSWORD UPDATE
    case PASSWORD_UPDATE_PENDING:
        return Object.assign({}, currentState, {isLoading: true});
    case PASSWORD_UPDATE_FULFILLED:
        return Object.assign({}, currentState, {isLoading: false, }); //session: null, isAuthenticated: false
    case PASSWORD_UPDATE_REJECTED:
        return Object.assign({}, currentState, {isLoading: false, error: action.payload});

    default:
    	return currentState; // Always return the state
  }
}