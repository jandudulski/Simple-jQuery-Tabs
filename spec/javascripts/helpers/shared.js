var shared_examples = {};

var shared_examples_for = function(name, fn) {
  shared_examples[name] = fn;
};

var it_behaves_like = function(name) {
  describe("behaves like " + name, shared_examples[name]);
};
