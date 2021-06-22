import { call, put } from 'redux-saga/effects';

export function constructApiData(params) {
  return { name: 'teresa teng' };
}
export function postData(url, formData) {
  return fetch(url, { body: formData });
}
export function saveRecommendations(payload) {
  return { type: 'SAVE_RECOMMENDATIONS_SUCCESS', payload };
}

export function* saga(onFormSubmitSuccess) {
  const modifyData = {};
  const url = 'https://test.com';

  const formData = yield call(constructApiData, modifyData);

  const response = yield call(postData, url, formData);

  if (response.data.attributes.status === 'SUCCESS') {
    yield put(saveRecommendations(response.data.attributes.recommendedPriorities));
    yield call(onFormSubmitSuccess);
  }
}
