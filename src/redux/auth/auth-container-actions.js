import authService from './auth-service';
import { LOGIN_REQUEST, LOGOUT_REQUEST, STORE_SESSION, GET_LOCAL_SESSION } from './auth-constants-container';
import { CLEAR_CURRENT_USER } from '../users/user-constants';

// ActionCreators

export function login(values) {
    return dispatch => {
        const promise = authService.login(values);
        return dispatch({
            type: LOGIN_REQUEST, 
            payload: promise, 
            meta: {
                showSpinner: true, // uses spinner middleware to show app spinner
                promise, // pass promise to the middleware so he can hide spinner after promise finishes!
            }
        })
        .then(({action, value}) => {
            return dispatch(storeSession(value));
        });
    }
}

export function logout() {
    return dispatch => {
        const promise = authService.logout();
        dispatch({
            type: LOGOUT_REQUEST,
            payload: promise,
            meta: {
                showSpinner: true,
                promise
            }
        })
        .then(() => {
            return dispatch({type: CLEAR_CURRENT_USER });
        });
    }
}

export function storeSession(session) {
    authService.storeSession(session);
    return {
        type: STORE_SESSION
    }
}

export function getLocalStorageSession() {
    const session = authService.getLocalStorageSession();
    return {
        type: GET_LOCAL_SESSION,
        payload: session,
    }
}