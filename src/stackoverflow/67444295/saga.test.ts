import { setPost } from './saga';
import { dextaApiService } from './dextaApiService';
import { runSaga } from 'redux-saga';
import { Action } from 'redux';

describe('67444295', () => {
  it('should pass', async () => {
    const dispatched: Action[] = [];
    const postSpy = jest.spyOn(dextaApiService, 'post').mockResolvedValueOnce('mocked response');
    const actual = await runSaga(
      {
        dispatch: (action: Action) => dispatched.push(action),
        getState: () => ({ dextaAuth: { token: 'abc123' } }),
      },
      setPost,
      { payload: 'mocked payload' },
    ).toPromise();
    expect(postSpy).toBeCalledWith('/api/savedAdvices', 'mocked payload', 'abc123');
    expect(dispatched).toEqual([{ type: 'success', payload: 'Advice saved successfully' }]);
    postSpy.mockRestore();
  });
});
