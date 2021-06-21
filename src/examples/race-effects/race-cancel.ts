import { race, take, call } from 'redux-saga/effects';
import { createStoreWithSaga } from '../../utils';

function sync() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Date().toISOString());
    }, 1000);
  });
}

function* backgroundTask() {
  while (true) {
    const res = yield call(sync);
    console.log(res);
  }
}

function* watchStartBackgroundTask() {
  while (true) {
    yield take('START_BACKGROUND_TASK');
    yield race({
      task: call(backgroundTask),
      cancel: take('CANCEL_TASK'),
    });
  }
}

const store = createStoreWithSaga(watchStartBackgroundTask);
store.dispatch({ type: 'START_BACKGROUND_TASK' });

setTimeout(() => {
  store.dispatch({ type: 'CANCEL_TASK' });
}, 3000);
