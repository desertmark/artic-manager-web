import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// custom reducers
import { authReducer } from './redux/auth/auth-container-reducer';
import { appReducer } from './app-reducer';
const rootReducer = combineReducers({
    appReducer,
    form: formReducer, // redux form
    authReducer
});

export default rootReducer;
