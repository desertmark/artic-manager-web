import {
    GET_CATEGORIES_PENDING,
    GET_CATEGORIES_FULFILLED,
    GET_CATEGORIES_REJECTED,
} from './categories-constants';

const defaultState = {
    category: null,
    categories: [],
    pagination: {
        page: 0,
        size: 20
    },
    loading: false,
    error: null
}

export function categoriesReducer(currentState = defaultState, action) {
    switch(action.type) {
        case GET_CATEGORIES_PENDING:
            return Object.assign({}, currentState, {
                loading: true,
            });
        case GET_CATEGORIES_FULFILLED:
            return Object.assign({}, currentState, { 
                categories: action.payload, 
                loading: false,
                error: null
            });
        case GET_CATEGORIES_REJECTED:
            return Object.assign({}, currentState, { error: action.payload, loading: false } );
        default:
            return currentState;
    }
}