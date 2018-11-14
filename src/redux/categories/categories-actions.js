import articlesService from './categories-service';
import { GET_CATEGORIES } from './categories-constants';

export function getCategories(params) {
    return dispatch => {
        const promise = articlesService.getCategories(params);
        dispatch({
            type: GET_CATEGORIES,
            payload: promise,
            meta: {
                showSpinner: true,
                promise
            }
        });
    }
}
