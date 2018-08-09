import axios from 'axios';
import {
    API_URL,
    LOGIN_REQUEST,
    LOGIN_REQUEST_SUCCESS,
    LOGIN_REQUEST_FAILURE,
} from './login-constants-container';
// ActionCreator
export function login(values) {
    return (dispatch, getState) => {
        dispatch({type: LOGIN_REQUEST});
        axios({
            url: `${API_URL}/auth/login`,
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            data: values
        }).then(res => {
            dispatch({type: LOGIN_REQUEST_SUCCESS, session: res.data})
        }).catch(axiosError => {
            const error = axiosError.response.data;
            console.log('Error loging in:', error);
            dispatch({type: LOGIN_REQUEST_FAILURE, error})
        });
    }
}