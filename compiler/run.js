const root = require('./root');
const actions = require('./actions');

function run_actions(actions_arr) {
  let tmp_storage = [];

  for (let line of actions_arr) {
    for (let action of line) {
      switch (action.type) {
        case actions.VALUE:
          tmp_storage.push(action.payload);
          break;
        case actions.CALL:
          root[action.payload](...tmp_storage);
          tmp_storage = [];
      }
    }
  }
}

module.exports = { run_actions };
