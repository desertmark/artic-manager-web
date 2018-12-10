import articlesService from './articles-service';
import { articleVmToApiArticle } from '../../util/util';
import { GET_ARTICLES, DELETE_ARTICLE, GET_ARTICLE, CREATE_ARTICLE } from './articles-constants';

export function getArticle(articleId) {
    return dispatch => {
        const promise = articlesService.getArticle(articleId);
        dispatch({
            type: GET_ARTICLE,
            payload: promise,
            meta: {
                showSpinner: true,
                promise
            }
        });
    }
}

export function getArticles(params, filters) {
    return dispatch => {
        const promise = articlesService.getArticles(params, filters);
        dispatch({
            type: GET_ARTICLES,
            payload: promise,
            meta: {
                pagination: params,
                showSpinner: true,
                promise
            }
        });
    }
}

export function createArticle(article) {
    return (dispatch, getState) => {
        const apiArticle = articleVmToApiArticle(article);
        console.log('API ARTICLE', apiArticle);
        const promise = articlesService.createArticle(apiArticle);
        return dispatch({
            type: CREATE_ARTICLE,
            payload: promise,
            meta: {
                article: apiArticle,
                showSpinner: true,
                promise,
                alertConfig:{
                    alertType: 'success',
                    message:'Article created.'
                },
            }
        });
    }
}

export function deleteArticle(article) {
    return (dispatch, getState) => {
        const promise = articlesService.deleteArticle(article._id)
        return dispatch({
            type: DELETE_ARTICLE,
            payload: promise,
            meta: {
                article,
                showSpinner: true,
                promise,
                alertConfig:{
                    alertType: 'success',
                    message:'Article removed.'
                },
            }
        });
    }
}