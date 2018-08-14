export const spinnerMiddleware = store => next => action => {
    if(action.meta && action.meta.showSpinner === true) {
      store.dispatch({type: 'SHOW_SPINNER'});
      action.meta.promise.finally(() => {
        store.dispatch({type:'HIDE_SPINNER'});
      });
    }
    next(action);
}
