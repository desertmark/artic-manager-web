import { clearLocalSession } from '../auth/auth-container-actions';
import { clearCurrentUser } from '../users/user-actions'

export const detectExpiredSessionMiddleware = store => next => action => {
    next(action);
    if(action.type.endsWith('REJECTED') && action.payload.status === 401) {
        store.dispatch(clearLocalSession());
        store.dispatch(clearCurrentUser());
    }
} 