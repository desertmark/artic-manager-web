import { SHOW_ALERT, HIDE_ALERT } from "../../app/app-constants";

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
      const message = error.message || 'Something went wrong. Try again later.';
      store.dispatch({type: SHOW_ALERT, alertConfig: {
        alertType: 'danger',
        message
      }});
      throw error;
    });
  }
  next(action);
}