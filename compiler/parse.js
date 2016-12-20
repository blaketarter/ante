const root = require('./root');
const types = require('./types');
const actions = require('./actions');
const { func_watcher, str_watcher } = require('./watchers');
const { symbols, rev_symbols } = require('./symbols');

function split_into_symbols(text) {
  let symbols_arr = [];
  let is_last_char_symbol = false

  for (let char of text) {
    if (char === '\n') {
      continue;
    }

    if (char in rev_symbols) {
      is_last_char_symbol = true;
      symbols_arr.push(rev_symbols[char]);
      continue;
    }
    
    if (is_last_char_symbol) {
      symbols_arr.push(char);
      is_last_char_symbol = false;
      continue;
    }

    if (symbols_arr.length) {
      symbols_arr[symbols_arr.length - 1] += char;
      continue;
    }

    symbols_arr.push(char);
  }

  return symbols_arr;
}

function actions_from_symbols(symbols_arr) {
  const func_watcher_instance = func_watcher();
  const str_watcher_instance = str_watcher();

  let actions = [[]];
  let lineNum = 1;

  for (let part of symbols_arr) {
    if (part === rev_symbols[symbols.SEMI]) {
      lineNum += 1;
      actions.push([]);
      continue;
    }
  
    {
      let { is_str_handled, action } = str_watcher_instance(part);

      if (action) {
        actions[lineNum - 1].push(action);
      }

      if (is_str_handled) {
        continue;
      }
    }
  
    {
      let { is_func_handled, action } = func_watcher_instance(part);

      if (action) {
        actions[lineNum - 1].push(action);
      }

      if (is_func_handled) {
        continue;
      }
    }
  }

  return actions;
}

module.exports = { split_into_symbols, actions_from_symbols };
