import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

function defaultReducer(state, action) {
  return state;
}

export function createStoreWithSaga(saga, reducer = defaultReducer) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(saga);
  return store;
}
