import { displayBlogs } from './rootSaga';
import { runSaga } from 'redux-saga';

describe('63000691', () => {
  it('should pass', async () => {
    const dispatched: any[] = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({}),
      },
      displayBlogs,
    ).toPromise();
  });
});
