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
  },
  comment: {
    single_line_delimiter_open: '/',
    single_line_delimiter_amount: 2,
    single_line_delimiter_close: '\n',
  },
};

module.exports = types;
