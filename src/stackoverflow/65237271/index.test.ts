import { put } from 'redux-saga/effects';
import { displayError, sagaWithPolling, stopPolling } from '.';

describe('error flow', () => {
  const saga = sagaWithPolling();
  const TEST_ERROR = new Error('network');

  saga.next();

  test('stop polling', () => {
    const actual = saga.throw(TEST_ERROR).value;
    const expected = put(stopPolling());
    expect(actual).toEqual(expected);
  });

  test('should display error', () => {
    const actual = saga.next().value;
    const expected = put(displayError(TEST_ERROR));
    expect(actual).toEqual(expected);
  });

  test('be done', () => {
    const actual = saga.return().value;
    const expected = true;
    expect(actual).toEqual(expected);
  });
});
