import {
    GET_ARTICLES_PENDING,
    GET_ARTICLES_FULFILLED,
    GET_ARTICLES_REJECTED
} from './articles-constants';

const defaultState = {
    articles: [],
    pagination: {
        page: 1,
        sizePerPage: 20,
        totalSize: 0
    },
    error: null
}

export function articlesReducer(currentState = defaultState, action) {
    switch(action.type) {        
        case GET_ARTICLES_PENDING:
            return Object.assign({}, currentState, { pagination: {...defaultState.pagination, ...action.meta.pagination} });
        case GET_ARTICLES_FULFILLED:
            const pagination = { totalSize: action.payload.totalSize };
            return Object.assign({}, currentState, { 
                articles: action.payload.articles, 
                pagination,
                error: null 
            });
        case GET_ARTICLES_REJECTED:
            return Object.assign({}, currentState, { error: action.payload });

        default:
            return currentState;
    }
}