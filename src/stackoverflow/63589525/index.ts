import { put, takeLatest } from 'redux-saga/effects';
import { createStoreWithSaga } from '../../utils';

function* saga() {
  console.log('saga');
  yield put({ type: 'TEST_EVENT_1' });
}

function* rootSaga() {
  yield takeLatest('TEST_EVENT', saga);
}

function reducer(state, action) {
  switch (action.type) {
    case 'TEST_EVENT':
      console.log(action);
      return state;
    default:
      return state;
  }
}

const store = createStoreWithSaga(rootSaga, reducer);

store.dispatch({ type: 'TEST_EVENT' });
