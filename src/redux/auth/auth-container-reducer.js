import {
    LOGIN_REQUEST_PENDING,
    LOGIN_REQUEST_FULFILLED,
    LOGIN_REQUEST_REJECTED,
    STORE_SESSION,
    GET_LOCAL_SESSION,
} from './auth-constants-container';

export function authReducer (currentState, action) {
	currentState = currentState || {
  	isLoading: false,
    session: null,
    error: null,
    isAuthenticated: false,
  }; // Initial State
  switch (action.type) {
    case LOGIN_REQUEST_PENDING:
        return Object.assign({}, currentState, {isLoading: true});
    case LOGIN_REQUEST_FULFILLED:
        return Object.assign({}, currentState, {isLoading: false, session: action.payload});
    case LOGIN_REQUEST_REJECTED:
        return Object.assign({}, currentState, {isLoading: false, error: action.payload});
    case STORE_SESSION:
        return Object.assign({}, currentState, {isLoading: false, isAuthenticated: true});
    case GET_LOCAL_SESSION:
        return Object.assign({}, currentState, {
            isAuthenticated: action.payload ? true : false,
            session: action.payload || null
        });
    default:
    	return currentState; // Always return the state
  }
}