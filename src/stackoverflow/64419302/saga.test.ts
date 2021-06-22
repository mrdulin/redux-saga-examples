import { constructApiData, postData, saga, saveRecommendations } from './saga';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put } from 'redux-saga/effects';

describe('64419302', () => {
  function mockOnFormSubmitSuccess() {}
  const gen = cloneableGenerator(saga)(mockOnFormSubmitSuccess);

  it('should construct api data', () => {
    expect(gen.next().value).toEqual(call(constructApiData, {}));
  });

  it('should call api', () => {
    expect(gen.next(constructApiData({})).value).toEqual(call(postData, 'https://test.com', { name: 'teresa teng' }));
  });

  describe('success', () => {
    let clone;
    beforeAll(() => {
      clone = gen.clone();
    });
    it('should save data', () => {
      expect(
        clone.next({ data: { attributes: { status: 'SUCCESS', recommendedPriorities: [1, 2, 3] } } }).value,
      ).toEqual(put(saveRecommendations([1, 2, 3])));
    });

    it('should call form submit success callback', () => {
      expect(clone.next().value).toEqual(call(mockOnFormSubmitSuccess));
    });
  });
});
