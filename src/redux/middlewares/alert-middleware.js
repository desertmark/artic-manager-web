import { SHOW_ALERT, HIDE_ALERT } from "../../app/app-constants";
import { GET_CURRENT_USER_REJECTED } from "../users/user-constants";

export const alertMiddleware = store => next => action => {
  if(action.meta && action.meta.alertConfig) {
    action.meta.promise.then(result => {
      store.dispatch({type: SHOW_ALERT, alertConfig: action.meta.alertConfig});
      return result;
    });
  }
  next(action);
}

export const alertErrorMiddleware = store => next => action => {
  if(action.meta && action.meta.promise) {
    action.meta.promise.catch(error => {
      let message = error.message || 'Something went wrong. Try again later.';
      let alertType = 'danger';
      
      if (error.status === 401 && action.type === GET_CURRENT_USER_REJECTED) {
        message = 'Your session has expired. Please log in again to continue.';
        alertType = 'warning';
      }

      store.dispatch({type: SHOW_ALERT, alertConfig: {
        alertType,
        message
      }});
      throw error;
    });
  }
  next(action);
}