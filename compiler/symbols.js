const types = require('./types');

const symbols = {
  STR_DELIMETER: types.str.delimiter, //`
  OPEN_PAREN: types.func.delimiter_open, //(
  CLOSE_PAREN: types.func.delimiter_close, //)
  SEMI: ';',
  COMMA: ',',
  SLASH: '/',
  NEWLINE: '\n',
};

const rev_symbols = {};

for (let k in symbols) {
  rev_symbols[symbols[k]] = k;
}

module.exports = { symbols, rev_symbols };
