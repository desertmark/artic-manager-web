import { get } from 'lodash';
import articlesService from './articles-service';
import { articleVmToApiArticle, bulkEditVmToApiBulkEdit } from '../../util/util';
import { 
    GET_ARTICLES,
    DELETE_ARTICLE,
    GET_ARTICLE,
    CREATE_ARTICLE,
    EDIT_ARTICLE,
    BULK_EDIT_ARTICLE,
    LONG_POLLING_ARTICLE,
    LONG_POLLING_ARTICLE_STOP,
} from './articles-constants';

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

export function getArticles(pagination, filters) {
    const params = { 
        ...pagination,
        description: get(filters, 'description'),
        codeString: get(filters, 'codeString'),
        ['category.description']: get(filters, 'category.description'),
    };
    return dispatch => {
        const promise = articlesService.getArticles(params);
        dispatch({
            type: GET_ARTICLES,
            payload: promise,
            meta: {
                pagination,
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

export function editArticle(article) {
    return (dispatch, getState) => {
        const apiArticle = articleVmToApiArticle(article);
        const promise = articlesService.editArticle(apiArticle);
        return dispatch({
            type: EDIT_ARTICLE,
            payload: promise,
            meta: {
                article: apiArticle,
                showSpinner: true,
                promise,
                alertConfig:{
                    alertType: 'success',
                    message:'Article saved.'
                },
            }
        });
    }
}

export function bulkEditArticles(values) {
    return (dispatch, getState) => {
        const apiBulkEditModel = bulkEditVmToApiBulkEdit(values);
        const promise = articlesService.bulkEditArticles(apiBulkEditModel);
        return dispatch({
            type: BULK_EDIT_ARTICLE,
            payload: promise,
            meta: {
                showSpinner: true,
                promise,
                alertConfig:{
                    alertType: 'success',
                    message:'Bulk operation completed.'
                },
            }
        });
    }
}

export function fileEditArticles(file) {
    return (dispatch, getState) => {
        const promise = articlesService.fileEditArticles(file);
        return dispatch({
            type: BULK_EDIT_ARTICLE,
            payload: promise,
            meta: {
                showSpinner: true,
                promise,
                alertConfig:{
                    alertType: 'success',
                    message:'Bulk operation completed.'
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

export function getUpdateStatus() {
    return (dispatch, getState) => {
        const promise = articlesService.getUpdateStatus();
        return dispatch({
            type: LONG_POLLING_ARTICLE,
            payload: promise,
        })
    };
}

export function stopLongPolling() {
    return {
        type: LONG_POLLING_ARTICLE_STOP,
    }
}