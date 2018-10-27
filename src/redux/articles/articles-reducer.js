import {
    GET_ARTICLES_PENDING,
    GET_ARTICLES_FULFILLED,
    GET_ARTICLES_REJECTED,
    DELETE_ARTICLE_PENDING,
    DELETE_ARTICLE_FULFILLED,
    DELETE_ARTICLE_REJECTED
} from './articles-constants';

const defaultState = {
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


        case DELETE_ARTICLE_PENDING:
            return Object.assign({}, currentState, {
                loading: true,
            });
        case DELETE_ARTICLE_FULFILLED:
            const articles = currentState.articles.filter(art => art._id !== action.meta.article._id);
            return Object.assign({}, currentState, { 
                articles,
                loading: false,
                error: null,
            });
        case DELETE_ARTICLE_REJECTED:
            return Object.assign({}, currentState, { error: action.payload, loading: false } );
        default:
            return currentState;
    }
}