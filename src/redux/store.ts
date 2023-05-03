import { setPurge } from './actions/searchAction';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import persistReducer from '@/redux/reducers/persistReducer';
import thunk from 'redux-thunk';
import { EXPIRE_TIME } from '@/constants/config';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);

setInterval(() => {
  console.log('cache clear');
  store.dispatch(setPurge());
}, EXPIRE_TIME); // 테스트용으로 1분마다 초기화

export { store, persistor };
