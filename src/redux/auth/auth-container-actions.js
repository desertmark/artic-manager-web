import authService from './auth-service';
import { LOGIN_REQUEST, STORE_SESSION, GET_LOCAL_SESSION } from './auth-constants-container';

// ActionCreators

export function login(values) {
    return dispatch => {
        const promise = authService.login(values);
        dispatch({
            type: LOGIN_REQUEST, 
            payload: promise, 
            meta: {
                showSpinner: true, // uses spinner middleware to show app spinner
                promise, // pass promise to the middleware so he can hide spinner after promise finishes!
            }
        })
        .then(({action, value}) => {
            dispatch(storeSession(value));
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