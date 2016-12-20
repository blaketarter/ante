const root = {
  log: console.log,
  foo: () => console.log('foo'),
  argc: (...args) => console.log(args.length),
  sum: (a, b) => { console.log(a + b); },
  square: (x) => { console.log(x * x); },
};

module.exports = root;
