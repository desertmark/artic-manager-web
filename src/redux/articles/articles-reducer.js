import {
    GET_ARTICLE_PENDING,
    GET_ARTICLE_FULFILLED,
    GET_ARTICLE_REJECTED,
    GET_ARTICLES_PENDING,
    GET_ARTICLES_FULFILLED,
    GET_ARTICLES_REJECTED,
    DELETE_ARTICLE_PENDING,
    DELETE_ARTICLE_FULFILLED,
    DELETE_ARTICLE_REJECTED,
    CREATE_ARTICLE_PENDING,
    CREATE_ARTICLE_FULFILLED,
    CREATE_ARTICLE_REJECTED,
    EDIT_ARTICLE_PENDING,
    EDIT_ARTICLE_FULFILLED,
    EDIT_ARTICLE_REJECTED,
    BULK_EDIT_ARTICLE_PENDING,
    BULK_EDIT_ARTICLE_FULFILLED,
    BULK_EDIT_ARTICLE_REJECTED,
    LONG_POLLING_ARTICLE_PENDING,
    LONG_POLLING_ARTICLE_FULFILLED,
    LONG_POLLING_ARTICLE_REJECTED,
    LONG_POLLING_ARTICLE_STOP
} from './articles-constants';

import { findIndex } from 'lodash'

const defaultState = {
    article: null,
    articles: [],
    pagination: {
        page: 0,
        sizePerPage: 20,
        totalSize: 0
    },
    loading: false,
    isEmpty: false,
    error: null,
    loadingUpdateStatus: false,
    updateStatusError: false,
    updateStatus: {
        inProgress: false, // is the update process running
        completed: 0, // percentage of articles completed
        total: 0, // total of items to process
        processed: 0, // total of already processed item
    }
}

export function articlesReducer(currentState = defaultState, action) {
    switch (action.type) {
        // ---------------------------------- GET ONE ----------------------------------
        case GET_ARTICLE_PENDING:
            return Object.assign({}, currentState, {
                loading: true,
            });
        case GET_ARTICLE_FULFILLED:
            return Object.assign({}, currentState, {
                article: action.payload,
                loading: false,
                error: null
            });
        case GET_ARTICLE_REJECTED:
            return Object.assign({}, currentState, { error: action.payload, loading: false });
        // ---------------------------------- LIST ----------------------------------
        case GET_ARTICLES_PENDING:
            return Object.assign({}, currentState, {
                articles: [],
                pagination: { ...currentState.pagination, ...action.meta.pagination },
                isEmpty: false,
                loading: true,
            });
        case GET_ARTICLES_FULFILLED:
            const pagination = { ...currentState.pagination, ...{ totalSize: action.payload.totalSize } };
            return Object.assign({}, currentState, {
                articles: action.payload.articles,
                pagination,
                loading: false,
                isEmpty: action.payload.articles.length === 0,
                error: null
            });
        case GET_ARTICLES_REJECTED:
            return Object.assign({}, currentState, { error: action.payload, loading: false });

        // ---------------------------------- DELETE ----------------------------------
        case DELETE_ARTICLE_PENDING:
            return Object.assign({}, currentState, {
                loading: true,
            });
        case DELETE_ARTICLE_FULFILLED:
            return Object.assign({}, currentState, {
                articles: currentState.articles.filter(art => art._id !== action.meta.article._id),
                loading: false,
                error: null,
            });
        case DELETE_ARTICLE_REJECTED:
            return Object.assign({}, currentState, { error: action.payload, loading: false });

        // ---------------------------------- CREATE ----------------------------------
        case CREATE_ARTICLE_PENDING:
            return Object.assign({}, currentState, {
                loading: true,
            });
        case CREATE_ARTICLE_FULFILLED:
            return Object.assign({}, currentState, {
                articles: currentState.articles.concat(action.payload),
                loading: false,
                error: null,
            });
        case CREATE_ARTICLE_REJECTED:
            return Object.assign({}, currentState, { error: action.payload, loading: false });

        // ---------------------------------- EDIT ONE ----------------------------------
        case EDIT_ARTICLE_PENDING:
            return Object.assign({}, currentState, {
                loading: true,
            });
        case EDIT_ARTICLE_FULFILLED:
            return Object.assign({}, currentState, {
                article: action.meta.article,
                loading: false,
                error: null,
            });
        case EDIT_ARTICLE_REJECTED:
            return Object.assign({}, currentState, { error: action.payload, loading: false });
        // ---------------------------------- BULK EDIT ----------------------------------
        case BULK_EDIT_ARTICLE_PENDING:
            return Object.assign({}, currentState, {
                loading: true,
            });
        case BULK_EDIT_ARTICLE_FULFILLED:
            return Object.assign({}, currentState, {
                loading: false,
                error: null,
            });
        case BULK_EDIT_ARTICLE_REJECTED:
            return Object.assign({}, currentState, { error: action.payload, loading: false });
        // ---------------------------------- LONG POLLING ----------------------------------
        case LONG_POLLING_ARTICLE_PENDING:
            return Object.assign({}, currentState, {
                loadingUpdateStatus: true,
            });
        case LONG_POLLING_ARTICLE_FULFILLED:
            return Object.assign({}, currentState, {
                loadingUpdateStatus: false,
                updateStatus: action.payload,
                error: null,
            });
        case LONG_POLLING_ARTICLE_REJECTED:
            const updateStatus = Object.assign({}, currentState.updateStatus, { error: true });
            return Object.assign({}, currentState, {
                error: action.payload,
                loadingUpdateStatus: false,
                updateStatus,
            });
        case LONG_POLLING_ARTICLE_STOP: 
            return Object.assign({}, currentState, {
                error: null,
                updateStatus: defaultState.updateStatus,
            })
        default:
            return currentState;
    }
}