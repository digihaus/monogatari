var requirejs = require('../../r');
requirejs.config({
  nodeRequire: require,
  baseUrl: __dirname + '/../../../main'
});

var kb = requirejs('core/io/Keyboard');

var evt = {};
evt.keyCode = kb.KEY_BACKSPACE;
evt.preventDefault = function() {};

exports.test = function(test) {
  test.expect(3);

  test.ok(kb.isDown(kb.KEY_BACKSPACE) == null, 'key is aready down');

  kb.onKeyDown(evt);
  test.ok(kb.isDown(kb.KEY_BACKSPACE) != null, 'key should be down');

  kb.onKeyUp(evt);
  test.ok(kb.isDown(kb.KEY_BACKSPACE) == null, 'key shouw not be down');

  test.done();
};
