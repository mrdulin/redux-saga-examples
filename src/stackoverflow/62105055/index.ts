import { call, takeLatest, put } from 'redux-saga/effects';
import { api } from './api';
import { types } from './types';

const actionTypes = {
  getPostsSuccess(posts) {
    return { type: types.GET_POSTS_SUCCESS, payload: { posts } };
  },
  getPostsFailure(error) {
    return { type: types.GET_POSTS_FAILURE, error };
  },
};

export function* getPosts() {
  try {
    const posts = yield call(api.post.getPosts);
    yield put(actionTypes.getPostsSuccess(posts));
  } catch (error) {
    yield put(actionTypes.getPostsFailure(error));
  }
}

export function* watchPosts() {
  yield takeLatest(types.GET_POSTS_INIT, getPosts);
}
