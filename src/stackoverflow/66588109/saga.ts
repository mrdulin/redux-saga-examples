import { AbortController, abortableFetch } from 'abortcontroller-polyfill/dist/cjs-ponyfill';
import _fetch from 'node-fetch';
import { SagaIterator } from 'redux-saga';
import { call, cancelled, takeLatest } from 'redux-saga/effects';
const { fetch } = abortableFetch(_fetch);

export function getFoo(abortController) {
  return fetch('http://localhost/api/foo', { signal: abortController.signal });
}

export function* doSomething(): SagaIterator {
  const abortController = new AbortController();
  try {
    const fooResponse = yield call(getFoo, abortController);
  } catch {
    console.log('handle error');
  } finally {
    if (yield cancelled()) {
      abortController.abort();
    }
  }
}

export function* watchForDoSomethingAction(): SagaIterator {
  yield takeLatest('action/type/app/do_something', doSomething);
}
