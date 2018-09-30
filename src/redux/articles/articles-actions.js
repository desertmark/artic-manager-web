import articlesService from './articles-service';
import { GET_ARTICLES } from './articles-constants';

export function getArticles(params) {
    return dispatch => {
        const promise = articlesService.getArticles(params);
        dispatch({
            type: GET_ARTICLES,
            payload: promise,
            meta: {
                showSpinner: true,
                promise
            }
        });
    }
}

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