const root = require('./root');
const types = require('./types');
const { symbols, rev_symbols } = require('./symbols');
const actions = require('./actions');

function func_watcher() {
  let found_method = false;
  let method = null;
  let in_args = false;
  let is_searching = true;
  let args = [];

  return function(part) {
    // is the part a method in the root scope
    if (is_searching && part in root) {
      method = part;
      found_method = true;
      is_searching = false;

      return { is_func_handled: true, action: false, };
    }

    // check to see if we have found a a method and are opening the args
    if (
      !is_searching &&
      found_method &&
      part === rev_symbols[types.func.delimiter_open]
    ) {
      in_args = true;

      return { is_func_handled: true, action: false, };
    }

    // check to see if we have found the end paren for a method
    if (
      !is_searching &&
      found_method &&
      part === rev_symbols[types.func.delimiter_close]
    ) {
      let method_to_return = method;

      in_args = false;
      method = null;
      found_method = false;
      is_searching = true;
      args = [];

      return { is_func_handled: true, action: { type: actions.CALL, payload: method_to_return } };
    }

    // gather the args
    if (
      !is_searching &&
      found_method &&
      in_args
    ) {

      args.push(part);

      return { is_func_handled: false, action: false, };
    }

    return { is_func_handled: false, action: false, };
  }
}

function str_watcher(part) {
  let found_str = false;
  let str = '';
  let is_searching = true;

  return function(part) {
    if (is_searching && part === rev_symbols[types.str.delimiter]) {
      found_str = true;
      is_searching = false;

      return { is_str_handled: true, action: false, };
    }

    if (
      !is_searching &&
      found_str &&
      part === rev_symbols[types.str.delimiter]
    ) {
      let str_to_return = str;

      found_str = false;
      is_searching = true;
      str = '';
      return { is_str_handled: true, action: { type: actions.VALUE, payload: str_to_return } };
    }

    if (
      !is_searching &&
      found_str &&
      part in symbols
    ) {
      str += symbols[part];
      return { is_str_handled: true, action: false, };
    }

    if (
      !is_searching &&
      found_str
    ) {
      str += part;
      return { is_str_handled: true, action: false, };
    }

    return { is_str_handled: false, action: false, };
  }
}

module.exports = { func_watcher, str_watcher, };
