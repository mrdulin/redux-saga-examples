import { call, put, takeEvery } from 'redux-saga/effects';
import { getBlogsSaga } from './getBlogSaga';

const BLOGS = {
  LOAD: 'BLOGS_LOAD',
};

function setBlogs(payload) {
  return {
    type: 'SET_BLOGS',
    payload,
  };
}

function* displayBlogs() {
  const data = yield call(getBlogsSaga);
  console.log(data);
  yield put(setBlogs(data));
}

function* rootSaga() {
  yield takeEvery(BLOGS.LOAD, displayBlogs);
}

export { rootSaga, displayBlogs };
