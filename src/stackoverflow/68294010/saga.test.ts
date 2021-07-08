import { testSaga } from 'redux-saga-test-plan';
import { getProfiles, getUsers, usersSaga } from './saga';
import { userConstants } from './actionTypes';
import { api, errorHandler } from './api';

describe('68294010', () => {
  describe('usersSaga', () => {
    it('should pass', () => {
      testSaga(usersSaga)
        .next()
        .takeLatest(userConstants.GET_USERS, getUsers)
        .next()
        .takeLatest(userConstants.GET_USER_PROFILES, getProfiles)
        .finish()
        .isDone();
    });
  });

  describe('getUsers', () => {
    it('should get data', () => {
      testSaga(getUsers, { payload: { id: 1 } })
        .next()
        .call(api.users.getUsers, { id: 1 })
        .next({ data: 'teresa teng' })
        .put({ type: userConstants.LOAD_USERS, payload: 'teresa teng' })
        .finish()
        .isDone();
    });
    it('should handle error', () => {
      const err = new Error('network');
      testSaga(getUsers, { payload: { id: 1 } })
        .next()
        .call(api.users.getUsers, { id: 1 })
        .throw(err)
        .call(errorHandler, err)
        .next()
        .put({ type: userConstants.LOAD_USERS_FAIL })
        .finish()
        .isDone();
    });
  });

  describe('getProfiles', () => {
    it('should get profile', () => {
      testSaga(getProfiles, { payload: { id: 1 } })
        .next()
        .call(api.users.getProfiles, { id: 1 })
        .next({ data: 'teresa teng' })
        .put({ type: userConstants.LOAD_PROFILES, payload: 'teresa teng' })
        .finish()
        .isDone();
    });
    it('should handle error', () => {
      const err = new Error('network');
      testSaga(getProfiles, { payload: { id: 1 } })
        .next()
        .call(api.users.getProfiles, { id: 1 })
        .throw(err)
        .call(errorHandler, err)
        .next()
        .put({ type: userConstants.LOAD_PROFILES_FAIL })
        .finish()
        .isDone();
    });
  });
});
