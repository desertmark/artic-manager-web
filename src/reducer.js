import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// custom reducers
import { loginReducer } from './containers/login-form/login-container-reducer';
import { appReducer } from './app-reducer';
const rootReducer = combineReducers({
    appReducer,
    form: formReducer, // redux form
    loginReducer
});

export default rootReducer;
