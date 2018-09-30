import {
    GET_ARTICLES_PENDING,
    GET_ARTICLES_FULFILLED,
    GET_ARTICLES_REJECTED
} from './articles-constants';

const defaultState = {
    pagintatino: null,
    articles: [],
    error: null
}

export function articlesReducer(currentState = defaultState, action) {
    switch(action.type) {        
        case GET_ARTICLES_PENDING:
            return Object.assign({}, currentState);
        case GET_ARTICLES_FULFILLED:
            return Object.assign({}, currentState, { articles: action.payload, error: null });
        case GET_ARTICLES_REJECTED:
            return Object.assign({}, currentState, { error: action.payload });

        default:
            return currentState;
    }
}