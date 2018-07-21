import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import thunk from 'redux-thunk';
import food from './food';
import authMiddleware from './middleware/auth';

const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const persistConfig = {
  key: '2key',
  storage,
};

const rootReducer = combineReducers({
  food,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = applyMiddleware(
  thunk,
  authMiddleware,
  routerMiddleware
);

/* eslint-disable no-underscore-dangle */
const middleware = window.__REDUX_DEVTOOLS_EXTENSION__
  ? (compose)(middlewares, window.__REDUX_DEVTOOLS_EXTENSION__())
  : (compose)(middlewares);
/* eslint-enable no-underscore-dangle */

export default (initialState = {}) => {
  const store = createStore(persistedReducer, initialState, middleware);
  return {
    store,
    persistor: persistStore(store),
  };
};

export * from './food';
