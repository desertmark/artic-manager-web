import userService from './user-service';
import { GET_CURRENT_USER, CLEAR_CURRENT_USER, PUT_USER, GET_USERS, CREATE_USER, DELETE_USER } from './user-constants';

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
    return dispatch => {
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

export function getUsers() {
    return dispatch => {
        const promise = userService.getUsers();
        return dispatch({
            type: GET_USERS,
            payload: promise,
            meta: {
                showSpinner: true,
                promise
            }
        });
    }
}

export function createUser(user) {
    return dispatch => {
        const promise = userService.createUser(user);
        return dispatch({
            type: CREATE_USER,
            payload: promise,
            meta: {
                showSpinner: true,
                promise,
                alertConfig:{
                    alertType: 'success',
                    message:'User was created.'
                },
            }
        });
    }
}

export function deleteUser(userId) {
    return (dispatch, getState) => {
        const promise = userService.deleteUser(userId);
        return dispatch({
            type: DELETE_USER,
            payload: promise,
            meta: {
                showSpinner: true,
                promise,
                alertConfig:{
                    alertType: 'success',
                    message:'User was deleted.'
                },
                userId
            }
        });
    }
}