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
    CREATE_ARTICLE_REJECTED
} from './articles-constants';

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
    error: null
}

export function articlesReducer(currentState = defaultState, action) {
    switch(action.type) {
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
            return Object.assign({}, currentState, { error: action.payload, loading: false } );
        // ---------------------------------- LIST ----------------------------------
        case GET_ARTICLES_PENDING:
            return Object.assign({}, currentState, {
                articles: [],
                pagination: {...currentState.pagination, ...action.meta.pagination},
                isEmpty: false,
                loading: true,
            });
        case GET_ARTICLES_FULFILLED:
            const pagination = {...currentState.pagination, ...{ totalSize: action.payload.totalSize } };
            return Object.assign({}, currentState, { 
                articles: action.payload.articles, 
                pagination,
                loading: false,
                isEmpty: action.payload.articles.length === 0,
                error: null
            });
        case GET_ARTICLES_REJECTED:
            return Object.assign({}, currentState, { error: action.payload, loading: false } );

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
            return Object.assign({}, currentState, { error: action.payload, loading: false } );

        // ---------------------------------- CREATE ----------------------------------
        case CREATE_ARTICLE_PENDING:
            return Object.assign({}, currentState, {
                loading: true,
            });
        case CREATE_ARTICLE_FULFILLED:
            return Object.assign({}, currentState, { 
                articles: currentState.articles.push(action.meta.article),
                loading: false,
                error: null,
            });
        case CREATE_ARTICLE_REJECTED:
            return Object.assign({}, currentState, { error: action.payload, loading: false } );
        default:
            return currentState;
    }
}