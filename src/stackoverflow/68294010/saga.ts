import { call, put, takeLatest } from 'redux-saga/effects';
import { api, errorHandler } from './api';
import { userConstants } from './actionTypes';

export function* getUsers(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(api.users.getUsers, { id });

    yield put({ type: userConstants.LOAD_USERS, payload: data });
  } catch (err) {
    yield call(errorHandler, err);
    yield put({ type: userConstants.LOAD_USERS_FAIL });
  }
}

export function* getProfiles(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(api.users.getProfiles, { id });

    yield put({ type: userConstants.LOAD_PROFILES, payload: data });
  } catch (err) {
    yield call(errorHandler, err);
    yield put({ type: userConstants.LOAD_PROFILES_FAIL });
  }
}

export function* usersSaga() {
  yield takeLatest(userConstants.GET_USERS, getUsers);
  yield takeLatest(userConstants.GET_USER_PROFILES, getProfiles);
}
