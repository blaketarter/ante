const root = require('./root');
const actions = require('./actions');

function run_actions(actions_arr) {
  let tmp_storage = [];

  for (let action of actions_arr) {
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

module.exports = { run_actions };
