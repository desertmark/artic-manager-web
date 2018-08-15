import authService from './auth-service';
import { LOGIN_REQUEST, LOGOUT_REQUEST, STORE_SESSION, GET_LOCAL_SESSION, CLEAR_LOCAL_SESSION } from './auth-constants-container';
import { clearCurrentUser } from '../users/user-actions';

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
            return dispatch(clearCurrentUser());
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

export function clearLocalSession() {
    authService.clearLocalSession();
    return {
        type: CLEAR_LOCAL_SESSION
    }
}