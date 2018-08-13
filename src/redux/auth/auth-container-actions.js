import authService from './auth-service';
import { LOGIN_REQUEST } from './auth-constants-container';

// ActionCreator
export function login(values) {
    const promise = authService.login(values);
    return {
        type: LOGIN_REQUEST, 
        payload: promise, 
        meta: {
            showSpinner: true, // uses spinner middleware to show app spinner
            promise, // pass promise to the middleware so he can hide spinner after promise finishes!
        }
    };
}