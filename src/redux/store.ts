import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import persistReducer from '@/redux/reducers/persistReducer';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);

export { store, persistor };
