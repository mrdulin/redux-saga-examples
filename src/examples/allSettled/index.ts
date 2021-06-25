import { all, put, call, takeLatest } from 'redux-saga/effects';
import { createStoreWithSaga } from '../../utils';

const someSuccessAction = { type: 'SIGN_USER_SUCCESS' };

function someApi(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user < 5) {
        resolve('success');
      } else {
        reject('failed');
      }
    }, 1000);
  });
}

const allSettled = (effects) =>
  all(
    effects.map((effect) =>
      call(function* settle() {
        try {
          return { error: false, result: yield effect };
        } catch (err) {
          return { error: true, result: err };
        }
      }),
    ),
  );

function* batchSignUser(action) {
  const r = yield allSettled(action.payload.users.map((user) => call(signUser, user)));
  console.log(r);
}

function* signUser(user) {
  const r = yield call(someApi, user);
  yield put(someSuccessAction);
  return r;
}

function* watchBatchSignUser() {
  yield takeLatest('SIGN_USER', batchSignUser);
}
const store = createStoreWithSaga(watchBatchSignUser);

const users = [1, 2, 3, 4, 5, 6, 7];
store.dispatch({ type: 'SIGN_USER', payload: { users } });
