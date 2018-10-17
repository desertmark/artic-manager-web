import { GET_LOCAL_SESSION, STORE_SESSION } from "../auth/auth-constants-container";
import { getCurrentUser } from '../users/user-actions';
import { appInitCompleted } from '../../app/app-actions';

export const getCurrentUserMiddleware = store => next => action => {
    next(action);
    if(action.type === STORE_SESSION || (action.type === GET_LOCAL_SESSION && action.payload)) {
        Promise
        .resolve()
        .then(() => store.dispatch(getCurrentUser()))
        .then(() => store.dispatch(appInitCompleted()))
        .catch(() => store.dispatch(appInitCompleted()));
    }
    if(action.type === GET_LOCAL_SESSION && !action.payload) {
       store.dispatch(appInitCompleted());
    }
} 