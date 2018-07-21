const actions = {};

export default store => next => action => {
  if (actions[action.type]) {
    actions[action.type](store, action, next);
  } else {
    next(action);
  }
};
