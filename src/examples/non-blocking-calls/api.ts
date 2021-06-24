function sleep(ms) {
  return new Promise((res) => {
    setTimeout(res, ms);
  });
}

export default {
  *authorize(username, password) {
    console.log('authorize');
    yield sleep(1000);
    yield '123';
  },

  clearItem(key) {
    console.log('clearItem');
  },
};
