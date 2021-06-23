import { delay, put } from 'redux-saga/effects';
import * as act from './actionCreators';

export function* handleCall() {
  yield delay(1000);
  yield put(act.call());
}
