const root = require('./root');
const actions = require('./actions');

function run_actions(actions_arr) {
  for (let line of actions_arr) {
    let tmp_storage = [];

    for (let action of line) {
      switch (action.type) {
        case actions.VALUE:
          tmp_storage.push(action.payload);
          break;
        case actions.CALL:
          let return_val = root[action.payload](...tmp_storage) || undefined;
          tmp_storage = [return_val];
      }
    }
  }
}

module.exports = { run_actions };
