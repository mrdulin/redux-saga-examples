import { getPosts, watchPosts } from './';
import { api } from './api';
import { types } from './types';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { call } from 'redux-saga/effects';

describe('62105055', () => {
  it(' fetchs post failure ', () => {
    const error = new Error('Whoops');
    return expectSaga(getPosts)
      .provide([[call(api.post.getPosts), throwError(error)]])
      .put({ type: types.GET_POSTS_FAILURE, error: error })
      .run();
  });

  it('should test fetches posts', () => {
    const posts = { posts: [] };
    return expectSaga(watchPosts)
      .provide([[call(api.post.getPosts), posts]])
      .put({ type: types.GET_POSTS_SUCCESS, payload: { posts } })
      .dispatch({ type: types.GET_POSTS_INIT })
      .silentRun();
  });
});
