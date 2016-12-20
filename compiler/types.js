const types = {
  str: {
    js: String,
    delimiter: '`',
  },
  func: {
    js: Function,
    delimiter_open: '(',
    delimiter_close: ')',
  },
  int: {
    js: Number,
    digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  }
};

module.exports = types;
