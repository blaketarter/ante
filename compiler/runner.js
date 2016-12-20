const root = require('./root');
const { split_into_symbols, actions_from_symbols } = require('./parse');
const { run_actions } = require('./run');

function runner(target_text, verbose) {
  if (verbose) {
    root.log('\n========= Target Text =========\n');
    root.log(target_text);

    root.log('\n========= Target Symbols =========\n');
  }

  const target_symbols = split_into_symbols(target_text);

  if (verbose) {
    root.log(target_symbols);

    root.log('\n========= Actions From Symbols =========\n');
  }

  const actions_arr = actions_from_symbols(target_symbols);

  if (verbose) {
    root.log(actions_arr);

    root.log('\n========= Run Actions =========\n');
  }

  run_actions(actions_arr);
}

module.exports = runner;
