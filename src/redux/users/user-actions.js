import userService from './user-service';
import { GET_CURRENT_USER, CLEAR_CURRENT_USER, PUT_USER } from './user-constants';

export function getCurrentUser() {
    return (dispatch, getState) => {
        const promise = userService.getCurrentUser(getState().authReducer.session);
        return dispatch({
            type: GET_CURRENT_USER,
            payload: promise,
            meta: {
                showSpinner: true,
                promise
            }
        });
    }
}

export function clearCurrentUser() {
    return {type: CLEAR_CURRENT_USER };
}

export function updateUser(userId, values) {
    return (dispatch, getState) => {
        const promise = userService.updateUser(userId, values);
        return dispatch({
            type: PUT_USER,
            payload: promise,
            meta: {
                showSpinner: true,
                promise
            }
        });
    }
}