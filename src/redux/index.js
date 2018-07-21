import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import auth from './auth';
import food from './food';
import authMiddleware from './middleware/auth';

const persistConfig = {
  transforms: [immutableTransform()],
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth,
  food,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = applyMiddleware(
  thunk,
  authMiddleware,
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
export * from './auth';
