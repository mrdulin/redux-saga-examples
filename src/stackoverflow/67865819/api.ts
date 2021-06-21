import axios from 'axios';

export const api = {
  async callFunction(cancelToken) {
    return axios
      .get('https://jsonplaceholder.typicode.com/todos/1', {
        cancelToken: cancelToken,
      })
      .then((responseJson) => {
        return responseJson.data;
      })
      .catch((error) => {
        return error;
      });
  },
};
