import { put } from 'redux-saga/effects';
import * as actions from './actions';

export function* foo() {
  yield put(actions.start());
  yield put(
    actions.bar({
      onSuccess: () => {
        console.log('do something');
      },
      onFailed: () => {
        console.log('do something else');
      },
    }),
  );
  yield put(actions.done());
}
