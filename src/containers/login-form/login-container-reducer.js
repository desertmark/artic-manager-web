import {
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAILURE,
} from './login-constants-container';

export function loginReducer (currentState, action) {
	currentState = currentState || {
  	isLoading: false,
    session: null,
    error: null
  }; // Initial State
  switch (action.type) {
    case LOGIN_REQUEST:
        return Object.assign({}, currentState, {isLoading: true});
    case LOGIN_REQUEST_SUCCESS:
        return Object.assign({}, currentState, {isLoading: false, session: action.session});
    case LOGIN_REQUEST_FAILURE:
        return Object.assign({}, currentState, {isLoading: false, error: action.error});
    default:
    	return currentState; // Always return the state
  }
}