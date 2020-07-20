import { runSaga } from 'redux-saga';
import { onSaveDATA, ActionTypes, save_on_change } from './';
import { postDATA } from './service';
import { mocked } from 'ts-jest/utils';
import { takeEvery } from 'redux-saga/effects';

jest.mock('./service');

describe('62952662', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });
  describe('onSaveDATA', () => {
    test('should save data', async () => {
      mocked(postDATA).mockResolvedValueOnce({ s: 'Somevalue' });
      const dispatchedActions: any[] = [];
      await runSaga(
        {
          dispatch: (action) => dispatchedActions.push(action),
          getState: () => ({
            appState: {},
            appData: { userDetails: { name: 'mock-name' } },
          }),
        },
        onSaveDATA,
      ).toPromise();
      expect(postDATA).toBeCalledWith({ body: { name: 'mock-name' } });
      expect(dispatchedActions).toEqual([
        { type: 'SHOW_STATUS_MESSAGE', payload: { messageContent: 'Saving Your Data' } },
        { type: 'HIDE_STATUS_MESSAGE' },
        { type: ActionTypes.SAVE_DATA_OK },
      ]);
    });

    test('should handle error if postDATA error', async () => {
      const mError = new Error('network');
      mocked(postDATA).mockRejectedValueOnce(mError);
      const dispatchedActions: any[] = [];
      await runSaga(
        {
          dispatch: (action) => dispatchedActions.push(action),
          getState: () => ({
            appState: {},
            appData: { userDetails: { name: 'mock-name' } },
          }),
        },
        onSaveDATA,
      ).toPromise();
      expect(postDATA).toBeCalledWith({ body: { name: 'mock-name' } });
      expect(dispatchedActions).toEqual([
        { type: 'SHOW_STATUS_MESSAGE', payload: { messageContent: 'Saving Your Data' } },
        { type: ActionTypes.CRITICAL_ERROR_OCCURED, payload: mError },
      ]);
    });
  });

  describe('save_on_change', () => {
    test('should wait for every SAVE_DATA_REQ action and call onSaveDATA', () => {
      const gen = save_on_change();
      expect(gen.next().value).toEqual(takeEvery(ActionTypes.SAVE_DATA_REQ, onSaveDATA));
      expect(gen.next().done).toBeTruthy();
    });
  });
});
