import { combineReducers } from 'redux';

// custom reducers
import { appReducer } from './app/app-reducer';
import { authReducer } from './redux/auth/auth-container-reducer';
import { userReducer } from './redux/users/user-reducer';
import { articlesReducer } from './redux/articles/articles-reducer';
import { categoriesReducer } from './redux/categories/categories-reducer';
import formReducer from './redux/forms/form-reducer';
const rootReducer = combineReducers({
    appReducer,
    form: formReducer, // redux form
    authReducer,
    userReducer,
    articlesReducer,
    categoriesReducer
});

export default rootReducer;
