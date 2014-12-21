var requirejs = require('../../r');
requirejs.config({
  nodeRequire: require,
  baseUrl: __dirname + '/../../../main'
});

var kb = requirejs('core/io/Keyboard');

var eventStub = {};

eventStub.preventDefault = function() {};

exports.test = function(test) {
  test.expect(3);

  eventStub.keyCode = kb.KEY_BACKSPACE;

  test.ok(kb.isDown(kb.KEY_BACKSPACE) == null, 'key should not be down');

  kb.onKeyDown(evt);
  test.ok(kb.isDown(kb.KEY_BACKSPACE) != null, 'key should be down');

  kb.onKeyUp(evt);
  test.ok(kb.isDown(kb.KEY_BACKSPACE) == null, 'key should not be down');

  test.done();
};
