import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// custom reducers
import { appReducer } from './app/app-reducer';
import { authReducer } from './redux/auth/auth-container-reducer';
import { userReducer } from './redux/users/user-reducer';

const rootReducer = combineReducers({
    appReducer,
    form: formReducer, // redux form
    authReducer,
    userReducer
});

export default rootReducer;
